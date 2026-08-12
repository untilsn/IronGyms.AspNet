import { ArrowUpRight } from "lucide-react";
import { Images } from "../../../../assets/images";

export default function VisionSection() {
  return (
    <section className="pb-24">
      <div className="container">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-box md:order-1">
            <img
              src={Images.aboutVision}
              alt="Dụng cụ tạ kettlebell trong phòng gym"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="md:order-2">
            <h2 className="font-display mb-6 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Hướng Đi <br /> Sắp Tới
            </h2>
            <p className="mb-8 max-w-md text-base-content/60">
              Chúng tôi không ngừng mở rộng chương trình huấn luyện, nâng cấp cơ
              sở vật chất và xây dựng cộng đồng để mỗi hội viên đều có hành
              trình rèn luyện phù hợp nhất với mục tiêu của riêng mình.
            </p>
            <button className="btn btn-outline btn-sm gap-2">
              Xem thêm <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
