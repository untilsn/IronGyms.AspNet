import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="relative overflow-hidden bg-base-200 py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Quote
          className="absolute -left-10 -top-10 text-primary opacity-5"
          size={220}
        />

        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display mb-8 text-4xl font-black uppercase leading-tight">
              Cộng đồng <br />
              <span className="text-primary">vượt qua giới hạn.</span>
            </h2>
            <div className="mb-12 flex gap-4">
              <button
                onClick={prev}
                className="btn btn-circle btn-outline btn-sm"
                aria-label="Testimonial trước"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={next}
                className="btn btn-circle btn-outline btn-sm"
                aria-label="Testimonial tiếp"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-primary bg-base-300 p-8">
            <p className="mb-6 text-xl italic text-base-content">
              "{current.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/30" />
              <div>
                <p className="font-bold uppercase tracking-tight">
                  {current.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-base-content/50">
                  {current.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
