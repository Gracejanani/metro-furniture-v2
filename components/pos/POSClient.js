"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import POSHeader from "./POSHeader";
import CategoryTabs from "./CategoryTabs";
import ProductGrid from "./ProductGrid";
import Cart from "./Cart";
import BarcodeScanner from "./BarcodeScanner";
import PaymentPanel from "./PaymentPanel";
import CustomerSelector from "./CustomerSelector";
import CartCustomerBar from "./CartCustomerBar";
import SaleSuccess from "./SaleSuccess";
import ProductDetailModal from "./ProductDetailModal";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { usePosCart } from "@/contexts/PosCartContext";
import { formatINR } from "@/lib/billing/calculate";

export default function POSClient({ initialCategories }) {
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanOpen, setScanOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [saleSuccess, setSaleSuccess] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [barcodeError, setBarcodeError] = useState("");
  const barcodeRef = useRef(null);
  const { addProduct, scanFlash, items, billing } = usePosCart();

  const categoryMap = Object.fromEntries(
    initialCategories.map((c) => [c.id, c.name])
  );
  const tabs = initialCategories.map((c) => ({ slug: c.slug, name: c.name }));

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (categorySlug && categorySlug !== "all" && categorySlug !== "more") {
      params.set("category", categorySlug);
    }
    const res = await fetch(`/api/pos/products?${params}`);
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }, [search, categorySlug]);

  useEffect(() => {
    const t = setTimeout(loadProducts, 200);
    return () => clearTimeout(t);
  }, [loadProducts]);

  const lookupBarcode = useCallback(
    async (code) => {
      if (!code?.trim()) return;
      setBarcodeError("");
      const supabase = createClient();
      const trimmed = code.trim();
      let { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("barcode", trimmed)
        .eq("is_active", true)
        .maybeSingle();
      if (!data) {
        ({ data, error } = await supabase
          .from("products")
          .select("*")
          .eq("sku", trimmed)
          .eq("is_active", true)
          .maybeSingle());
      }
      if (error || !data) {
        setBarcodeError("Product not found for this barcode");
        return;
      }
      if (data.stock_quantity <= 0) {
        setBarcodeError("Insufficient stock");
        return;
      }
      addProduct(data);
      barcodeRef.current?.focus();
    },
    [addProduct]
  );

  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.querySelector('[type="search"]')?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <POSHeader
        search={search}
        onSearchChange={setSearch}
        onScanClick={() => setScanOpen(true)}
        barcodeInputRef={barcodeRef}
        onBarcodeSubmit={lookupBarcode}
      />
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold">POS / New Sale</h1>
              <p className="text-sm text-body">
                Scan, search or select products to add to cart
              </p>
            </div>
            <Link
              href="/products/new"
              className="inline-flex items-center gap-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-medium"
            >
              <Plus className="h-3.5 w-3.5" /> Add Product
            </Link>
          </div>
          {barcodeError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{barcodeError}</p>
          )}
          <div className="lg:hidden">
            <CartCustomerBar onChangeClick={() => setCustomerOpen(true)} />
          </div>
          <CategoryTabs
            categories={tabs}
            activeSlug={categorySlug}
            onChange={setCategorySlug}
          />
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : (
            <ProductGrid
              products={products}
              categoryMap={categoryMap}
              onAdd={addProduct}
              onView={setDetailProduct}
              flashId={scanFlash?.id}
            />
          )}
        </div>
        <aside className="hidden w-[360px] shrink-0 border-l border-black/5 lg:block">
          <Cart
            onCheckout={() => setPaymentOpen(true)}
            onCustomerClick={() => setCustomerOpen(true)}
          />
        </aside>
      </div>

      {/* Mobile cart bar */}
      <div className="lg:hidden fixed bottom-14 inset-x-0 z-30 border-t border-black/10 bg-white px-4 py-2 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setCartOpen(true)} className="text-left">
          <p className="text-xs text-body">{items.length} Items</p>
          <p className="font-bold">{formatINR(billing.grandTotal)}</p>
        </button>
        <button
          type="button"
          onClick={() => setPaymentOpen(true)}
          className="rounded-xl bg-[#1a1c20] px-4 py-2 text-sm font-semibold text-white"
        >
          Checkout
        </button>
      </div>

      {cartOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end bg-black/40">
          <div className="max-h-[85vh] overflow-hidden rounded-t-2xl bg-white">
            <Cart
              onCheckout={() => {
                setCartOpen(false);
                setPaymentOpen(true);
              }}
              onCustomerClick={() => setCustomerOpen(true)}
            />
          </div>
          <button
            type="button"
            className="bg-white py-3 text-sm font-medium"
            onClick={() => setCartOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      <BarcodeScanner
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onScan={lookupBarcode}
      />
      <CustomerSelector open={customerOpen} onClose={() => setCustomerOpen(false)} />
      <PaymentPanel
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onSuccess={setSaleSuccess}
      />
      <SaleSuccess sale={saleSuccess} onNewSale={() => setSaleSuccess(null)} />
      <ProductDetailModal
        product={detailProduct}
        categoryName={
          detailProduct?.categories?.name ||
          (detailProduct ? categoryMap[detailProduct.category_id] : "")
        }
        onClose={() => setDetailProduct(null)}
        onAdd={addProduct}
      />
    </>
  );
}
