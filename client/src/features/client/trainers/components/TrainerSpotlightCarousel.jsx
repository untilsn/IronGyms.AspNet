import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trainers } from "../trainersData";
import SocialIcon from "../../../../components/common/SocialIcon";

const FADE_MS = 200;

export default function TrainerSpotlightCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const trainer = trainers[index];

  const goTo = (nextIndex) => {
    if (nextIndex === index) return;
    setVisible(false);
    setTimeout(() => {
      setIndex(nextIndex);
      setVisible(true);
    }, FADE_MS);
  };

  const goPrev = () => goTo(index === 0 ? trainers.length - 1 : index - 1);
  const goNext = () => goTo(index === trainers.length - 1 ? 0 : index + 1);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-primary">
          Gặp gỡ
        </span>
        <h2 className="font-display mb-4 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Đội Ngũ Huấn Luyện Viên
        </h2>
        <p className="mb-10 max-w-lg text-base-content/60">
          Tìm hiểu những người đồng hành cùng bạn — huấn luyện viên chứng chỉ,
          truyền động lực và dẫn dắt bạn đến mục tiêu.
        </p>

        <div className="flex flex-col justify-center items-center gap-6 lg:flex-row lg:items-stretch">
          <TrainerContentPanel
            trainer={trainer}
            visible={visible}
            onPrev={goPrev}
            onNext={goNext}
            current={index + 1}
            total={trainers.length}
          />
          <TrainerImagePanel trainer={trainer} visible={visible} />
        </div>
      </div>
    </section>
  );
}

function TrainerContentPanel({
  trainer,
  visible,
  onPrev,
  onNext,
  current,
  total,
}) {
  return (
    <div className="relative h-[400px]  flex-1 rounded-box border border-base-content/10 bg-base-200/40 p-6 backdrop-blur-xl sm:p-10">
      <div
        className={`flex gap-6 transition-opacity  duration-200 sm:gap-8 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Cột social icon dọc, có đường kẻ nối trên/dưới */}
        <div className="hidden flex-col items-center gap-4 sm:flex">
          <span className="w-px grow bg-base-content/15" />
          <div className="flex flex-col gap-4">
            {trainer.socials.map((social) => (
              <a
                key={social.type}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-base-content/50 transition hover:text-primary"
              >
                <SocialIcon type={social.type} />
              </a>
            ))}
          </div>
          <span className="w-px grow bg-base-content/15" />
        </div>

        <div className="flex-1">
          <h3 className="font-display mb-1 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            {trainer.name}
          </h3>
          <p className="mb-4 text-sm font-bold text-primary">{trainer.title}</p>
          <p className="mb-6 text-base-content/60">{trainer.bio}</p>

          <div className="mb-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-base-content/40">
            {trainer.tags.map((tag, i) => (
              <span key={tag} className="flex items-center">
                {tag}
                {i < trainer.tags.length - 1 && (
                  <span className="mx-2.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                )}
              </span>
            ))}
          </div>

          <button className="btn btn-primary btn-sm">Đặt lịch buổi tập</button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden items-center gap-4 sm:flex">
        <button
          onClick={onPrev}
          className="btn btn-circle btn-ghost btn-sm"
          aria-label="Trainer trước"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="btn btn-circle btn-ghost btn-sm"
          aria-label="Trainer tiếp theo"
        >
          <ChevronRight size={18} />
        </button>
        <span className="text-xs text-base-content/40">
          {current} / {total}
        </span>
      </div>
    </div>
  );
}

function TrainerImagePanel({ trainer, visible }) {
  return (
    <div className="hidden overflow-hidden rounded-box lg:block lg:h-auto lg:w-[420px]">
      <img
        src={trainer.image}
        alt={trainer.name}
        className={`h-full w-full object-cover transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
