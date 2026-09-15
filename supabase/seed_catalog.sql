-- Metro Furniture — catalog seed (generated from catalog-products.json)
-- Run AFTER: 001_pos_schema.sql, 005_product_images_storage.sql
-- Images: paths under /public (e.g. /Metro_Product_Images/...) — work in Next.js POS.
-- For Supabase Storage URLs, use /products → Import Catalog JSON (with SERVICE_ROLE_KEY).

-- Categories
INSERT INTO categories (name, slug, sort_order, is_active) VALUES
  ('Corner Sofas', 'corner-sofas', 1, true),
  ('Sofas', 'sofas', 2, true),
  ('Wall Lights', 'wall-lights', 3, true),
  ('Chandeliers', 'chandeliers', 4, true),
  ('Chairs', 'chairs', 5, true),
  ('Mattresses', 'mattresses', 6, true),
  ('Bathroom Fittings', 'bathroom-fittings', 7, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  sort_order = EXCLUDED.sort_order,
  is_active = true;

-- Products

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Alaska Corner',
  'alaska-corner',
  'MTC-101',
  'MTC-101',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  38999,
  52990,
  18,
  5,
  2,
  'set',
  'Engineered hardwood frame, tapered metal legs',
  'Teal',
  '6-Seater L-Shape Corner (3+2+1 modular)',
  'Contemporary L-shape corner sofa with built-in storage consoles Contemporary L-shape corner sofa with built-in storage consoles. 6-Seater L-Shape Corner (3+2+1 modular). Premium teal velvet-finish fabric, channel tufted backrests. Configuration: 6-Seater L-Shape Corner (3+2+1 modular) Upholstery: Premium teal velvet-finish fabric, channel tufted backrests',
  '/Metro_Product_Images/MTC-101_Alaska_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Dollar Corner',
  'dollar-corner',
  'MTC-102',
  'MTC-102',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  33499,
  47990,
  18,
  5,
  2,
  'set',
  'Solid wood trim armrests, wooden block legs',
  'Caramel Brown',
  '6-Seater L-Shape Corner',
  'Classic Chesterfield-style tufted corner sofa Classic Chesterfield-style tufted corner sofa. 6-Seater L-Shape Corner. Caramel brown suede-touch fabric, deep button tufting. Configuration: 6-Seater L-Shape Corner Upholstery: Caramel brown suede-touch fabric, deep button tufting',
  '/Metro_Product_Images/MTC-102_Dollar_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Sagar Corner',
  'sagar-corner',
  'MTC-103',
  'MTC-103',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  39999,
  54990,
  18,
  5,
  2,
  'set',
  'Reinforced steel recliner mechanism, engineered wood base',
  'Wine Red',
  '6-Seater L-Shape Corner with 2 manual recliners',
  'Reclining corner sofa in rich wine upholstery Reclining corner sofa in rich wine upholstery. 6-Seater L-Shape Corner with 2 manual recliners. Wine-red textured fabric, stitched panel backrests. Configuration: 6-Seater L-Shape Corner with 2 manual recliners Upholstery: Wine-red textured fabric, stitched panel backrests',
  '/Metro_Product_Images/MTC-103_Sagar_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Cairo Sofa',
  'cairo-sofa',
  'MTC-104',
  'MTC-104',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  31999,
  44990,
  18,
  5,
  2,
  'set',
  'Glossy walnut-finish wooden armrests, block legs',
  'Taupe Brown',
  '3-Seater + 2 Single Recliners (5-Seater set)',
  'Diamond-quilted 3+1+1 sofa set with polished wood arms Diamond-quilted 3+1+1 sofa set with polished wood arms. 3-Seater + 2 Single Recliners (5-Seater set). Taupe-brown fabric with diamond quilted backrests. Configuration: 3-Seater + 2 Single Recliners (5-Seater set) Upholstery: Taupe-brown fabric with diamond quilted backrests',
  '/Metro_Product_Images/MTC-104_Cairo_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Stuart Sofa',
  'stuart-sofa',
  'MTC-105',
  'MTC-105',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  29999,
  41990,
  18,
  5,
  2,
  'set',
  'Wooden armrest trim, manual recliner mechanism',
  'Dusty Rose',
  '3-Seater + 2 Single Recliners (5-Seater set)',
  'Soft-blush recliner sofa set for a warm, elegant living room Soft-blush recliner sofa set for a warm, elegant living room. 3-Seater + 2 Single Recliners (5-Seater set). Dusty rose fabric, box-tufted seat and back cushions. Configuration: 3-Seater + 2 Single Recliners (5-Seater set) Upholstery: Dusty rose fabric, box-tufted seat and back cushions',
  '/Metro_Product_Images/MTC-105_Stuart_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Dinesh Sofa',
  'dinesh-sofa',
  'MTC-106',
  'MTC-106',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  27499,
  38990,
  18,
  5,
  2,
  'set',
  'Dark walnut base trim, sturdy engineered wood frame',
  'Camel Tan',
  '3-Seater + 2 Single Recliners (5-Seater set)',
  'Everyday-comfort sofa set with contrast stitching Everyday-comfort sofa set with contrast stitching. 3-Seater + 2 Single Recliners (5-Seater set). Camel-tan fabric with box-tufted cushions, contrast topstitch. Configuration: 3-Seater + 2 Single Recliners (5-Seater set) Upholstery: Camel-tan fabric with box-tufted cushions, contrast topstitch',
  '/Metro_Product_Images/MTC-106_Dinesh_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Rolex Sofa',
  'rolex-sofa',
  'MTC-107',
  'MTC-107',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  28999,
  40990,
  18,
  5,
  2,
  'set',
  'Compact block legs, engineered wood frame',
  'Deep Teal',
  '3-Seater + 2 Single Recliners (5-Seater set)',
  'Petrol-blue channel-tufted sofa set, statement centrepiece Petrol-blue channel-tufted sofa set, statement centrepiece. 3-Seater + 2 Single Recliners (5-Seater set). Deep teal fabric, vertical channel tufting on back and seat. Configuration: 3-Seater + 2 Single Recliners (5-Seater set) Upholstery: Deep teal fabric, vertical channel tufting on back and seat',
  '/Metro_Product_Images/MTC-107_Rolex_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Monaco Corner',
  'monaco-corner',
  'MTC-108',
  'MTC-108',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  35499,
  49990,
  18,
  5,
  2,
  'set',
  'Engineered wood frame, block legs',
  'Wine Velvet',
  '6-Seater L-Shape Corner',
  'Deep-tufted wine velvet L-shape corner with gold-band accents Deep-tufted wine velvet L-shape corner with gold-band accents. 6-Seater L-Shape Corner. Wine velvet fabric, diamond-stitched backrests. Configuration: 6-Seater L-Shape Corner Upholstery: Wine velvet fabric, diamond-stitched backrests',
  '/Metro_Product_Images/MTC-108_Monaco_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Sierra Sofa',
  'sierra-sofa',
  'MTC-109',
  'MTC-109',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  27999,
  39990,
  18,
  5,
  2,
  'set',
  'Polished wood armrest trim, block legs',
  'Warm Beige',
  '3-Seater + 2 Single Recliners (5-Seater set)',
  'Warm beige sofa set with glossy wood armrest trim Warm beige sofa set with glossy wood armrest trim. 3-Seater + 2 Single Recliners (5-Seater set). Warm beige fabric, box-tufted cushions. Configuration: 3-Seater + 2 Single Recliners (5-Seater set) Upholstery: Warm beige fabric, box-tufted cushions',
  '/Metro_Product_Images/MTC-109_Sierra_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Windsor Recliner Sofa',
  'windsor-recliner-sofa',
  'MTC-110',
  'MTC-110',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  25999,
  36990,
  18,
  5,
  2,
  'set',
  'Reinforced recliner mechanism, engineered wood base',
  'Warm Brown',
  '3-Seater manual recliner sofa',
  'Rugged suede-finish reclining sofa with channel-stitched cushions Rugged suede-finish reclining sofa with channel-stitched cushions. 3-Seater manual recliner sofa. Warm brown suede-touch fabric, channel-stitched back and seat. Configuration: 3-Seater manual recliner sofa Upholstery: Warm brown suede-touch fabric, channel-stitched back and seat',
  '/Metro_Product_Images/MTC-110_Windsor_Recliner_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Oxford Corner',
  'oxford-corner',
  'MTC-111',
  'MTC-111',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  36999,
  51990,
  18,
  5,
  2,
  'set',
  'Polished wood tray-table armrests, block legs',
  'Grey',
  '6-Seater L-Shape Corner',
  'Button-tufted grey corner sofa with built-in wooden tray tables Button-tufted grey corner sofa with built-in wooden tray tables. 6-Seater L-Shape Corner. Grey fabric, deep button tufting throughout. Configuration: 6-Seater L-Shape Corner Upholstery: Grey fabric, deep button tufting throughout',
  '/Metro_Product_Images/MTC-111_Oxford_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Ruby Velvet Sofa',
  'ruby-velvet-sofa',
  'MTC-112',
  'MTC-112',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  30999,
  43990,
  18,
  5,
  2,
  'set',
  'Engineered wood frame, block legs',
  'Deep Red',
  '3-Seater sofa (matching armchairs available)',
  'Statement red velvet sofa set with gold-band bolster cushions Statement red velvet sofa set with gold-band bolster cushions. 3-Seater sofa (matching armchairs available). Deep red velvet fabric, gold-piped edges. Configuration: 3-Seater sofa (matching armchairs available) Upholstery: Deep red velvet fabric, gold-piped edges',
  '/Metro_Product_Images/MTC-112_Ruby_Velvet_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Nova Corner',
  'nova-corner',
  'MTC-113',
  'MTC-113',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  34499,
  48990,
  18,
  5,
  2,
  'set',
  'Engineered wood frame, block legs',
  'Charcoal Grey',
  '6-Seater L-Shape Corner with center console',
  'Grey fabric corner sofa with a built-in cup-holder console Grey fabric corner sofa with a built-in cup-holder console. 6-Seater L-Shape Corner with center console. Charcoal-grey fabric, contrast top-stitching. Configuration: 6-Seater L-Shape Corner with center console Upholstery: Charcoal-grey fabric, contrast top-stitching',
  '/Metro_Product_Images/MTC-113_Nova_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Grand Bay Corner',
  'grand-bay-corner',
  'MTC-114',
  'MTC-114',
  (SELECT id FROM categories WHERE slug = 'corner-sofas' LIMIT 1),
  47999,
  68990,
  18,
  5,
  2,
  'set',
  'Wood-trim armrests, reinforced recliner mechanism',
  'Grey Brown',
  '8-Seater U-Shape Sectional with 2 recliner ends',
  'Oversized U-shape sectional for large living rooms Oversized U-shape sectional for large living rooms. 8-Seater U-Shape Sectional with 2 recliner ends. Grey-brown textured fabric, box-tufted cushions. Configuration: 8-Seater U-Shape Sectional with 2 recliner ends Upholstery: Grey-brown textured fabric, box-tufted cushions',
  '/Metro_Product_Images/MTC-114_Grand_Bay_Corner.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Onyx Leather Sofa',
  'onyx-leather-sofa',
  'MTC-115',
  'MTC-115',
  (SELECT id FROM categories WHERE slug = 'sofas' LIMIT 1),
  30499,
  42990,
  18,
  5,
  2,
  'set',
  'Engineered wood frame, block legs',
  'Black',
  '3-Seater sofa',
  'Sleek black leatherette sofa for a modern living room Sleek black leatherette sofa for a modern living room. 3-Seater sofa. Black leatherette upholstery, box-cushion back. Configuration: 3-Seater sofa Upholstery: Black leatherette upholstery, box-cushion back',
  '/Metro_Product_Images/MTC-115_Onyx_Leather_Sofa.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Cosmo Ring Wall Sconce — Astronaut Edition',
  'cosmo-ring-wall-sconce-astronaut-edition',
  'LL-D6054',
  'LL-D6054',
  (SELECT id FROM categories WHERE slug = 'wall-lights' LIMIT 1),
  1737,
  1737,
  18,
  5,
  2,
  'pc',
  'White Body, Wood Finish Shelf',
  NULL,
  NULL,
  'LED Wall Light A playful ring-form sconce that doubles as a display shelf, the halo of light framing a hand-finished walnut ledge. Perfect for kids'' rooms, reading nooks, or a whimsical accent wall — the built-in RGB action mode adds color-changing ambience on demand.',
  '/Lights_Products/LL-D6054.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Cosmo Ring Wall Sconce — Golden Bear Edition',
  'cosmo-ring-wall-sconce-golden-bear-edition',
  'LL-D6056',
  'LL-D6056',
  (SELECT id FROM categories WHERE slug = 'wall-lights' LIMIT 1),
  1737,
  1737,
  18,
  5,
  2,
  'pc',
  'White Body, Wood Finish Shelf',
  NULL,
  NULL,
  'LED Wall Light The same beloved ring silhouette as its Cosmo sibling, styled here with a gilded bear figurine on a warm wood shelf. A soft-glow companion piece for nurseries, hallways, and gallery walls that calls for a touch of charm.',
  '/Lights_Products/LL-D6056.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Bubble Drop Chandelier — 16 Strand',
  'bubble-drop-chandelier-16-strand',
  'LL-D5463',
  'LL-D5463',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'French Gold, Crystal',
  'Gold',
  NULL,
  'LED Cluster Chandelier Sixteen crystal bubble pendants cascade from a French-gold ceiling plate at staggered heights, each strand tipped with a faceted glass rod. Designed for stairwells and double-height foyers where a shimmering, jewellery-like drop makes the strongest first impression.',
  '/Lights_Products/LL-D5463.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Bubble Drop Chandelier — 25 Strand Grand',
  'bubble-drop-chandelier-25-strand-grand',
  'LL-D5464',
  'LL-D5464',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'French Gold, Crystal',
  'Gold',
  NULL,
  'LED Cluster Chandelier The full-scale expression of our Bubble Drop family — twenty-five crystal-and-gold strands fill out a wide canopy for a fuller, more theatrical spill of light. Built for grand stairwells, banquet entries, and living rooms with generous ceiling height.',
  '/Lights_Products/LL-D5464.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Icicle Cascade Chandelier',
  'icicle-cascade-chandelier',
  'LL-D5462',
  'LL-D5462',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'French Gold, Crystal',
  'Gold',
  NULL,
  'LED Cluster Chandelier Elongated crystal icicles taper to soft points, spiralling down from a brushed-gold canopy in an irregular, frozen-waterfall pattern. A striking centrepiece for stairwells and lobby ceilings that calls for real drama and scale.',
  '/Lights_Products/LL-D5462.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Orbit Ring Spiral Pendant',
  'orbit-ring-spiral-pendant',
  'LL-D5221',
  'LL-D5221',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Gold, Acrylic',
  'Gold',
  NULL,
  'LED Spiral Chandelier Twelve illuminated acrylic rings wind down a spiral path like a slow-motion helix, each one glowing from its own gold-trimmed edge. A sculptural, contemporary choice for open stairwells and double-volume dining spaces.',
  '/Lights_Products/LL-D5221.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Feather Leaf Spiral Pendant',
  'feather-leaf-spiral-pendant',
  'LL-D5246',
  'LL-D5246',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Rose Gold, Acrylic',
  'Gold',
  NULL,
  'LED Spiral Chandelier Ten rose-gold leaf forms spiral gently downward, each lit along its curved edge for a soft, organic glow. Its compact drop suits stairwells, bedside niches, and smaller foyers looking for a graceful sculptural moment.',
  '/Lights_Products/LL-D5246.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Petal Bloom Crystal Chandelier',
  'petal-bloom-crystal-chandelier',
  'LL-D5460',
  'LL-D5460',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Heavy Glass + Crystal',
  NULL,
  NULL,
  'Crystal Chandelier Layered glass petals ring the frame like a flower in full bloom, finished with a fringe of hand-cut crystal drops beneath. A romantic, traditional silhouette suited to formal living rooms and dining tables.',
  '/Lights_Products/LL-D5460.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Empire Tiered Crystal Chandelier',
  'empire-tiered-crystal-chandelier',
  'LLA1707',
  'LLA1707',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Gold, Crystal',
  'Gold',
  NULL,
  'Crystal Chandelier A classic Empire-style silhouette built from tiers of beaded crystal strands, cinched at the waist and flaring into a full crystal skirt. Timeless proportions make this the natural centrepiece for a formal dining room or grand entry.',
  '/Lights_Products/LLA1707.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Double-Tier Crystal Drum Chandelier',
  'double-tier-crystal-drum-chandelier',
  'LL-D5461',
  'LL-D5461',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Crystal',
  NULL,
  NULL,
  'LED Crystal Chandelier Two beaded-crystal drums stack at different diameters, suspended on fine cables for a modern, architectural take on the traditional chandelier. Well suited to contemporary dining rooms and statement islands.',
  '/Lights_Products/LL-D5461.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Peacock Leaf Crystal Chandelier — Small',
  'peacock-leaf-crystal-chandelier-small',
  'LL-D5459',
  'LL-D5459',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Heavy Glass + Crystal',
  NULL,
  NULL,
  'Crystal Chandelier Textured glass leaves fan outward in an intricate, feather-like layering, each edge caught with hand-set crystal beads. A refined statement piece sized for standard-height dining rooms and bedrooms.',
  '/Lights_Products/LL-D5459.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Peacock Leaf Crystal Chandelier — Grand',
  'peacock-leaf-crystal-chandelier-grand',
  'LL-D5458',
  'LL-D5458',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Heavy Glass + Crystal',
  NULL,
  NULL,
  'Crystal Chandelier The larger sibling in the Peacock Leaf family, scaled up to 800mm for double-height living rooms and grand dining spaces. Tier upon tier of etched glass leaves catch and scatter light from every angle.',
  '/Lights_Products/LL-D5458.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Botanical Leaf Crystal Chandelier',
  'botanical-leaf-crystal-chandelier',
  'LL-D5457',
  'LL-D5457',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Heavy Glass + Crystal',
  NULL,
  NULL,
  'Crystal Chandelier Rounded glass leaves layer into a full, textural canopy over a crystal-fringed underside, finished with a hand-twisted stem. A softer, botanical take on the crystal chandelier for bedrooms and reading rooms.',
  '/Lights_Products/LL-D5457.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Vortex Ring Cascade Chandelier — 11 Ring',
  'vortex-ring-cascade-chandelier-11-ring',
  'LL.A41700/11C FGD',
  'LL.A41700/11C FGD',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Crystal & Metal',
  NULL,
  NULL,
  'LED Spiral Chandelier Eleven illuminated gold rings twist downward in a tightening spiral, evoking a slow tornado of light. Fully adjustable drop height plus dimmer and remote control make this a striking, flexible centrepiece for tall stairwells and atriums.',
  '/Lights_Products/LL.A41700-11C-FGD.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Vortex Ring Cascade Chandelier — 9 Ring',
  'vortex-ring-cascade-chandelier-9-ring',
  'LL.A41700/9C FGD',
  'LL.A41700/9C FGD',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Crystal & Metal',
  NULL,
  NULL,
  'LED Spiral Chandelier A more compact version of our Vortex Ring Cascade, with nine spiralling rings suited to standard-height stairwells and living rooms. Same adjustable drop, dimmer, and remote-control convenience in a tighter footprint.',
  '/Lights_Products/LL.A41700-9C-FGD.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Lantern Globe Wall Light',
  'lantern-globe-wall-light',
  '7921',
  '7921',
  (SELECT id FROM categories WHERE slug = 'wall-lights' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Gold',
  'Gold',
  NULL,
  'LED Wall Light A gilded lantern cage frames a beaded crystal globe, throwing a soft starburst of light across the wall behind it. A compact, jewel-like wall light for hallways, staircases, and either side of a bed or mirror.',
  '/Lights_Products/MODEL-7921.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Twist Sphere Wall Light',
  'twist-sphere-wall-light',
  '8206',
  '8206',
  (SELECT id FROM categories WHERE slug = 'wall-lights' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Gold',
  'Gold',
  NULL,
  'LED Wall Light — 3-in-1 Two textured glass spheres bookend a gold spiral that winds between them, casting a warm radial glow in both directions. A symmetrical, sculptural wall light suited to corridors and either side of a console or headboard.',
  '/Lights_Products/8206.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Halo Orb Wall Light',
  'halo-orb-wall-light',
  '8128',
  '8128',
  (SELECT id FROM categories WHERE slug = 'wall-lights' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Gold',
  'Gold',
  NULL,
  'LED Wall Light — 3-in-1, Warm White A glowing gold halo ring frames a fluted crystal orb below, layering two light sources into one compact fixture. Warm, inviting, and detailed enough to stand alone as an accent beside artwork or a bathroom mirror.',
  '/Lights_Products/8128.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Floral Bloom Cluster Chandelier',
  'floral-bloom-cluster-chandelier',
  'S185/50',
  'S185/50',
  (SELECT id FROM categories WHERE slug = 'chandeliers' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Gold, Crystal Bubble Rods',
  'Gold',
  NULL,
  'LED Cluster Chandelier — 3-in-1 Dozens of crystal bubble rods hang in loose floral-clipped clusters at staggered heights, building a dense, glittering canopy from a single round plate. A show-stopping choice for tall stairwells and grand double-height rooms.',
  '/Lights_Products/S185-50.jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Executive Mesh Chair',
  'executive-mesh-chair',
  'CHR-201',
  'CHR-201',
  (SELECT id FROM categories WHERE slug = 'chairs' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Mesh & Metal Frame',
  NULL,
  NULL,
  'Ergonomic office & study chair with breathable mesh back Premium ergonomic chair with adjustable height, lumbar support and smooth swivel base — ideal for home office and study.',
  '/chair-furniture (1).jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Premium Lounge Chair',
  'premium-lounge-chair',
  'CHR-202',
  'CHR-202',
  (SELECT id FROM categories WHERE slug = 'chairs' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Fabric & Wood',
  NULL,
  NULL,
  'Comfort lounge chair for living room & reception Elegant lounge chair with cushioned seat and curved wooden arms — perfect for living rooms and reading corners.',
  '/chair-furniture (2).jpg',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Orthopaedic Memory Foam Mattress',
  'orthopaedic-memory-foam-mattress',
  'MAT-401',
  'MAT-401',
  (SELECT id FROM categories WHERE slug = 'mattresses' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Memory Foam',
  NULL,
  NULL,
  'Doctor-recommended orthopaedic support High-density memory foam mattress with orthopaedic support — available in king, queen and custom sizes.',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Pocket Spring Mattress',
  'pocket-spring-mattress',
  'MAT-402',
  'MAT-402',
  (SELECT id FROM categories WHERE slug = 'mattresses' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Pocket Spring',
  NULL,
  NULL,
  'Individual pocket springs for zero partner disturbance Premium pocket spring mattress with quilted top layer — ideal for couples who want independent support.',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Designer Wash Basin',
  'designer-wash-basin',
  'BF-501',
  'BF-501',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Ceramic',
  NULL,
  NULL,
  'Counter-top ceramic wash basin Elegant counter-top wash basin — pairs with premium taps and fittings.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Chrome Basin Mixer Tap',
  'chrome-basin-mixer-tap',
  'BF-502',
  'BF-502',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Chrome Brass',
  NULL,
  NULL,
  'Single-lever chrome mixer tap Premium chrome basin mixer with ceramic disc cartridge and smooth single-lever control.',
  'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Wall Mixer Tap',
  'wall-mixer-tap',
  'BF-503',
  'BF-503',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Chrome Brass',
  NULL,
  NULL,
  'Wall-mounted hot & cold mixer Wall-mounted mixer tap for bathroom basins — compact, modern Indian bathroom fit.',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Pillar Cock Tap',
  'pillar-cock-tap',
  'BF-504',
  'BF-504',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Chrome Brass',
  NULL,
  NULL,
  'Classic pillar cock for wash basins Traditional pillar cock tap with cross-head handles — durable brass body for everyday use.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Health Faucet Jet Spray',
  'health-faucet-jet-spray',
  'BF-505',
  'BF-505',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Chrome ABS',
  NULL,
  NULL,
  'Handheld health faucet with hose Wall-mounted health faucet with flexible hose — essential for modern Indian bathrooms.',
  'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Concealed Shower Mixer',
  'concealed-shower-mixer',
  'BF-506',
  'BF-506',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Chrome Brass',
  NULL,
  NULL,
  'Concealed diverter with overhead shower Concealed shower mixer with diverter — clean wall look with overhead rain shower option.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Sensor Automatic Tap',
  'sensor-automatic-tap',
  'BF-507',
  'BF-507',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Chrome & Sensor Module',
  NULL,
  NULL,
  'Touchless infrared sensor tap Automatic sensor tap for basins — hygienic, water-saving option for homes and offices.',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;

INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  'Rain Shower Head Set',
  'rain-shower-head-set',
  'BF-508',
  'BF-508',
  (SELECT id FROM categories WHERE slug = 'bathroom-fittings' LIMIT 1),
  0,
  0,
  18,
  5,
  2,
  'pc',
  'Stainless Steel & Chrome',
  NULL,
  NULL,
  'Overhead rain shower with hand shower Luxury rain shower set with adjustable hand shower and anti-clog nozzles.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&auto=format&fit=crop',
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;
