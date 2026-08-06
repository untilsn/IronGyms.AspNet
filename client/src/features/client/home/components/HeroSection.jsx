import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { Images } from "../../../../assets/images";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center pt-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 md:bg-fixed"
        style={{ backgroundImage: `url(${Images.hero})` }}
        role="img"
        aria-label="Vận động viên tập luyện với tạ đòn trong phòng gym tối"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-base-100 via-base-100/60 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Đánh thức tiềm năng nguyên bản của bạn
            </span>
            <h1 className="font-display heading-vn mb-8 text-6xl font-bold uppercase tracking-tight md:text-7xl xl:text-8xl">
              <span className="block">Nền Tảng</span>
              <span className="text-gradient-primary mt-3 block">
                Bắt Đầu Từ Đây.
              </span>
            </h1>
            <p className="mb-12 max-w-xl text-base leading-relaxed text-base-content/70">
              Vượt ra khỏi ánh đèn neon và sự ồn ào. IronGyms là trải nghiệm rèn
              luyện được thiết kế cho những ai đòi hỏi hiệu suất và phục hồi
              đỉnh cao.
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

      <a href="#programs">
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-base-content/40 hover:text-primary transition-colors">
          <ChevronDown size={28} />
        </div>
      </a>
    </section>
  );
}
