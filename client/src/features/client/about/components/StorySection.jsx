import { Play, ArrowUpRight } from "lucide-react";
import { Images } from "../../../../assets/images";

export default function StorySection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display mb-6 text-4xl leading-tight font-black tracking-tight uppercase md:text-5xl">
              Khởi Đầu <br /> Từ Đâu
            </h2>
            <p className="text-base-content/60 mb-8 max-w-md">
              IronGyms ra đời từ khát khao mang đến một không gian rèn luyện đúng nghĩa — nơi mỗi
              bài tập đều có mục đích, mỗi buổi tập đều tạo ra khác biệt thật sự cho cơ thể bạn.
            </p>
            <button className="btn btn-outline btn-sm gap-2">
              Xem thêm <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="group rounded-box relative aspect-[4/3] overflow-hidden">
            <img
              src={Images.aboutStory}
              alt="Huấn luyện viên hướng dẫn học viên tập luyện"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
