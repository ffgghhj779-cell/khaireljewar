-- =============================================================================
-- Product images storage bucket (public read)
-- Run in Supabase Dashboard → SQL Editor after 001–003
-- =============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
CREATE POLICY "product_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Writes go through service role (Telegram bot / API) — no public insert policy.
