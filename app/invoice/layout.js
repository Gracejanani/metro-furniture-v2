export const metadata = {
  robots: { index: false, follow: false },
};

export default function InvoicePublicLayout({ children }) {
  return <div className="font-sans text-foreground antialiased">{children}</div>;
}
