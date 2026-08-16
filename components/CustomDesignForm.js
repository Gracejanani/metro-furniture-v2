"use client";

import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { business } from "@/data/business";
import { categories } from "@/data/categories";
import { materials } from "@/data/brands";
import { customDesignMessage } from "@/lib/whatsapp";

export default function CustomDesignForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    furnitureType: "Sofa",
    material: "Wood",
    dimensions: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  const details = [
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Type: ${form.furnitureType}`,
    `Material: ${form.material}`,
    `Dimensions: ${form.dimensions || "Not specified"}`,
    `Message: ${form.message}`,
  ].join("\n");

  const whatsappMessage = customDesignMessage(details);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="font-heading text-xl font-bold text-foreground">
          Request ready
        </h3>
        <p className="mt-2 text-body">
          Continue on WhatsApp to share reference photos and get a custom quote
          from {business.shortName}.
        </p>
        <div className="mt-5">
          <WhatsAppButton message={whatsappMessage} label="Send on WhatsApp" />
        </div>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="furnitureType"
            className="mb-1.5 block text-sm font-medium"
          >
            Furniture Type
          </label>
          <select
            id="furnitureType"
            name="furnitureType"
            value={form.furnitureType}
            onChange={handleChange}
            className={fieldClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="material" className="mb-1.5 block text-sm font-medium">
            Preferred Material
          </label>
          <select
            id="material"
            name="material"
            value={form.material}
            onChange={handleChange}
            className={fieldClass}
          >
            {materials.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dimensions" className="mb-1.5 block text-sm font-medium">
          Dimensions (optional)
        </label>
        <input
          id="dimensions"
          name="dimensions"
          placeholder="e.g. 6×5 ft bed / L-shape sofa"
          value={form.dimensions}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Design notes
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Describe finish, colour, reference style…"
          value={form.message}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>

      <p className="text-xs text-body">
        Tip: After submitting, attach a reference photo in WhatsApp for a faster
        quote.
      </p>

      <button
        type="submit"
        className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
      >
        Request Custom Quote
      </button>
    </form>
  );
}
