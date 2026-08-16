import { categories } from "@/data/categories";
import { galleryUrls } from "@/data/gallery";
import { resolveCategoryImage } from "@/data/images";
import { getProductBySlug, products } from "@/data/products";

function uniqueUrls(urls) {
  return [...new Set(urls.filter(Boolean))];
}

export const images = {
  hero: [
    "/Metro_Product_Images/MTC-101_Alaska_Corner.jpg",
    "/Metro_Product_Images/MTC-114_Grand_Bay_Corner.jpg",
    "/Lights_Products/LL-D5463.jpg",
    "/Gallery/IMG-20260815-WA0030.jpg",
  ],
  showroom: uniqueUrls([
    ...galleryUrls,
    ...products
      .filter((p) => p.image?.startsWith("/Metro_Product_Images"))
      .map((p) => p.image),
  ]),
  category: Object.fromEntries(
    categories.map((c) => [
      c.id,
      resolveCategoryImage(
        c.id,
        products.filter((p) => p.category === c.id)
      ),
    ])
  ),
};

export const collections = [
  {
    id: "corner-sofas",
    name: "Corner Collection",
    description: "L-shape & U-shape corners with recliners, storage & consoles",
    image: getProductBySlug("alaska-corner")?.image ?? images.category["Corner Sofas"],
    href: "/shop/corner-sofas",
  },
  {
    id: "sofa-sets",
    name: "Sofa Sets",
    description: "3+1+1 recliner sets in premium fabrics & finishes",
    image: getProductBySlug("cairo-sofa")?.image ?? images.category.Sofas,
    href: "/shop/sofas",
  },
  {
    id: "dining",
    name: "Dining",
    description: "Wooden & marble-top dining sets for family gatherings",
    image: images.category.Dining,
    href: "/shop/dining",
  },
  {
    id: "restroom",
    name: "Bathroom Fittings",
    description: "Basins, taps, vanity units & shower fittings",
    image: images.category["Bathroom Fittings"],
    href: "/shop/bathroom-fittings",
  },
  {
    id: "chandeliers",
    name: "Designer Chandeliers",
    description: "Crystal & LED cluster chandeliers for grand interiors",
    image: getProductBySlug("bubble-drop-chandelier-16-strand")?.image ?? images.category.Chandeliers,
    href: "/shop/chandeliers",
  },
  {
    id: "chairs",
    name: "Chairs",
    description: "Office, lounge & dining chairs",
    image: images.category.Chairs,
    href: "/shop/chairs",
  },
];

export const faqs = [
  {
    id: "f1",
    question: "Where is Metro Furniture located?",
    answer:
      "Our showroom is at No 1860, Salem Main Road, Senthil Nagar, near Vincent Kalyana Mandapam and Senthil Nagar Bus Stop, Dharmapuri — about 1 km from Dharmapuri railway station.",
  },
  {
    id: "f2",
    question: "Do you offer home delivery?",
    answer:
      "Yes. We arrange delivery across Dharmapuri and nearby towns. Delivery charges depend on location and item size — ask our team for a quote when you order on WhatsApp.",
  },
  {
    id: "f3",
    question: "Can I customize sofa fabric and size?",
    answer:
      "Absolutely. Choose from a wide range of fabrics, colours and configurations. Our team will guide you through measurements and material options.",
  },
  {
    id: "f4",
    question: "What are your showroom timings?",
    answer: "We are open all 7 days from 9:30 AM to 9:00 PM.",
  },
  {
    id: "f5",
    question: "Do you sell bathroom fittings and dining sets?",
    answer:
      "Yes — wash basins, taps, vanity units, dining sets, chairs and mattresses are available. Browse our shop or ask the chat assistant.",
  },
  {
    id: "f6",
    question: "How do I place an order?",
    answer:
      "Use the chat assistant or product page to order via WhatsApp. Share your mobile number and address — no online payment needed. Our team confirms price and delivery.",
  },
];
