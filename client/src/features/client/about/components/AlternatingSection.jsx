// src/features/about/components/AlternatingSection.jsx
import { ArrowUpRight } from "lucide-react";
import Button from "../../../../components/ui/Button";

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
            <h2 className="font-display mb-6 text-4xl leading-tight font-black tracking-tight uppercase md:text-5xl">
              {title}
            </h2>
            <p className="text-base-content/60 mb-8 max-w-md">{description}</p>
            <Button size={"lg"} variant={"outline"} onClick={onCtaClick}>
              {ctaLabel} <ArrowUpRight size={14} />
            </Button>
          </div>

          <div
            className={`group relative aspect-[4/3] overflow-hidden ${
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
