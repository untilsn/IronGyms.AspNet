import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-40"
          src="https://picsum.photos/seed/hero-gym/1600/1000"
          alt="Vận động viên tập luyện với tạ đòn trong phòng gym tối"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-4xl">
          <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Đánh thức tiềm năng nguyên bản của bạn
          </span>
          <h1 className="font-display mb-8 text-6xl font-black uppercase leading-[0.95] tracking-tight md:text-8xl">
            Nền Tảng <br />
            <span className="text-primary">Bắt Đầu Từ Đây.</span>
          </h1>
          <p className="mb-12 max-w-xl text-xl leading-relaxed text-base-content/70">
            Vượt ra khỏi ánh đèn neon và sự ồn ào. IronGyms là trải nghiệm rèn
            luyện được thiết kế cho những ai đòi hỏi hiệu suất và phục hồi đỉnh
            cao.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn btn-primary btn-lg gap-3">
              Tham gia ngay
              <ArrowRight size={20} />
            </Link>
            <a href="#programs" className="btn btn-neutral btn-lg">
              Khám phá chương trình
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
