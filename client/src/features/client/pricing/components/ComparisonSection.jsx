import { Check, Minus } from "lucide-react";
import { comparisonRows } from "../pricingData";

export default function ComparisonSection() {
  return (
    <section className="container mb-32">
      <h2 className="font-display mb-16 text-center text-3xl font-black uppercase tracking-tight">
        So Sánh Các Gói
      </h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-base-content/10 bg-base-200/40">
              <th className="font-display px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-base-content/40">
                Tính năng
              </th>
              <th className="font-display px-6 py-5 text-center text-[10px] uppercase tracking-[0.2em] text-base-content/40">
                Cơ Bản
              </th>
              <th className="font-display px-6 py-5 text-center text-[10px] uppercase tracking-[0.2em] text-primary">
                Pro
              </th>
              <th className="font-display px-6 py-5 text-center text-[10px] uppercase tracking-[0.2em] text-base-content/40">
                Premium
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-content/5">
            {comparisonRows.map((row) => (
              <tr
                key={row.label}
                className="transition-colors hover:bg-base-200/40"
              >
                <td className="px-6 py-5 text-sm font-medium text-base-content/80">
                  {row.label}
                </td>
                <ComparisonCell value={row.basic} />
                <ComparisonCell value={row.pro} highlight />
                <ComparisonCell value={row.premium} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonCell({ value, highlight = false }) {
  return (
    <td className={`px-6 py-5 text-center ${highlight ? "bg-primary/5" : ""}`}>
      {value === true && <Check size={20} className="mx-auto text-primary" />}
      {value === false && (
        <Minus size={20} className="mx-auto text-base-content/15" />
      )}
      {typeof value === "string" && (
        <span
          className={`text-xs font-bold uppercase tracking-wide ${
            highlight ? "text-primary" : "text-base-content/60"
          }`}
        >
          {value}
        </span>
      )}
    </td>
  );
}
