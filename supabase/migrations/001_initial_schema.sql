-- =============================================================================
-- KHAIR ALJAAR FOODS — B2B Export Platform
-- Migration 001: Core schema + RLS
-- Run this entire file in Supabase Dashboard → SQL Editor
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE public.product_unit AS ENUM ('MT', 'Containers');

CREATE TYPE public.quote_status AS ENUM ('pending', 'reviewed', 'approved', 'rejected');

CREATE TYPE public.profile_role AS ENUM ('client', 'admin');

-- ---------------------------------------------------------------------------
-- profiles — B2B client companies (1:1 with auth.users)
-- ---------------------------------------------------------------------------
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name  TEXT NOT NULL,
  contact_name  TEXT,
  email         TEXT NOT NULL,
  phone         TEXT,
  country       TEXT,
  vat_number    TEXT,
  role          public.profile_role NOT NULL DEFAULT 'client',
  locale        TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'ar')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX profiles_role_idx ON public.profiles(role);
CREATE INDEX profiles_email_idx ON public.profiles(email);

-- Auto-create profile row when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, company_name, email, contact_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'company_name', 'New B2B Client'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'contact_name', NEW.raw_user_meta_data->>'full_name')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Keep updated_at fresh
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- products — Export commodities (localized EN/AR)
-- ---------------------------------------------------------------------------
CREATE TABLE public.products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT NOT NULL UNIQUE,
  category_en         TEXT NOT NULL,
  category_ar         TEXT NOT NULL,
  title_en            TEXT NOT NULL,
  title_ar            TEXT NOT NULL,
  desc_en             TEXT NOT NULL,
  desc_ar             TEXT NOT NULL,
  specs_en            TEXT[] NOT NULL DEFAULT '{}',
  specs_ar            TEXT[] NOT NULL DEFAULT '{}',
  image               TEXT NOT NULL,
  min_order           NUMERIC(12, 2) NOT NULL CHECK (min_order > 0),
  unit                public.product_unit NOT NULL DEFAULT 'MT',
  availability_en     TEXT NOT NULL DEFAULT 'In Stock',
  availability_ar     TEXT NOT NULL DEFAULT 'متوفر',
  harvest_season_en   TEXT NOT NULL,
  harvest_season_ar   TEXT NOT NULL,
  sizes_en            TEXT NOT NULL,
  sizes_ar            TEXT NOT NULL,
  packaging_en        TEXT NOT NULL,
  packaging_ar        TEXT NOT NULL,
  commodity_class_en  TEXT NOT NULL,
  commodity_class_ar  TEXT NOT NULL,
  origin_en           TEXT NOT NULL,
  origin_ar           TEXT NOT NULL,
  brix                TEXT,
  index_price         TEXT,
  trend               TEXT,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INTEGER NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX products_slug_idx ON public.products(slug);
CREATE INDEX products_category_en_idx ON public.products(category_en);
CREATE INDEX products_is_active_idx ON public.products(is_active);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- quote_requests — B2B cart submissions
-- ---------------------------------------------------------------------------
CREATE TABLE public.quote_requests (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name      TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  country           TEXT NOT NULL,
  incoterm          TEXT NOT NULL DEFAULT 'FOB',
  destination_port  TEXT NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'EUR', 'SAR', 'AED')),
  total_mt          NUMERIC(12, 2) NOT NULL DEFAULT 0,
  status            public.quote_status NOT NULL DEFAULT 'pending',
  admin_notes       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX quote_requests_user_id_idx ON public.quote_requests(user_id);
CREATE INDEX quote_requests_status_idx ON public.quote_requests(status);
CREATE INDEX quote_requests_created_at_idx ON public.quote_requests(created_at DESC);

CREATE TRIGGER quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- quote_items — Line items (quantities in MT or Containers)
-- ---------------------------------------------------------------------------
CREATE TABLE public.quote_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_request_id  UUID NOT NULL REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  product_id        UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_slug      TEXT NOT NULL,
  title_en          TEXT NOT NULL,
  title_ar          TEXT NOT NULL,
  quantity          NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
  unit              public.product_unit NOT NULL DEFAULT 'MT',
  packaging         TEXT NOT NULL,
  quantity_mt       NUMERIC(12, 2) NOT NULL CHECK (quantity_mt > 0),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX quote_items_quote_request_id_idx ON public.quote_items(quote_request_id);
CREATE INDEX quote_items_product_id_idx ON public.quote_items(product_id);

-- ---------------------------------------------------------------------------
-- Helper: admin check for RLS
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items    ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- products — public catalog read; admin write
CREATE POLICY "products_select_active"
  ON public.products FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "products_admin_insert"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_update"
  ON public.products FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_delete"
  ON public.products FOR DELETE
  USING (public.is_admin());

-- quote_requests — clients see only their own; admins see all
CREATE POLICY "quote_requests_select_own"
  ON public.quote_requests FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "quote_requests_insert_own"
  ON public.quote_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "quote_requests_update_admin"
  ON public.quote_requests FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- quote_items — access via parent quote ownership
CREATE POLICY "quote_items_select_own"
  ON public.quote_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.quote_requests qr
      WHERE qr.id = quote_request_id
        AND (qr.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "quote_items_insert_own"
  ON public.quote_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quote_requests qr
      WHERE qr.id = quote_request_id
        AND qr.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Storage bucket for product images (optional — run after bucket created in UI)
-- ---------------------------------------------------------------------------
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
--
-- CREATE POLICY "product_images_public_read"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');
--
-- CREATE POLICY "product_images_admin_write"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'product-images' AND public.is_admin());
