import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { membershipFeatures } from "../homeData";

export default function MembershipSection() {
  return (
    <section id="membership" className="bg-base-100 py-32">
      <div className="container">
        <div className="border-base-300 bg-base-200 relative overflow-hidden rounded-2xl border p-10 md:p-20">
          <div className="from-primary/10 pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-bl to-transparent" />

          <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display mb-6 text-5xl leading-none font-black uppercase">
                Hành Trình <br /> Thể Thao Của Bạn.
              </h2>
              <p className="text-base-content/60 mb-10 text-lg">
                Một gói duy nhất. Toàn quyền truy cập. Chúng tôi không tin vào việc chia nhỏ trải
                nghiệm rèn luyện — gia nhập cộng đồng và sử dụng mọi thứ chúng tôi có.
              </p>
              <ul className="mb-12 space-y-6">
                {membershipFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-4">
                    <CheckCircle2 className="text-primary" size={22} />
                    <span className="text-base-content font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center lg:items-end">
              <div className="mb-8 text-center lg:text-right">
                <span className="text-base-content/60 mb-2 block text-sm tracking-widest uppercase">
                  Gói toàn diện
                </span>
                <div className="font-display text-primary text-7xl font-black">
                  500K
                  <span className="text-base-content/60 text-2xl">/tháng</span>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary btn-lg w-full lg:w-auto">
                Đăng ký ngay
              </Link>
              <p className="text-base-content/50 mt-6 text-sm italic">
                Giới hạn hội viên để đảm bảo chất lượng trải nghiệm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
