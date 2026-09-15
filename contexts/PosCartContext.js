"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { calculateGrandTotal, calculateSubtotal } from "@/lib/billing/calculate";

const PosCartContext = createContext(null);

export function PosCartProvider({ children, taxMode = "intra" }) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [isWalkIn, setIsWalkIn] = useState(true);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [cartDiscountType, setCartDiscountType] = useState("fixed");
  const [scanFlash, setScanFlash] = useState(null);

  const addProduct = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + qty,
        };
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          sku: product.sku,
          image_url: product.image_url,
          unitPrice: Number(product.selling_price ?? product.sellingPrice ?? 0),
          gstRate: Number(product.gst_rate ?? product.gstRate ?? 18),
          quantity: qty,
          itemDiscount: 0,
          itemDiscountType: "fixed",
          stock: product.stock_quantity ?? product.stock,
        },
      ];
    });
    setScanFlash({ type: "success", id: product.id });
    setTimeout(() => setScanFlash(null), 600);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.floor(quantity) } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const selectCustomer = useCallback((c) => {
    setIsWalkIn(false);
    setCustomer(c);
  }, []);

  const setWalkInCustomer = useCallback(() => {
    setIsWalkIn(true);
    setCustomer(null);
  }, []);

  /** Clears line items only — keeps selected customer. */
  const clearCart = useCallback(() => {
    setItems([]);
    setCartDiscount(0);
    setCartDiscountType("fixed");
  }, []);

  const resetAfterSale = useCallback(() => {
    setItems([]);
    setCartDiscount(0);
    setCartDiscountType("fixed");
    setIsWalkIn(true);
    setCustomer(null);
  }, []);

  const billing = useMemo(() => {
    const lineItems = items.map((i) => ({
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      gstRate: i.gstRate,
      itemDiscount: i.itemDiscount,
      itemDiscountType: i.itemDiscountType,
    }));
    const subtotal = calculateSubtotal(lineItems);
    return calculateGrandTotal({
      subtotal,
      cartDiscount,
      cartDiscountType,
      items: lineItems,
      taxMode,
    });
  }, [items, cartDiscount, cartDiscountType, taxMode]);

  const value = useMemo(
    () => ({
      items,
      customer,
      isWalkIn,
      cartDiscount,
      cartDiscountType,
      scanFlash,
      billing,
      addProduct,
      updateQuantity,
      removeItem,
      clearCart,
      resetAfterSale,
      selectCustomer,
      setWalkInCustomer,
      setCustomer,
      setIsWalkIn,
      setCartDiscount,
      setCartDiscountType,
    }),
    [
      items,
      customer,
      isWalkIn,
      cartDiscount,
      cartDiscountType,
      scanFlash,
      billing,
      addProduct,
      updateQuantity,
      removeItem,
      clearCart,
      resetAfterSale,
      selectCustomer,
      setWalkInCustomer,
    ]
  );

  return (
    <PosCartContext.Provider value={value}>{children}</PosCartContext.Provider>
  );
}

export function usePosCart() {
  const ctx = useContext(PosCartContext);
  if (!ctx) throw new Error("usePosCart must be used within PosCartProvider");
  return ctx;
}
