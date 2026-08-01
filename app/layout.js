import { Playfair_Display, Inter, Noto_Sans_Tamil } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import InitialLoader from "@/components/InitialLoader";
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
      className={`${playfair.variable} ${inter.variable} ${notoTamil.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <InitialLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
