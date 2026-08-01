"use client";

import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { business } from "@/data/business";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
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

  const whatsappMessage = `Hi ${business.shortName},\nName: ${form.name}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`;

  if (submitted) {
    return (
      <div className="rounded-3xl glass-card p-6">
        <h3 className="font-heading text-xl font-bold text-foreground">
          Thank you!
        </h3>
        <p className="mt-2 text-body">
          Your enquiry is ready. Continue on WhatsApp for a faster response.
        </p>
        <div className="mt-5">
          <WhatsAppButton message={whatsappMessage} label="Send on WhatsApp" />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl glass-card p-6"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
      >
        Submit Enquiry
      </button>
    </form>
  );
}
