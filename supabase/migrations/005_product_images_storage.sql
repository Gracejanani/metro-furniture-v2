-- Public product images bucket + staff upload policies

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
CREATE POLICY "product_images_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "product_images_staff_insert" ON storage.objects;
CREATE POLICY "product_images_staff_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND public.current_user_role() IN ('ADMIN', 'MANAGER')
  );

DROP POLICY IF EXISTS "product_images_staff_update" ON storage.objects;
CREATE POLICY "product_images_staff_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND public.current_user_role() IN ('ADMIN', 'MANAGER')
  );

DROP POLICY IF EXISTS "product_images_staff_delete" ON storage.objects;
CREATE POLICY "product_images_staff_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND public.current_user_role() IN ('ADMIN', 'MANAGER')
  );

-- Extra POS categories from website catalog
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Corner Sofas', 'corner-sofas', 1),
  ('Chandeliers', 'chandeliers', 12),
  ('Wall Lights', 'wall-lights', 13),
  ('Bathroom Fittings', 'bathroom-fittings', 14)
ON CONFLICT (slug) DO NOTHING;
