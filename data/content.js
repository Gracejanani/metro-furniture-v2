import { categories } from "@/data/categories";
import { isJustDialImage, resolveCategoryImage } from "@/data/images";
import { getProductBySlug, getShowroomImages, products } from "@/data/products";

const jdShowroom = getShowroomImages();

function uniqueUrls(urls) {
  return [...new Set(urls.filter(Boolean))];
}

export const images = {
  hero: ["/hero.png", "/hero-1.png"],
  showroom: jdShowroom.length
    ? uniqueUrls([
        ...jdShowroom,
        ...products.filter((p) => isJustDialImage(p.image)).map((p) => p.image),
      ]).slice(0, 12)
    : products.slice(0, 8).map((p) => p.image),
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
    id: "living-room",
    name: "Living Room",
    description: "Sofas, recliners & coffee tables for elegant entertaining",
    image: getProductBySlug("sofa-set")?.image ?? images.category.Sofas,
    href: "/shop/sofas",
  },
  {
    id: "bedroom",
    name: "Bedroom Suite",
    description: "King & queen beds with premium mattresses",
    image: images.category.Beds,
    href: "/shop/beds",
  },
  {
    id: "dining",
    name: "Dining Experience",
    description: "Nilkamal & wooden dining sets for family gatherings",
    image: images.category.Dining,
    href: "/shop/dining",
  },
  {
    id: "office",
    name: "Work From Home",
    description: "Godrej Interio desks, chairs & storage solutions",
    image: images.category["Office Furniture"],
    href: "/shop/office-furniture",
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
      "Yes. We arrange delivery across Dharmapuri and nearby towns. Delivery charges depend on location and item size — ask our team for a quote.",
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
    question: "Do you sell mattresses separately?",
    answer:
      "Yes. We stock orthopaedic, memory foam and spring mattresses in standard and custom sizes to pair with our bed frames.",
  },
  {
    id: "f6",
    question: "How do I get the best price?",
    answer:
      "Visit the showroom or WhatsApp us with the product name. Prices vary by size, material and finish — we provide transparent quotes with no hidden charges.",
  },
];
