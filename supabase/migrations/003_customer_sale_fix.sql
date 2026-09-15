-- Link customer on invoice when customer_id is sent; validate customer exists.

CREATE OR REPLACE FUNCTION public.create_sale(payload JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id UUID;
  v_role user_role;
  v_settings RECORD;
  v_customer_id UUID;
  v_is_walk_in BOOLEAN;
  v_items JSONB;
  v_payments JSONB;
  v_cart_discount NUMERIC;
  v_cart_discount_type TEXT;
  v_subtotal NUMERIC := 0;
  v_discount NUMERIC := 0;
  v_taxable NUMERIC := 0;
  v_cgst NUMERIC := 0;
  v_sgst NUMERIC := 0;
  v_igst NUMERIC := 0;
  v_grand NUMERIC;
  v_round NUMERIC;
  v_invoice_id UUID;
  v_invoice_no TEXT;
  v_paid NUMERIC := 0;
  v_item JSONB;
  v_prod RECORD;
  v_qty INT;
  v_line NUMERIC;
  v_item_disc NUMERIC;
  v_line_taxable NUMERIC;
  v_tax NUMERIC;
  v_line_total NUMERIC;
  v_pay JSONB;
  v_max_disc_pct NUMERIC;
BEGIN
  v_profile_id := current_profile_id();
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  v_role := current_user_role();
  SELECT * INTO v_settings FROM business_settings LIMIT 1;

  v_customer_id := NULLIF(payload->>'customer_id', '')::UUID;
  v_is_walk_in := COALESCE((payload->>'is_walk_in')::BOOLEAN, true);
  v_items := payload->'items';
  v_payments := payload->'payments';
  v_cart_discount := COALESCE((payload->>'cart_discount')::NUMERIC, 0);
  v_cart_discount_type := COALESCE(payload->>'cart_discount_type', 'fixed');

  IF v_customer_id IS NOT NULL THEN
    v_is_walk_in := false;
    IF NOT EXISTS (
      SELECT 1 FROM customers WHERE id = v_customer_id AND is_walk_in = false
    ) THEN
      RAISE EXCEPTION 'Customer not found';
    END IF;
  ELSE
    v_customer_id := NULL;
    v_is_walk_in := true;
  END IF;

  IF v_items IS NULL OR jsonb_array_length(v_items) = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;

  v_max_disc_pct := CASE v_role
    WHEN 'ADMIN' THEN 100
    WHEN 'MANAGER' THEN v_settings.manager_max_discount_percent
    ELSE v_settings.cashier_max_discount_percent
  END;

  FOR v_item IN SELECT * FROM jsonb_array_elements(v_items)
  LOOP
    SELECT * INTO v_prod FROM products WHERE id = (v_item->>'product_id')::UUID AND is_active = true FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Product not found'; END IF;
    v_qty := (v_item->>'quantity')::INT;
    IF v_qty <= 0 THEN RAISE EXCEPTION 'Invalid quantity'; END IF;
    IF v_prod.stock_quantity < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for %', v_prod.sku;
    END IF;
    v_line := v_prod.selling_price * v_qty;
    v_item_disc := COALESCE((v_item->>'item_discount')::NUMERIC, 0);
    IF COALESCE(v_item->>'item_discount_type', 'fixed') = 'percentage' THEN
      v_item_disc := LEAST(v_line, v_line * v_item_disc / 100);
    ELSE
      v_item_disc := LEAST(v_line, v_item_disc);
    END IF;
    v_subtotal := v_subtotal + (v_line - v_item_disc);
  END LOOP;

  IF v_cart_discount_type = 'percentage' THEN
    v_discount := LEAST(v_subtotal, v_subtotal * v_cart_discount / 100);
  ELSE
    v_discount := LEAST(v_subtotal, v_cart_discount);
  END IF;

  IF v_subtotal > 0 AND (v_discount / v_subtotal * 100) > v_max_disc_pct THEN
    RAISE EXCEPTION 'Discount exceeds allowed limit for your role';
  END IF;

  v_taxable := GREATEST(0, v_subtotal - v_discount);

  FOR v_item IN SELECT * FROM jsonb_array_elements(v_items)
  LOOP
    SELECT * INTO v_prod FROM products WHERE id = (v_item->>'product_id')::UUID;
    v_qty := (v_item->>'quantity')::INT;
    v_line := v_prod.selling_price * v_qty;
    v_item_disc := COALESCE((v_item->>'item_discount')::NUMERIC, 0);
    IF COALESCE(v_item->>'item_discount_type', 'fixed') = 'percentage' THEN
      v_item_disc := LEAST(v_line, v_line * v_item_disc / 100);
    ELSE
      v_item_disc := LEAST(v_line, v_item_disc);
    END IF;
    v_line_taxable := (v_line - v_item_disc);
    IF v_subtotal > 0 THEN
      v_line_taxable := v_line_taxable * (v_taxable / v_subtotal);
    END IF;
    v_tax := v_line_taxable * v_prod.gst_rate / 100;
    IF v_settings.tax_mode = 'inter' THEN
      v_igst := v_igst + v_tax;
    ELSE
      v_cgst := v_cgst + v_tax / 2;
      v_sgst := v_sgst + v_tax / 2;
    END IF;
  END LOOP;

  v_grand := ROUND(v_taxable + v_cgst + v_sgst + v_igst);
  v_round := v_grand - (v_taxable + v_cgst + v_sgst + v_igst);

  FOR v_pay IN SELECT * FROM jsonb_array_elements(COALESCE(v_payments, '[]'::jsonb))
  LOOP
    v_paid := v_paid + (v_pay->>'amount')::NUMERIC;
  END LOOP;

  IF ABS(v_paid - v_grand) > 0.01 THEN
    RAISE EXCEPTION 'Payment total does not match invoice total';
  END IF;

  v_invoice_no := generate_invoice_number();

  INSERT INTO invoices (
    invoice_number, customer_id, is_walk_in, subtotal, discount, taxable_amount,
    cgst, sgst, igst, round_off, grand_total, payment_status, status, created_by
  ) VALUES (
    v_invoice_no, v_customer_id, v_is_walk_in, v_subtotal, v_discount, v_taxable,
    v_cgst, v_sgst, v_igst, v_round, v_grand, 'PAID', 'CONFIRMED', v_profile_id
  ) RETURNING id INTO v_invoice_id;

  FOR v_item IN SELECT * FROM jsonb_array_elements(v_items)
  LOOP
    SELECT * INTO v_prod FROM products WHERE id = (v_item->>'product_id')::UUID FOR UPDATE;
    v_qty := (v_item->>'quantity')::INT;
    v_line := v_prod.selling_price * v_qty;
    v_item_disc := COALESCE((v_item->>'item_discount')::NUMERIC, 0);
    IF COALESCE(v_item->>'item_discount_type', 'fixed') = 'percentage' THEN
      v_item_disc := LEAST(v_line, v_line * v_item_disc / 100);
    ELSE
      v_item_disc := LEAST(v_line, v_item_disc);
    END IF;
    v_line_taxable := (v_line - v_item_disc);
    IF v_subtotal > 0 THEN
      v_line_taxable := v_line_taxable * (v_taxable / v_subtotal);
    END IF;
    v_tax := v_line_taxable * v_prod.gst_rate / 100;
    IF v_settings.tax_mode = 'inter' THEN
      v_line_total := v_line_taxable + v_tax;
      INSERT INTO invoice_items (invoice_id, product_id, product_name, sku, quantity, unit_price, item_discount, gst_rate, cgst, sgst, igst, line_total)
      VALUES (v_invoice_id, v_prod.id, v_prod.name, v_prod.sku, v_qty, v_prod.selling_price, v_item_disc, v_prod.gst_rate, 0, 0, v_tax, v_line_total);
    ELSE
      v_line_total := v_line_taxable + v_tax;
      INSERT INTO invoice_items (invoice_id, product_id, product_name, sku, quantity, unit_price, item_discount, gst_rate, cgst, sgst, igst, line_total)
      VALUES (v_invoice_id, v_prod.id, v_prod.name, v_prod.sku, v_qty, v_prod.selling_price, v_item_disc, v_prod.gst_rate, v_tax/2, v_tax/2, 0, v_line_total);
    END IF;

    INSERT INTO stock_movements (product_id, movement_type, quantity, previous_quantity, new_quantity, reference_type, reference_id, created_by)
    VALUES (v_prod.id, 'SALE', -v_qty, v_prod.stock_quantity, v_prod.stock_quantity - v_qty, 'invoice', v_invoice_id, v_profile_id);

    UPDATE products SET stock_quantity = stock_quantity - v_qty, updated_at = now() WHERE id = v_prod.id;
    UPDATE inventory SET quantity = v_prod.stock_quantity - v_qty, updated_at = now() WHERE product_id = v_prod.id;
  END LOOP;

  FOR v_pay IN SELECT * FROM jsonb_array_elements(COALESCE(v_payments, '[]'::jsonb))
  LOOP
    INSERT INTO payments (invoice_id, method, amount, reference_number, notes, status, created_by)
    VALUES (
      v_invoice_id,
      (v_pay->>'method')::payment_method,
      (v_pay->>'amount')::NUMERIC,
      v_pay->>'reference_number',
      v_pay->>'notes',
      COALESCE((v_pay->>'status')::payment_status, 'PAID'),
      v_profile_id
    );
  END LOOP;

  PERFORM log_audit('SALE_CREATED', 'invoice', v_invoice_id, jsonb_build_object('invoice_number', v_invoice_no, 'grand_total', v_grand, 'customer_id', v_customer_id));

  RETURN jsonb_build_object('invoice_id', v_invoice_id, 'invoice_number', v_invoice_no, 'grand_total', v_grand);
END;
$$;

-- RLS: allow insert/select/update for authenticated staff
DROP POLICY IF EXISTS customers_all ON customers;
CREATE POLICY customers_select ON customers FOR SELECT TO authenticated USING (true);
CREATE POLICY customers_insert ON customers FOR INSERT TO authenticated WITH CHECK (is_walk_in = false);
CREATE POLICY customers_update ON customers FOR UPDATE TO authenticated USING (is_walk_in = false);
