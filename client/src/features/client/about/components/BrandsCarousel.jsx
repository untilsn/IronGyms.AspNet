// src/components/common/BrandsCarousel.jsx
import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Images } from "../../../../assets/images";

const brands = [
  { src: Images.brand1, alt: "Nutrition Supplements" },
  { src: Images.brand2, alt: "Fitness" },
  { src: Images.brand3, alt: "Mountain Sport" },
  { src: Images.brand4, alt: "Spartan Athletic" },
  { src: Images.brand5, alt: "Đối tác" },
];

export default function BrandsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 2500, stopOnInteraction: false })],
  );

  // pause autoplay khi người dùng đang kéo tay
  const onPointerDown = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    autoplay?.stop();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("pointerDown", onPointerDown);
    return () => emblaApi.off("pointerDown", onPointerDown);
  }, [emblaApi, onPointerDown]);

  return (
    <section className="bg-base-300 py-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex cursor-grab active:cursor-grabbing">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex min-w-0 flex-[0_0_50%] items-center justify-center px-8 sm:flex-[0_0_33%] md:flex-[0_0_20%]"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-20 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
