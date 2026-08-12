// src/features/about/components/AlternatingSection.jsx
import { ArrowUpRight } from "lucide-react";

export default function AlternatingSection({
  title,
  description,
  image,
  imageAlt,
  imageSide = "right", // "left" | "right"
  ctaLabel = "Xem thêm",
  onCtaClick,
}) {
  const isImageRight = imageSide === "right";

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className={isImageRight ? "md:order-1" : "md:order-2"}>
            <h2 className="font-display mb-6 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              {title}
            </h2>
            <p className="mb-8 max-w-md text-base-content/60">{description}</p>
            <button
              onClick={onCtaClick}
              className="btn btn-outline btn-sm gap-2"
            >
              {ctaLabel} <ArrowUpRight size={14} />
            </button>
          </div>

          <div
            className={`group relative aspect-[4/3] overflow-hidden rounded-box ${
              isImageRight ? "md:order-2" : "md:order-1"
            }`}
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
