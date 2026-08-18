import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { Images } from "../../../../assets/images";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center pb-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 md:bg-fixed"
        style={{ backgroundImage: `url(${Images.hero})` }}
        role="img"
        aria-label="Vận động viên tập luyện với tạ đòn trong phòng gym tối"
      />
      <div className="from-base-100 via-base-100/60 absolute inset-0 z-0 bg-gradient-to-r to-transparent" />
      <div className="from-base-100 absolute inset-0 z-0 bg-gradient-to-t via-transparent to-transparent" />

      <div className="relative z-10 container">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="text-primary mb-4 block text-sm font-bold tracking-[0.2em] uppercase">
              Đánh thức tiềm năng nguyên bản của bạn
            </span>
            <h1 className="font-display heading-vn mb-8 text-6xl font-bold tracking-tight uppercase md:text-7xl xl:text-8xl">
              <span className="block">Nền Tảng</span>
              <span className="text-gradient-primary mt-3 block">Bắt Đầu Từ Đây.</span>
            </h1>
            <p className="text-base-content/70 mb-12 max-w-xl text-base leading-relaxed">
              Vượt ra khỏi ánh đèn neon và sự ồn ào. IronGyms là trải nghiệm rèn luyện được thiết kế
              cho những ai đòi hỏi hiệu suất và phục hồi đỉnh cao.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                to="/register"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
              >
                Tham gia ngay
              </Button>
              <a href="#programs">
                <Button variant="outline" size="lg">
                  Khám phá chương trình
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
