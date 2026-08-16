import { business } from "@/data/business";
import { products } from "@/data/products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const OFF_TOPIC =
  "I can help with Metro Furniture products, pricing, showroom details, and placing a WhatsApp order. Ask about sofas, dining, chairs, mattresses, lighting or bathroom fittings — or tap **Order Now**.";

const GREETING = `Welcome to ${business.name}!\n\nAsk about any product, check prices, or tap **Order Now** to place a quick WhatsApp order.`;

export const QUICK_ACTIONS = [
  { id: "order", label: "Order Now", icon: "order" },
  { id: "sofas", label: "Sofa Sets", icon: "sofa" },
  { id: "corners", label: "Corner Sofas", icon: "corner" },
  { id: "dining", label: "Dining", icon: "dining" },
  { id: "lights", label: "Lighting", icon: "light" },
  { id: "location", label: "Showroom", icon: "pin" },
];

function normalize(text) {
  return text.toLowerCase().trim();
}

function findProduct(query) {
  const q = normalize(query);
  return products.find((p) => {
    const haystack = [p.name, p.model, p.slug, p.category, p.tagline, ...(p.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q) || q.split(/\s+/).some((w) => w.length > 2 && haystack.includes(w));
  });
}

function searchProducts(query) {
  const q = normalize(query);
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  return products.filter((p) => {
    const haystack = [p.name, p.model, p.category, p.description, p.tagline, ...(p.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return words.some((w) => haystack.includes(w));
  });
}

function formatProductAnswer(p) {
  const price = p.onRequest
    ? "**Get Best Price** — enquire on WhatsApp"
    : `**${p.priceLabel}**${p.mrp ? ` (MRP ~~₹${p.mrp.toLocaleString("en-IN")}~~)` : ""}`;
  const lines = [
    `**${p.name}** (${p.model})`,
    p.tagline ? `_${p.tagline}_` : null,
    `Category: ${p.category}`,
    `Price: ${price}`,
    p.configuration ? `Config: ${p.configuration}` : null,
    p.specs?.length
      ? `Specs: ${p.specs.slice(0, 3).map((s) => `${s.label}: ${s.value}`).join(" · ")}`
      : null,
    `\n[View product](/product/${p.slug}) · Tap **Order Now** to place order`,
  ];
  return lines.filter(Boolean).join("\n");
}

function categoryList(category) {
  const items = products.filter((p) => p.category === category).slice(0, 4);
  if (!items.length) return { text: `No ${category} found right now.`, actions: QUICK_ACTIONS };
  const list = items
    .map((p) => `• **${p.name}** — ${p.onRequest ? "Get Best Price" : p.priceLabel}`)
    .join("\n");
  return {
    text: `**${category}** (${products.filter((p) => p.category === category).length} items)\n\n${list}`,
    productCards: items,
    actions: QUICK_ACTIONS,
  };
}

function productReply(product, text) {
  return {
    text: text || formatProductAnswer(product),
    productCards: [product],
    actions: QUICK_ACTIONS,
  };
}

export function buildOrderWhatsApp({ product, mobile, address, name }) {
  const lines = [
    `*New Order — ${business.name}*`,
    "",
    product ? `Product: ${product.name} (${product.model})` : "Product: (customer to confirm)",
    product?.priceLabel && !product.onRequest ? `Price: ${product.priceLabel}` : null,
    "",
    name ? `Name: ${name}` : null,
    `Mobile: ${mobile}`,
    `Address: ${address}`,
    "",
    "Please confirm availability and delivery. Thank you!",
  ].filter(Boolean);
  return buildWhatsAppUrl(lines.join("\n"));
}

export function getChatResponse(input, context = {}) {
  const text = input?.trim();
  if (!text) return { text: GREETING, actions: QUICK_ACTIONS };

  const q = normalize(text);

  if (/^(hi|hello|hey|namaste|vanakkam|start)/.test(q)) {
    return { text: GREETING, actions: QUICK_ACTIONS };
  }

  if (/order|buy|purchase|book|place order/.test(q) && !context.orderFlow) {
    return {
      text: "Great! Let's place your order via WhatsApp — no online payment needed.\n\nWhich product would you like? (Type the name or model, e.g. **Alaska Corner** or **LL-D6054**)",
      orderFlow: { step: "product", data: {} },
      actions: [{ id: "order", label: "Order Now", icon: "order" }],
    };
  }

  if (/location|address|where|showroom|map|direction/.test(q)) {
    const addr = business.address;
    return {
      text: `📍 **${business.name}**\n${addr.line1}\n${addr.line2}\n${addr.city}, ${addr.state} ${addr.pin}\n\nLandmark: Near Senthil Nagar Bus Stop\n\n[Get directions](${business.whatsappUrl})`,
      actions: QUICK_ACTIONS,
    };
  }

  if (/hour|timing|open|close|time/.test(q)) {
    return {
      text: `🕘 **Showroom Timings**\n${business.hours}\n\nWalk in anytime — or WhatsApp us for a quick quote!`,
      actions: QUICK_ACTIONS,
    };
  }

  if (/phone|call|contact|whatsapp|number/.test(q)) {
    return {
      text: `📞 **Contact Us**\nPhone: +91 ${business.primaryPhone}\nWhatsApp: +91 ${business.whatsapp.slice(2)}\nEmail: ${business.email}`,
      actions: QUICK_ACTIONS,
    };
  }

  if (/deliver|delivery|install/.test(q)) {
    return {
      text: "We arrange **home delivery** across Dharmapuri and nearby towns. Delivery charges depend on location and item size — confirm when you place your order on WhatsApp.",
      actions: QUICK_ACTIONS,
    };
  }

  if (/payment|pay|card|upi|online/.test(q)) {
    return {
      text: "We don't take online payments on the website. Simply **order via WhatsApp** — our team confirms price, delivery and payment options directly with you.",
      actions: [{ id: "order", label: "Order Now", icon: "order" }],
    };
  }

  if (/corner|l-?shape|sectional/.test(q)) {
    return categoryList("Corner Sofas");
  }

  if (/dining|dinner|table set/.test(q)) {
    return categoryList("Dining");
  }

  if (/chair|office chair|lounge/.test(q)) {
    return categoryList("Chairs");
  }

  if (/mattress|bedding|foam/.test(q)) {
    return categoryList("Mattresses");
  }

  if (/bathroom|restroom|basin|tap|faucet|shower|sink|vanity|sanitary/.test(q)) {
    return categoryList("Bathroom Fittings");
  }

  if (/sofa|recliner|set/.test(q) && !/light|chandelier|wall/.test(q)) {
    return categoryList("Sofas");
  }

  if (/light|chandelier|sconce|lamp|led|wall light/.test(q)) {
    const wall = products.filter((p) => p.category === "Wall Lights").length;
    const chand = products.filter((p) => p.category === "Chandeliers").length;
    return {
      text: `💡 **Designer Lighting** (${wall + chand} items)\n\n• **Wall Lights** — ${wall} models\n• **Chandeliers** — ${chand} models\n\nAsk about a specific model (e.g. "Bubble Drop price") or browse [Lighting](/shop/chandeliers).`,
      actions: QUICK_ACTIONS,
    };
  }

  if (/price|cost|mrp|how much|rate/.test(q)) {
    const match = findProduct(q) || searchProducts(q.replace(/price|cost|mrp|how much|rate/g, "").trim())[0];
    if (match) return productReply(match);
  }

  const direct = findProduct(q);
  if (direct) return productReply(direct);

  const results = searchProducts(q);
  if (results.length === 1) return productReply(results[0]);
  if (results.length > 1) {
    const shown = results.slice(0, 4);
    const list = shown
      .map((p) => `• **${p.name}** — ${p.onRequest ? "Get Best Price" : p.priceLabel}`)
      .join("\n");
    return {
      text: `Found ${results.length} matches:\n\n${list}`,
      productCards: shown,
      actions: QUICK_ACTIONS,
    };
  }

  if (/weather|joke|news|politic|movie|cricket|recipe|code|program/.test(q)) {
    return { text: OFF_TOPIC, actions: QUICK_ACTIONS };
  }

  return {
    text: `I couldn't find "${text}" in our catalogue.\n\n${OFF_TOPIC}`,
    actions: QUICK_ACTIONS,
  };
}

export function processOrderStep(step, input, data, productHint) {
  const text = input?.trim();

  if (step === "product") {
    const match =
      productHint ||
      findProduct(text) ||
      searchProducts(text)[0];
    if (!match) {
      return {
        text: `Product not found. Please type the exact name (e.g. **Alaska Corner**, **Bubble Drop Chandelier**).\n\nOr browse our [shop](/shop).`,
        orderFlow: { step: "product", data },
      };
    }
    return {
      text: `**${match.name}** selected.\n\nPlease share your 10-digit mobile number:`,
      productCards: [match],
      orderFlow: { step: "mobile", data: { productId: match.id } },
    };
  }

  if (step === "mobile") {
    const digits = text.replace(/\D/g, "");
    if (digits.length < 10) {
      return {
        text: "Please enter a valid **10-digit mobile number** (e.g. 9876543210):",
        orderFlow: { step: "mobile", data },
      };
    }
    return {
      text: "📱 Got it! Now please share your **delivery address** (area, landmark, pincode):",
      orderFlow: { step: "address", data: { ...data, mobile: digits.slice(-10) } },
    };
  }

  if (step === "address") {
    if (!text || text.length < 10) {
      return {
        text: "Please provide a complete **delivery address** (minimum 10 characters):",
        orderFlow: { step: "address", data },
      };
    }
    const product = products.find((p) => p.id === data.productId);
    const waUrl = buildOrderWhatsApp({
      product,
      mobile: data.mobile,
      address: text,
    });
    return {
      text: `🎉 **Order ready!**\n\n**${product?.name || "Product"}**\nMobile: ${data.mobile}\nAddress: ${text}\n\nTap the button below to send your order on WhatsApp — our team will confirm shortly.`,
      orderFlow: null,
      whatsappUrl: waUrl,
      actions: QUICK_ACTIONS,
    };
  }

  return { text: GREETING, orderFlow: null, actions: QUICK_ACTIONS };
}
