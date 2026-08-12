import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { pricingPlans } from "../pricingData";

export default function PricingGrid() {
  return (
    <div className="container mb-32 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          className={`relative flex flex-col justify-between overflow-hidden rounded-box border p-10 ${
            plan.highlighted
              ? "z-10 border-primary/30 bg-base-300 shadow-2xl shadow-primary/10 lg:scale-105"
              : "border-base-content/5 bg-base-200 transition-colors duration-500 hover:bg-base-300"
          }`}
        >
          {plan.highlighted && (
            <span className="badge badge-primary absolute right-0 top-0 rounded-none rounded-bl-box px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
              Đề xuất
            </span>
          )}

          <div>
            <h3
              className={`font-display mb-6 text-lg font-bold uppercase tracking-widest ${
                plan.highlighted ? "text-primary" : "text-base-content/60"
              }`}
            >
              {plan.name}
            </h3>

            <div className="mb-8 flex items-baseline gap-2">
              <span
                className={`font-display font-black tracking-tighter ${
                  plan.highlighted ? "text-7xl" : "text-5xl"
                }`}
              >
                {plan.price}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-base-content/50">
                {plan.period}
              </span>
            </div>

            {plan.note && (
              <p className="mb-6 text-xs italic tracking-wide text-base-content/50">
                {plan.note}
              </p>
            )}

            <ul className="mb-12 space-y-4">
              {plan.features.map((feature, i) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className={
                      plan.highlighted ? "text-primary" : "text-primary/70"
                    }
                  />
                  <span
                    className={`text-sm ${
                      plan.highlighted && i === 0
                        ? "font-bold text-base-content"
                        : "font-medium text-base-content/70"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/register"
            className={
              plan.highlighted
                ? "btn btn-primary font-display w-full uppercase tracking-widest"
                : "btn btn-outline font-display w-full uppercase tracking-widest"
            }
          >
            Chọn gói này
          </Link>
        </div>
      ))}
    </div>
  );
}
