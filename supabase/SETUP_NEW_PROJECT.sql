-- =============================================================================
-- Khair Aljaar — ONE-SHOT setup for NEW Supabase project
-- Paste into: Supabase Dashboard → SQL Editor → Run
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
  CREATE TYPE public.product_unit AS ENUM ('MT', 'Containers');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.quote_status AS ENUM ('pending', 'reviewed', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.profile_role AS ENUM ('client', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.profiles (
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.products (
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

CREATE INDEX IF NOT EXISTS products_slug_idx ON public.products(slug);
CREATE INDEX IF NOT EXISTS products_category_en_idx ON public.products(category_en);
CREATE INDEX IF NOT EXISTS products_is_active_idx ON public.products(is_active);

DROP TRIGGER IF EXISTS products_updated_at ON public.products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

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

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "products_select_active" ON public.products;
CREATE POLICY "products_select_active"
  ON public.products FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "products_admin_insert" ON public.products;
CREATE POLICY "products_admin_insert"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "products_admin_update" ON public.products;
CREATE POLICY "products_admin_update"
  ON public.products FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "products_admin_delete" ON public.products;
CREATE POLICY "products_admin_delete"
  ON public.products FOR DELETE
  USING (public.is_admin());

-- Service role bypasses RLS; bot uses secret key.
-- Also allow insert/update for authenticated service via security definer helper optional.

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
CREATE POLICY "product_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Seed core catalog (Jeddah hub) — safe re-run
INSERT INTO public.products (
  slug, category_en, category_ar, title_en, title_ar, desc_en, desc_ar,
  specs_en, specs_ar, image, min_order, unit,
  availability_en, availability_ar, harvest_season_en, harvest_season_ar,
  sizes_en, sizes_ar, packaging_en, packaging_ar,
  commodity_class_en, commodity_class_ar, origin_en, origin_ar,
  brix, index_price, trend, sort_order
) VALUES
(
  'valencia-oranges', 'Citrus', 'الموالح',
  'Valencia Oranges', 'برتقال فالنسيا',
  'World-class juicing oranges from trusted partner farms. High Brix (11–12°), thin peel — coordinated from Jeddah.',
  'برتقال عصير من الدرجة الأولى من مزارع شريكة موثوقة. نسبة سكر 11–12° — بتنسيق من جدة.',
  ARRAY['Caliber: 48/56/64/72/80/88/100', 'Brix: 11–12°', 'Packaging: 15kg Telescopic Cartons'],
  ARRAY['المعايرة: 48/56/64/72/80/88/100', 'نسبة السكر: 11–12°', 'التعبئة: كراتين تلسكوبية 15 كجم'],
  '/images/brand/products/valencia-oranges.webp',
  24, 'MT', 'In Stock', 'متوفر', 'Feb – May', 'فبراير – مايو',
  '48–100', '48–100', 'Telescopic Carton 15kg', 'كرتون تلسكوبي 15 كجم',
  'Citrus', 'موالح', 'Jeddah, Saudi Arabia', 'جدة، المملكة العربية السعودية',
  '11–12°', '$420/MT', '-0.5%', 1
),
(
  'medjool-dates', 'Dates', 'التمور',
  'Premium Medjool Dates', 'تمر مجدول فاخر',
  'Large, caramel-rich Medjool dates. Jumbo grade with 20%+ moisture.',
  'تمر مجدول كبير غني بالكراميل. درجة جامبو برطوبة 20%+.',
  ARRAY['Grade: Jumbo / Super Jumbo', 'Moisture: 20–24%', 'Packaging: 5kg Cartons'],
  ARRAY['الدرجة: جامبو / سوبر جامبو', 'الرطوبة: 20–24%', 'التعبئة: كراتين 5 كجم'],
  '/images/brand/products/medjool-dates.webp',
  10, 'MT', 'In Stock', 'متوفر', 'Sep – Nov', 'سبتمبر – نوفمبر',
  'Jumbo+', 'جامبو+', '5kg Cartons', 'كراتين 5 كجم',
  'Dates', 'تمور', 'Jeddah, Saudi Arabia', 'جدة، المملكة العربية السعودية',
  NULL, '$3200/MT', '+0.8%', 2
)
ON CONFLICT (slug) DO NOTHING;
