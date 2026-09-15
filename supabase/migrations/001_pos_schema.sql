-- Metro Furniture POS — run in Supabase SQL Editor or via CLI

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'CASHIER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('CASH', 'UPI', 'CARD', 'BANK_TRANSFER', 'OTHER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'PARTIAL', 'REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE invoice_status AS ENUM ('DRAFT', 'CONFIRMED', 'CANCELLED', 'RETURNED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE stock_movement_type AS ENUM ('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT', 'DAMAGE', 'TRANSFER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT,
  role user_role NOT NULL DEFAULT 'CASHIER',
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL DEFAULT 'Metro Furniture, Dharmapuri',
  gstin TEXT,
  tax_mode TEXT NOT NULL DEFAULT 'intra' CHECK (tax_mode IN ('intra', 'inter')),
  default_gst_rate NUMERIC(5,2) NOT NULL DEFAULT 18,
  cashier_max_discount_percent NUMERIC(5,2) NOT NULL DEFAULT 5,
  manager_max_discount_percent NUMERIC(5,2) NOT NULL DEFAULT 25,
  invoice_prefix TEXT NOT NULL DEFAULT 'MF',
  terms_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO business_settings (store_name) SELECT 'Metro Furniture, Dharmapuri'
WHERE NOT EXISTS (SELECT 1 FROM business_settings LIMIT 1);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  product_code TEXT NOT NULL UNIQUE,
  sku TEXT NOT NULL UNIQUE,
  barcode TEXT UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand TEXT,
  description TEXT,
  cost_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  mrp NUMERIC(12,2) NOT NULL DEFAULT 0,
  selling_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  offer_price NUMERIC(12,2),
  gst_rate NUMERIC(5,2) NOT NULL DEFAULT 18,
  stock_quantity INT NOT NULL DEFAULT 0,
  minimum_stock INT NOT NULL DEFAULT 2,
  unit TEXT NOT NULL DEFAULT 'pc',
  material TEXT,
  color TEXT,
  size TEXT,
  dimensions TEXT,
  weight TEXT,
  warranty TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  barcode TEXT UNIQUE,
  selling_price NUMERIC(12,2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  attributes JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mobile TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  gstin TEXT,
  is_walk_in BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS customers_walk_in_unique ON customers (is_walk_in) WHERE is_walk_in = true;

INSERT INTO customers (name, mobile, is_walk_in)
SELECT 'Walk-in Customer', NULL, true
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE is_walk_in = true);

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  is_walk_in BOOLEAN NOT NULL DEFAULT false,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  taxable_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  cgst NUMERIC(12,2) NOT NULL DEFAULT 0,
  sgst NUMERIC(12,2) NOT NULL DEFAULT 0,
  igst NUMERIC(12,2) NOT NULL DEFAULT 0,
  round_off NUMERIC(12,2) NOT NULL DEFAULT 0,
  grand_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_status payment_status NOT NULL DEFAULT 'PENDING',
  status invoice_status NOT NULL DEFAULT 'CONFIRMED',
  notes TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  sku TEXT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL,
  item_discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  gst_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  cgst NUMERIC(12,2) NOT NULL DEFAULT 0,
  sgst NUMERIC(12,2) NOT NULL DEFAULT 0,
  igst NUMERIC(12,2) NOT NULL DEFAULT 0,
  line_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  method payment_method NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  reference_number TEXT,
  notes TEXT,
  status payment_status NOT NULL DEFAULT 'PAID',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  movement_type stock_movement_type NOT NULL,
  quantity INT NOT NULL,
  previous_quantity INT NOT NULL,
  new_quantity INT NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  notes TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  customer_id UUID REFERENCES customers(id),
  reason TEXT,
  total_refund NUMERIC(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'COMPLETED',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS return_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id UUID NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  refund_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS invoice_sequences (
  year INT PRIMARY KEY,
  last_number INT NOT NULL DEFAULT 0
);

-- Helpers
CREATE OR REPLACE FUNCTION public.current_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM profiles WHERE auth_user_id = auth.uid() AND is_active = true LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE auth_user_id = auth.uid() AND is_active = true LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  y INT := EXTRACT(YEAR FROM now())::INT;
  n INT;
  prefix TEXT;
BEGIN
  SELECT invoice_prefix INTO prefix FROM business_settings LIMIT 1;
  IF prefix IS NULL THEN prefix := 'MF'; END IF;

  INSERT INTO invoice_sequences (year, last_number)
  VALUES (y, 1)
  ON CONFLICT (year) DO UPDATE SET last_number = invoice_sequences.last_number + 1
  RETURNING last_number INTO n;

  RETURN prefix || '-' || y::TEXT || '-' || lpad(n::TEXT, 6, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.log_audit(p_action TEXT, p_entity_type TEXT, p_entity_id UUID, p_metadata JSONB DEFAULT '{}')
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, metadata)
  VALUES (current_profile_id(), p_action, p_entity_type, p_entity_id, p_metadata);
END;
$$;

-- create_sale RPC
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

  v_customer_id := (payload->>'customer_id')::UUID;
  v_is_walk_in := COALESCE((payload->>'is_walk_in')::BOOLEAN, false);
  v_items := payload->'items';
  v_payments := payload->'payments';
  v_cart_discount := COALESCE((payload->>'cart_discount')::NUMERIC, 0);
  v_cart_discount_type := COALESCE(payload->>'cart_discount_type', 'fixed');

  IF v_items IS NULL OR jsonb_array_length(v_items) = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;

  v_max_disc_pct := CASE v_role
    WHEN 'ADMIN' THEN 100
    WHEN 'MANAGER' THEN v_settings.manager_max_discount_percent
    ELSE v_settings.cashier_max_discount_percent
  END;

  -- First pass: subtotal from DB prices
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

  -- Tax pass (proportional allocation)
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

  PERFORM log_audit('SALE_CREATED', 'invoice', v_invoice_id, jsonb_build_object('invoice_number', v_invoice_no, 'grand_total', v_grand));

  RETURN jsonb_build_object('invoice_id', v_invoice_id, 'invoice_number', v_invoice_no, 'grand_total', v_grand);
END;
$$;

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = auth_user_id OR current_user_role() IN ('ADMIN', 'MANAGER'));

CREATE POLICY profiles_update_self ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY categories_read ON categories FOR SELECT TO authenticated USING (true);
CREATE POLICY categories_write ON categories FOR ALL TO authenticated
  USING (current_user_role() IN ('ADMIN', 'MANAGER'));

CREATE POLICY products_read ON products FOR SELECT TO authenticated USING (true);
CREATE POLICY products_write ON products FOR ALL TO authenticated
  USING (current_user_role() IN ('ADMIN', 'MANAGER'));

CREATE POLICY customers_all ON customers FOR ALL TO authenticated USING (true);

CREATE POLICY invoices_read ON invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY invoices_insert ON invoices FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY invoice_items_read ON invoice_items FOR SELECT TO authenticated USING (true);

CREATE POLICY payments_read ON payments FOR SELECT TO authenticated USING (true);

CREATE POLICY stock_movements_read ON stock_movements FOR SELECT TO authenticated
  USING (current_user_role() IN ('ADMIN', 'MANAGER'));
CREATE POLICY stock_movements_write ON stock_movements FOR INSERT TO authenticated
  WITH CHECK (current_user_role() IN ('ADMIN', 'MANAGER'));

CREATE POLICY settings_read ON business_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY settings_write ON business_settings FOR ALL TO authenticated
  USING (current_user_role() = 'ADMIN');

CREATE POLICY audit_read ON audit_logs FOR SELECT TO authenticated
  USING (current_user_role() IN ('ADMIN', 'MANAGER'));

-- Seed categories
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Sofas', 'sofas', 1),
  ('Mattresses', 'mattresses', 2),
  ('Cots & Beds', 'cots-beds', 3),
  ('Dining', 'dining', 4),
  ('Lighting', 'lighting', 5),
  ('Chairs', 'chairs', 6),
  ('Tables', 'tables', 7),
  ('Accessories', 'accessories', 8)
ON CONFLICT (slug) DO NOTHING;

-- Storage bucket (run separately if needed):
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

GRANT EXECUTE ON FUNCTION public.create_sale(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_invoice_number() TO authenticated;
