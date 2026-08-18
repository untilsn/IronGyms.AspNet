import { Dumbbell, HeartPulse, UtensilsCrossed } from "lucide-react";
import { Images } from "../../../../assets/images";

const features = [
  {
    icon: HeartPulse,
    title: "Thiết Bị Hiện Đại",
    description: "Hệ thống máy tập nhập khẩu, bảo trì định kỳ, luôn sẵn sàng cho mọi buổi tập.",
  },
  {
    icon: UtensilsCrossed,
    title: "Dinh Dưỡng Khoa Học",
    description: "Thực đơn cá nhân hóa theo mục tiêu, đồng hành cùng chuyên gia dinh dưỡng.",
  },
  {
    icon: Dumbbell,
    title: "Huấn Luyện Cá Nhân Hóa",
    description: "Lộ trình riêng cho từng hội viên, bám sát tiến độ và điều chỉnh linh hoạt.",
  },
];
export default function ParallaxSection() {
  return (
    <section
      className="parallax-bg relative flex min-h-[70vh] items-center justify-center bg-cover bg-center bg-no-repeat py-24 md:bg-fixed"
      style={{ backgroundImage: `url(${Images.parallax})` }}
    >
      <div className="bg-base-100/70 absolute inset-0" />

      <div className="relative z-10 container">
        <div className="mb-16 text-center">
          <h2 className="font-display heading-vn text-base-content mb-6 text-3xl font-bold tracking-tight uppercase md:text-5xl">
            Đặt Mục Tiêu Thể Hình Cao
          </h2>
          <p className="text-base-content/60 mx-auto max-w-xl text-base leading-relaxed">
            Khi bạn đã sẵn sàng, chúng tôi đảm bảo bạn có chương trình tập luyện tốt nhất — cùng đội
            ngũ chuyên gia và trang thiết bị hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="border-primary/30 bg-primary/10 mb-5 flex h-18 w-18 items-center justify-center rounded-full border">
                  <Icon size={34} className="text-primary" />
                </div>

                <h3 className="font-display text-base-content mb-3 text-sm font-bold tracking-widest uppercase">
                  {item.title}
                </h3>

                <p className="text-base-content/70 max-w-xs text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
