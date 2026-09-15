import { posBusiness } from "@/data/pos-business";
import { formatINR } from "@/lib/billing/calculate";

export default function InvoiceThermal80({ invoice, items, payments, customer }) {
  return (
    <div className="invoice-print w-[80mm] bg-white p-2 text-[10px] text-black font-mono leading-tight">
      <p className="text-center font-bold">{posBusiness.name}</p>
      <p className="text-center text-[8px]">{posBusiness.tagline}</p>
      <p className="text-center text-[8px]">{posBusiness.phone}</p>
      <hr className="my-1 border-black/30" />
      <p>#{invoice.invoice_number}</p>
      <p>{new Date(invoice.created_at).toLocaleString("en-IN")}</p>
      <p>{customer?.name || "Walk-in"}</p>
      <hr className="my-1 border-black/30" />
      {items.map((item) => (
        <div key={item.id} className="mb-1">
          <p className="font-semibold">{item.product_name}</p>
          <p>
            {item.quantity} x {formatINR(item.unit_price)} = {formatINR(item.line_total)}
          </p>
        </div>
      ))}
      <hr className="my-1 border-black/30" />
      <p className="flex justify-between font-bold">
        <span>TOTAL</span>
        <span>{formatINR(invoice.grand_total)}</span>
      </p>
      {payments.map((p) => (
        <p key={p.id} className="flex justify-between">
          <span>{p.method}</span>
          <span>{formatINR(p.amount)}</span>
        </p>
      ))}
      <p className="mt-2 text-center text-[8px]">Thank you!</p>
    </div>
  );
}
