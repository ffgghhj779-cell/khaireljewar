-- =============================================================================
-- KHAIR ALJAAR FOODS — Update product images to local brand photography
-- Run AFTER 002_seed_products.sql
-- =============================================================================

UPDATE public.products SET image = '/images/products/cold-shelf-display.jpeg' WHERE slug = 'valencia-oranges';
UPDATE public.products SET image = '/images/products/cold-shelf-display.jpeg' WHERE slug = 'navel-oranges';
UPDATE public.products SET image = '/images/products/dates-luxury-display.jpeg' WHERE slug = 'medjool-dates';
UPDATE public.products SET image = '/images/products/fruits-shopping-cart.jpeg' WHERE slug = 'hass-avocados';
UPDATE public.products SET image = '/images/products/potatoes-display-stand.jpeg' WHERE slug = 'spunta-potatoes';
UPDATE public.products SET image = '/images/products/mangoes-display.jpeg' WHERE slug = 'kent-mangoes';
