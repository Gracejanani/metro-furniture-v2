import PosPageShell from "@/components/pos/PosPageShell";
import PriceTagPrint from "@/components/price-tags/PriceTagPrint";

export default function PriceTagsPage() {
  return (
    <PosPageShell title="Price Tags" description="Premium black & gold shelf tags">
      <PriceTagPrint />
    </PosPageShell>
  );
}
