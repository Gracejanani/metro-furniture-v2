-- Optional demo products for POS testing (run after 001_pos_schema.sql)
WITH cat AS (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1)
INSERT INTO products (
  name, slug, product_code, sku, barcode, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock, material, image_url
)
SELECT * FROM (VALUES
  ('Premium 3 Seater Sofa', 'premium-3-seater-sofa', 'SOFA-3S-001', 'SOFA-3S-001', '8901234567890', (SELECT id FROM cat), 48500, 52000, 18, 8, 2, 'Fabric', '/logo.png'),
  ('L Shape Corner Sofa', 'l-shape-corner-sofa', 'SOFA-LS-002', 'SOFA-LS-002', '8901234567891', (SELECT id FROM cat), 72000, 78000, 18, 4, 1, 'Leatherette', '/logo.png')
) AS v(name, slug, product_code, sku, barcode, category_id, selling_price, mrp, gst_rate, stock_quantity, minimum_stock, material, image_url)
ON CONFLICT (sku) DO NOTHING;
