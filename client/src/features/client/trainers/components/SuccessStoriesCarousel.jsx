import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { successStories } from "../trainersData";

function StoryCard({ story }) {
  return (
    <div className="rounded-box bg-base-200 grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center md:p-8">
      <img
        src={story.photo}
        alt={story.name}
        className="rounded-box h-24 w-24 object-cover sm:h-28 sm:w-28"
      />
      <div>
        <div className="mb-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < story.rating ? "fill-primary text-primary" : "text-base-content/20"}
            />
          ))}
        </div>
        <p className="text-base-content/60 mb-3 text-sm">"{story.quote}"</p>
        <p className="font-display text-sm font-bold uppercase">{story.name}</p>
        <p className="text-base-content/40 text-xs">Huấn luyện bởi {story.trainedBy}</p>
      </div>
    </div>
  );
}

export default function SuccessStoriesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="bg-base-200/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-10 text-center">
          <Quote className="text-base-content/10 mx-auto mb-2" size={56} />
          <span className="text-primary mb-2 block text-sm font-bold tracking-widest uppercase">
            Đọc chia sẻ từ hội viên
          </span>
          <h2 className="font-display text-4xl font-black tracking-tight uppercase md:text-5xl">
            Câu Chuyện Thành Công
          </h2>
        </div>

        <div className="mx-auto max-w-2xl overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {successStories.map((story) => (
              <div key={story.id} className="min-w-0 flex-[0_0_100%] px-1">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={scrollPrev}
            className="btn btn-circle btn-outline btn-sm"
            aria-label="Câu chuyện trước"
          >
            <ChevronLeft size={16} />
          </button>
          {successStories.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex ? "bg-primary w-6" : "bg-base-300 w-1.5"
              }`}
            />
          ))}
          <button
            onClick={scrollNext}
            className="btn btn-circle btn-outline btn-sm"
            aria-label="Câu chuyện tiếp theo"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
