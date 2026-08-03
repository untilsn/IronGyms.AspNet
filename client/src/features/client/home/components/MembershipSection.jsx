import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { membershipFeatures } from "../data";

export default function MembershipSection() {
  return (
    <section id="membership" className="bg-base-100 py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-200 p-10 md:p-20">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-bl from-primary/10 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display mb-6 text-5xl font-black uppercase leading-none">
                Hành Trình <br /> Thể Thao Của Bạn.
              </h2>
              <p className="mb-10 text-lg text-base-content/60">
                Một gói duy nhất. Toàn quyền truy cập. Chúng tôi không tin vào
                việc chia nhỏ trải nghiệm rèn luyện — gia nhập cộng đồng và sử
                dụng mọi thứ chúng tôi có.
              </p>
              <ul className="mb-12 space-y-6">
                {membershipFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-4">
                    <CheckCircle2 className="text-primary" size={22} />
                    <span className="font-medium text-base-content">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center lg:items-end">
              <div className="mb-8 text-center lg:text-right">
                <span className="mb-2 block text-sm uppercase tracking-widest text-base-content/60">
                  Gói toàn diện
                </span>
                <div className="font-display text-7xl font-black text-primary">
                  500K
                  <span className="text-2xl text-base-content/60">/tháng</span>
                </div>
              </div>
              <Link
                to="/register"
                className="btn btn-primary btn-lg w-full lg:w-auto"
              >
                Đăng ký ngay
              </Link>
              <p className="mt-6 text-sm italic text-base-content/50">
                Giới hạn hội viên để đảm bảo chất lượng trải nghiệm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
