import { Check } from "lucide-react";
import { whyChooseUs } from "../trainersData";
import { Images } from "../../../../assets/images";

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-primary">
            Vì sao chọn
          </span>
          <h2 className="font-display mb-8 text-4xl font-black uppercase tracking-tight md:text-5xl">
            Huấn Luyện Viên Của Chúng Tôi?
          </h2>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whyChooseUs.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <Check size={16} className="mt-1 shrink-0 text-primary" />
                <span className="text-sm text-base-content/60">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-4/5">
          <img
            src={Images.trainer2}
            alt="Huấn luyện viên sức mạnh"
            className="absolute left-0 top-0 h-3/4 w-3/4 rounded-box object-cover shadow-xl"
          />
          <img
            src={Images.trainer3}
            alt="Huấn luyện viên mobility"
            className="border-base-100 absolute bottom-0 right-0 h-3/4 w-3/4 rounded-box border-4 object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
