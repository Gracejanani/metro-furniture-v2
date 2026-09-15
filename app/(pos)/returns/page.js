import PosPageShell from "@/components/pos/PosPageShell";

export default function ReturnsPage() {
  return (
    <PosPageShell title="Returns" description="Return against invoice — inventory & refund">
      <p className="text-sm text-body">
        Start a return from a sale detail page. Backend RPC{" "}
        <code className="text-xs">process_return</code> can be added alongside{" "}
        <code className="text-xs">create_sale</code> for atomic stock credit.
      </p>
    </PosPageShell>
  );
}
