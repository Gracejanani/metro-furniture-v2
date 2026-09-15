import { Playfair_Display, Inter, Noto_Sans_Tamil, Manrope } from "next/font/google";
import { business, seoKeywords, siteUrl } from "@/data/business";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-pos",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.shortName}`,
  },
  description: `${business.name} — ${business.tagline}. ${business.taglineSecondary}. Premium furniture showroom on Salem Main Road, Senthil Nagar, Dharmapuri.`,
  keywords: seoKeywords,
  authors: [{ name: business.name }],
  openGraph: {
    title: business.name,
    description: `${business.tagline}. Sofas, beds, dining, wardrobes & more in Dharmapuri.`,
    url: siteUrl,
    siteName: business.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: business.logo }],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.tagline,
    images: [business.logo],
  },
  icons: {
    icon: business.logo,
    apple: business.logo,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${notoTamil.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
