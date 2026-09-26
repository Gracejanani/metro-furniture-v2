"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, MessageCircle, Send, ShoppingBag, X } from "lucide-react";
import {
  QUICK_ACTIONS,
  getChatResponse,
  processOrderStep,
} from "@/lib/chatbot";
import { getProductBySlug } from "@/data/products";
import { PriceOnly } from "@/components/PriceTag";

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function ChatProductCard({ product, onSelect }) {
  return (
    <div className="glass-card mt-2 overflow-hidden rounded-xl">
      <Link href={`/product/${product.slug}`} className="flex gap-3 p-2.5 transition hover:bg-muted/40">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-xs font-medium text-foreground">{product.name}</p>
          <p className="mt-0.5 text-[11px] text-body">{product.category}</p>
          <div className="mt-1">
            <PriceOnly product={product} size="sm" />
          </div>
        </div>
        <ArrowRight className="mt-4 h-4 w-4 shrink-0 text-body/50" />
      </Link>
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="w-full border-t border-border/60 py-2 text-[11px] font-medium text-accent transition hover:bg-accent/5"
        >
          Order this product
        </button>
      ) : null}
    </div>
  );
}

export default function ChatAssistant() {
  const pathname = usePathname();
  const productContext = pathname?.startsWith("/product/")
    ? getProductBySlug(pathname.split("/product/")[1])
    : null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [orderFlow, setOrderFlow] = useState(null);
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  const bottomRef = useRef(null);
  const pushBot = useCallback((text, extra = {}) => {
    setMessages((prev) => [...prev, { role: "bot", text, ...extra }]);
    if (extra.whatsappUrl) setWhatsappUrl(extra.whatsappUrl);
    if (extra.orderFlow !== undefined) setOrderFlow(extra.orderFlow);
  }, []);

  const pushUser = useCallback((text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }, []);

  const greet = useCallback(() => {
    if (productContext) {
      pushBot(`I can help with **${productContext.name}** — ask anything or order on WhatsApp.`, {
        productCards: [productContext],
        actions: QUICK_ACTIONS,
      });
      return;
    }
    const res = getChatResponse("hello");
    pushBot(res.text, { actions: res.actions });
  }, [productContext, pushBot]);

  useEffect(() => {
    if (open && messages.length === 0) greet();
  }, [open, messages.length, greet]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, whatsappUrl]);

  const handleSend = (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    pushUser(msg);

    if (orderFlow) {
      const productHint = productContext && orderFlow.step === "product" ? productContext : null;
      const res = processOrderStep(orderFlow.step, msg, orderFlow.data, productHint);
      pushBot(res.text, {
        orderFlow: res.orderFlow,
        whatsappUrl: res.whatsappUrl,
        productCards: res.productCards,
        actions: res.actions,
      });
      return;
    }

    const res = getChatResponse(msg, { orderFlow });
    if (res.orderFlow) setOrderFlow(res.orderFlow);
    pushBot(res.text, {
      actions: res.actions,
      productCards: res.productCards,
    });
  };

  const startOrder = (product) => {
    pushUser(`Order ${product.name}`);
    const res = processOrderStep("product", product.name, {}, product);
    pushBot(res.text, { orderFlow: res.orderFlow, productCards: res.productCards });
  };

  const handleQuickAction = (action) => {
    if (action.id === "order") {
      if (productContext) {
        startOrder(productContext);
        return;
      }
      handleSend("I want to place an order");
      return;
    }

    const prompts = {
      sofas: "Show me sofa sets",
      corners: "Show corner sofas",
      dining: "Show dining sets",
      lights: "Show lighting collection",
      location: "Where is the showroom?",
      hours: "What are your timings?",
    };
    handleSend(prompts[action.id] || action.label);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        className="glass-nav fixed bottom-5 left-5 z-[60] flex h-13 w-13 items-center justify-center rounded-full border border-white/20 text-accent shadow-[0_8px_24px_rgba(25,33,28,0.28)] transition hover:scale-105 hover:text-white md:z-50"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="glass-card fixed inset-x-0 bottom-0 z-50 flex h-[min(100dvh,100%)] max-h-[100dvh] flex-col overflow-hidden rounded-t-2xl border-white/65 shadow-[0_16px_48px_rgba(26,33,27,0.2)] md:inset-x-auto md:bottom-24 md:left-5 md:h-[min(520px,calc(100vh-8rem))] md:w-[min(400px,calc(100vw-2.5rem))] md:rounded-2xl">
          <div className="flex items-center gap-3 border-b border-white/55 bg-white/30 px-4 py-3.5 backdrop-blur-xl">
            <div className="glass flex h-9 w-9 items-center justify-center rounded-full">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Metro Assistant</p>
              <p className="text-[11px] text-body">Products · Orders · Showroom</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-body transition hover:bg-muted"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{renderText(msg.text)}</div>

                  {msg.productCards?.length ? (
                    <div className="space-y-2">
                      {msg.productCards.map((p) => (
                        <ChatProductCard
                          key={p.id}
                          product={p}
                          onSelect={msg.role === "bot" ? startOrder : undefined}
                        />
                      ))}
                    </div>
                  ) : null}

                  {msg.actions?.length && msg.role === "bot" ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.actions.slice(0, 4).map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => handleQuickAction(a)}
                          className="rounded-lg bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground ring-1 ring-border transition hover:bg-accent hover:text-white"
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
              >
                <ShoppingBag className="h-4 w-4" />
                Send on WhatsApp
              </a>
            ) : null}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border/60 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  orderFlow?.step === "mobile"
                    ? "Mobile number..."
                    : orderFlow?.step === "address"
                      ? "Delivery address..."
                      : orderFlow?.step === "product"
                        ? "Product name..."
                        : "Ask about a product..."
                }
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
              />
              <button
                type="submit"
                className="premium-button flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition hover:bg-accent-dark"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
