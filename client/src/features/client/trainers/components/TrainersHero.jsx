import { Images } from "../../../../assets/images";
import { trainerStats } from "../trainersData";

export default function TrainersHero() {
  return (
    <section className="relative">
      <div className="relative h-[420px] overflow-hidden md:h-[480px]">
        <img
          src={Images.hero}
          alt="Huấn luyện viên hướng dẫn học viên"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-base-100/20" />

        <div className="container absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="font-display max-w-3xl text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-6xl">
            Mục Tiêu Của Bạn Xứng Đáng Với Sự Dẫn Dắt Tốt Nhất
          </h1>
          <p className="mt-4 max-w-xl text-base-content/70">
            Đội ngũ huấn luyện viên chứng chỉ, tận tâm và giàu kinh nghiệm luôn
            đồng hành để bạn tập luyện thông minh hơn, hiệu quả hơn.
          </p>
        </div>
      </div>

      {/* <div className="container -mt-10 flex flex-wrap justify-center gap-4 px-4 md:justify-start">
        {trainerStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-accent px-6 py-3 text-accent-content shadow-lg"
          >
            <p className="font-display text-2xl font-black">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div> */}
    </section>
  );
}
