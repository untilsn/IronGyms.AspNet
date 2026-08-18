import { Check, Minus } from "lucide-react";
import { comparisonRows } from "../pricingData";

export default function ComparisonSection() {
  return (
    <section className="container mb-32">
      <h2 className="font-display mb-16 text-center text-3xl font-black tracking-tight uppercase">
        So Sánh Các Gói
      </h2>

      <div className="rounded-box border-base-content/5 overflow-x-auto border">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-base-content/10 bg-base-200/40 border-b">
              <th className="font-display text-base-content/40 px-6 py-5 text-[10px] tracking-[0.2em] uppercase">
                Tính năng
              </th>
              <th className="font-display text-base-content/40 px-6 py-5 text-center text-[10px] tracking-[0.2em] uppercase">
                Cơ Bản
              </th>
              <th className="font-display text-primary px-6 py-5 text-center text-[10px] tracking-[0.2em] uppercase">
                Pro
              </th>
              <th className="font-display text-base-content/40 px-6 py-5 text-center text-[10px] tracking-[0.2em] uppercase">
                Premium
              </th>
            </tr>
          </thead>
          <tbody className="divide-base-content/5 divide-y">
            {comparisonRows.map((row) => (
              <tr key={row.label} className="hover:bg-base-200/40 transition-colors">
                <td className="text-base-content/80 px-6 py-5 text-sm font-medium">{row.label}</td>
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
      {value === true && <Check size={20} className="text-primary mx-auto" />}
      {value === false && <Minus size={20} className="text-base-content/15 mx-auto" />}
      {typeof value === "string" && (
        <span
          className={`text-xs font-bold tracking-wide uppercase ${
            highlight ? "text-primary" : "text-base-content/60"
          }`}
        >
          {value}
        </span>
      )}
    </td>
  );
}
