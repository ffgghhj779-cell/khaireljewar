-- Khair Aljaar — consumer checkout + Paymob (EGP)
-- Safe to re-run. Paste into Supabase SQL Editor → Run.

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$ BEGIN
  CREATE TYPE public.order_status AS ENUM (
    'pending_payment',
    'paid',
    'failed',
    'cancelled',
    'fulfillment',
    'delivered'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS retail_price_egp NUMERIC(12, 2),
  ADD COLUMN IF NOT EXISTS consumer_unit_en TEXT NOT NULL DEFAULT 'Carton',
  ADD COLUMN IF NOT EXISTS consumer_unit_ar TEXT NOT NULL DEFAULT 'كرتون';

CREATE TABLE IF NOT EXISTS public.orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        TEXT NOT NULL UNIQUE,
  status              public.order_status NOT NULL DEFAULT 'pending_payment',
  lang                TEXT NOT NULL DEFAULT 'ar' CHECK (lang IN ('ar', 'en')),
  currency            TEXT NOT NULL DEFAULT 'EGP',
  subtotal_egp        NUMERIC(12, 2) NOT NULL CHECK (subtotal_egp >= 0),
  shipping_egp        NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_egp >= 0),
  total_egp           NUMERIC(12, 2) NOT NULL CHECK (total_egp >= 0),
  customer_name       TEXT NOT NULL,
  customer_email      TEXT NOT NULL,
  customer_phone      TEXT NOT NULL,
  shipping_street     TEXT NOT NULL,
  shipping_city       TEXT NOT NULL,
  shipping_governorate TEXT NOT NULL,
  customer_notes      TEXT,
  paymob_intention_id TEXT,
  paymob_transaction_id TEXT,
  payment_method      TEXT,
  paid_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_slug    TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  title_ar        TEXT NOT NULL,
  unit_label_en   TEXT NOT NULL DEFAULT 'Carton',
  unit_label_ar   TEXT NOT NULL DEFAULT 'كرتون',
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_egp  NUMERIC(12, 2) NOT NULL CHECK (unit_price_egp >= 0),
  line_total_egp  NUMERIC(12, 2) NOT NULL CHECK (line_total_egp >= 0),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders(status);
CREATE INDEX IF NOT EXISTS orders_number_idx ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS order_items_order_idx ON public.order_items(order_id);

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.orders TO service_role;
GRANT ALL ON TABLE public.order_items TO service_role;
GRANT USAGE ON TYPE public.order_status TO service_role;

-- Public can read own order by order_number via API (service role). No direct anon read.
DROP POLICY IF EXISTS orders_service_only ON public.orders;
DROP POLICY IF EXISTS order_items_service_only ON public.order_items;
CREATE POLICY orders_service_only ON public.orders FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY order_items_service_only ON public.order_items FOR ALL USING (false) WITH CHECK (false);

-- Seed retail EGP prices (only fills empty values — safe to re-run)
UPDATE public.products SET retail_price_egp = 225, consumer_unit_en = 'Carton 15kg', consumer_unit_ar = 'كرتون 15 كجم' WHERE slug = 'valencia-oranges' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 245, consumer_unit_en = 'Carton 15kg', consumer_unit_ar = 'كرتون 15 كجم' WHERE slug = 'navel-oranges' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 520, consumer_unit_en = 'Carton 5kg', consumer_unit_ar = 'كرتون 5 كجم' WHERE slug = 'medjool-dates' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 380, consumer_unit_en = 'Carton 5kg', consumer_unit_ar = 'كرتون 5 كجم' WHERE slug = 'barhi-dates' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 195, consumer_unit_en = 'Carton 4kg', consumer_unit_ar = 'كرتون 4 كجم' WHERE slug = 'hass-avocados' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 210, consumer_unit_en = 'Carton 5kg', consumer_unit_ar = 'كرتون 5 كجم' WHERE slug = 'pomegranates' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 85, consumer_unit_en = 'Sack 10kg', consumer_unit_ar = 'شوال 10 كجم' WHERE slug = 'spunta-potatoes' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 72, consumer_unit_en = 'Sack 10kg', consumer_unit_ar = 'شوال 10 كجم' WHERE slug = 'red-onions' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 95, consumer_unit_en = 'Sack 5kg', consumer_unit_ar = 'شوال 5 كجم' WHERE slug = 'fresh-garlic' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 165, consumer_unit_en = 'Carton 4kg', consumer_unit_ar = 'كرتون 4 كجم' WHERE slug = 'kent-mangoes' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 140, consumer_unit_en = 'Carton 2.5kg', consumer_unit_ar = 'كرتون 2.5 كجم' WHERE slug = 'frozen-strawberries' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 118, consumer_unit_en = 'Carton 2.5kg', consumer_unit_ar = 'كرتون 2.5 كجم' WHERE slug = 'frozen-mixed-vegetables' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 180, consumer_unit_en = 'Carton 10kg', consumer_unit_ar = 'كرتون 10 كجم' WHERE slug = 'original-lemon' AND retail_price_egp IS NULL;
UPDATE public.products SET retail_price_egp = 210, consumer_unit_en = 'Carton 15kg', consumer_unit_ar = 'كرتون 15 كجم' WHERE slug = 'bot-test-oranges' AND retail_price_egp IS NULL;
