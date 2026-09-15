"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { usePosCart } from "@/contexts/PosCartContext";

const emptyForm = {
  name: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  gstin: "",
};

export default function CustomerSelector({ open, onClose }) {
  const { selectCustomer, setWalkInCustomer } = usePosCart();
  const [tab, setTab] = useState("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const searchCustomers = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/pos/customers?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(data.customers || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => searchCustomers(query), 250);
    return () => clearTimeout(t);
  }, [query, open, searchCustomers]);

  useEffect(() => {
    if (!open) {
      setTab("search");
      setQuery("");
      setForm(emptyForm);
      setFormError("");
    }
  }, [open]);

  async function handleCreate(e) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const res = await fetch("/api/pos/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Could not save customer");
        return;
      }
      selectCustomer(data.customer);
      onClose();
    } catch {
      setFormError("Could not save customer. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Customer</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b text-sm">
          <button
            type="button"
            onClick={() => setTab("search")}
            className={`flex-1 py-2.5 font-medium ${tab === "search" ? "border-b-2 border-[#c8a96a] text-[#1a1c20]" : "text-body"}`}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setTab("create")}
            className={`flex flex-1 items-center justify-center gap-1 py-2.5 font-medium ${tab === "create" ? "border-b-2 border-[#c8a96a] text-[#1a1c20]" : "text-body"}`}
          >
            <UserPlus className="h-4 w-4" /> New Customer
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-3">
          <button
            type="button"
            onClick={() => {
              setWalkInCustomer();
              onClose();
            }}
            className="w-full rounded-xl border-2 border-[#c8a96a] py-3 text-sm font-semibold"
          >
            Walk-in Customer
          </button>

          {tab === "search" && (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Name or mobile (min 1 character)"
                  className="w-full rounded-xl border border-black/10 py-2.5 pl-10 pr-3 text-sm"
                  autoFocus
                />
              </div>
              {loading && <p className="text-xs text-body">Searching…</p>}
              {!loading && query && results.length === 0 && (
                <p className="text-xs text-body">No customers found. Create a new customer.</p>
              )}
              <ul className="max-h-56 overflow-y-auto divide-y rounded-xl border border-black/8">
                {results.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="w-full px-3 py-3 text-left hover:bg-[#faf9f6]"
                      onClick={() => {
                        selectCustomer(c);
                        onClose();
                      }}
                    >
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-body">
                        {[c.mobile, c.city, c.gstin].filter(Boolean).join(" · ")}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {tab === "create" && (
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-body">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-body">Mobile *</label>
                <input
                  required
                  inputMode="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="10-digit mobile"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-body">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-body">GSTIN</label>
                  <input
                    value={form.gstin}
                    onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-body">Address</label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-body">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-body">Pincode</label>
                  <input
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  />
                </div>
              </div>
              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#1a1c20] py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save & Select Customer"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
