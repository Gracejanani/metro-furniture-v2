import { business, seoKeywords, siteUrl } from "@/data/business";

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}) {
  const fullTitle = title.includes(business.shortName)
    ? title
    : `${title} | ${business.name}`;

  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: business.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
