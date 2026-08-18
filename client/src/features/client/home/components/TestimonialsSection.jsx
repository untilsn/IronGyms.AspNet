import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../homeData";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const current = testimonials[index];

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setDirection("right");
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="bg-base-200 relative overflow-hidden py-32">
      <div className="container">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Quote className="text-primary absolute -top-10 -left-10 opacity-5" size={220} />

          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="font-display mb-8 text-4xl leading-tight font-black uppercase">
                Cộng đồng <br />
                <span className="text-primary">vượt qua giới hạn.</span>
              </h2>

              <div className="mb-8 flex gap-4">
                <button
                  onClick={prev}
                  className="btn btn-circle btn-outline btn-sm border-neutral-content"
                  aria-label="Testimonial trước"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="btn btn-circle btn-outline btn-sm border-neutral-content"
                  aria-label="Testimonial tiếp"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* dot indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? "right" : "left");
                      setIndex(i);
                    }}
                    aria-label={`Xem testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "bg-primary w-8" : "bg-base-content/20 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* overflow-hidden để "kẹp" animation trượt gọn trong khung card */}
            <div className="overflow-hidden">
              <div
                key={index}
                className={`border-primary bg-base-300 rounded-xl border-l-4 p-8 ${
                  direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
                }`}
              >
                <p className="text-base-content mb-6 text-xl italic">"{current.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold tracking-tight uppercase">{current.name}</p>
                    <p className="text-base-content/50 text-xs tracking-widest uppercase">
                      {current.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
