import { redirect } from "next/navigation";

export default async function ProductSlugRedirect({ params }) {
  const { slug } = await params;
  redirect(`/product/${slug}`);
}
