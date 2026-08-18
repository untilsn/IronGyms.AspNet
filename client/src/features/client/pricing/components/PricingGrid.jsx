import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { pricingPlans } from "../pricingData";

export default function PricingGrid() {
  return (
    <div className="container mb-32 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          className={`rounded-box relative flex flex-col justify-between overflow-hidden border p-10 ${
            plan.highlighted
              ? "border-primary/30 bg-base-300 shadow-primary/10 z-10 shadow-2xl lg:scale-105"
              : "border-base-content/5 bg-base-200 hover:bg-base-300 transition-colors duration-500"
          }`}
        >
          {plan.highlighted && (
            <span className="badge badge-primary rounded-bl-box absolute top-0 right-0 rounded-none px-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase">
              Đề xuất
            </span>
          )}

          <div>
            <h3
              className={`font-display mb-6 text-lg font-bold tracking-widest uppercase ${
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
              <span className="text-base-content/50 text-[10px] tracking-widest uppercase">
                {plan.period}
              </span>
            </div>

            {plan.note && (
              <p className="text-base-content/50 mb-6 text-xs tracking-wide italic">{plan.note}</p>
            )}

            <ul className="mb-12 space-y-4">
              {plan.features.map((feature, i) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className={plan.highlighted ? "text-primary" : "text-primary/70"}
                  />
                  <span
                    className={`text-sm ${
                      plan.highlighted && i === 0
                        ? "text-base-content font-bold"
                        : "text-base-content/70 font-medium"
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
                ? "btn btn-primary font-display w-full tracking-widest uppercase"
                : "btn btn-outline font-display w-full tracking-widest uppercase"
            }
          >
            Chọn gói này
          </Link>
        </div>
      ))}
    </div>
  );
}
