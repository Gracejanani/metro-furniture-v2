-- Secure public digital invoice link (QR on printed invoice)

ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS digital_token TEXT;

UPDATE invoices
SET digital_token = encode(gen_random_bytes(16), 'hex')
WHERE digital_token IS NULL;

ALTER TABLE invoices
  ALTER COLUMN digital_token SET DEFAULT encode(gen_random_bytes(16), 'hex');

CREATE UNIQUE INDEX IF NOT EXISTS invoices_digital_token_unique ON invoices (digital_token);

CREATE OR REPLACE FUNCTION public.get_invoice_digital(p_invoice_id UUID, p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_inv invoices;
BEGIN
  IF p_token IS NULL OR length(trim(p_token)) < 8 THEN
    RETURN NULL;
  END IF;

  SELECT * INTO v_inv
  FROM invoices
  WHERE id = p_invoice_id
    AND digital_token = p_token
    AND status <> 'CANCELLED';

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  RETURN jsonb_build_object(
    'invoice', to_jsonb(v_inv),
    'items', COALESCE((
      SELECT jsonb_agg(
        to_jsonb(ii) || jsonb_build_object(
          'products', COALESCE((
            SELECT jsonb_build_object('image_url', p.image_url, 'material', p.material)
            FROM products p WHERE p.id = ii.product_id
          ), '{}'::jsonb)
        )
        ORDER BY ii.created_at
      )
      FROM invoice_items ii
      WHERE ii.invoice_id = v_inv.id
    ), '[]'::jsonb),
    'payments', COALESCE((
      SELECT jsonb_agg(to_jsonb(pay) ORDER BY pay.created_at)
      FROM payments pay
      WHERE pay.invoice_id = v_inv.id
    ), '[]'::jsonb),
    'customer', (
      SELECT to_jsonb(c) FROM customers c WHERE c.id = v_inv.customer_id
    ),
    'settings', (
      SELECT to_jsonb(s) FROM business_settings s LIMIT 1
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_invoice_digital(UUID, TEXT) TO anon, authenticated;
