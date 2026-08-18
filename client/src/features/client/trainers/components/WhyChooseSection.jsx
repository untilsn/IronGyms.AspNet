import { Check } from "lucide-react";
import { whyChooseUs } from "../trainersData";
import { Images } from "../../../../assets/images";

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-primary mb-2 block text-sm font-bold tracking-widest uppercase">
            Vì sao chọn
          </span>
          <h2 className="font-display mb-8 text-4xl font-black tracking-tight uppercase md:text-5xl">
            Huấn Luyện Viên Của Chúng Tôi?
          </h2>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whyChooseUs.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <Check size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-base-content/60 text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-4/5">
          <img
            src={Images.trainer2}
            alt="Huấn luyện viên sức mạnh"
            className="rounded-box absolute top-0 left-0 h-3/4 w-3/4 object-cover shadow-xl"
          />
          <img
            src={Images.trainer3}
            alt="Huấn luyện viên mobility"
            className="border-base-100 rounded-box absolute right-0 bottom-0 h-3/4 w-3/4 border-4 object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
