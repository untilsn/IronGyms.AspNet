import { Link } from "react-router-dom";
import { Images } from "../../../../assets/images";

export default function PricingCta() {
  return (
    <section className="container relative mb-24 flex h-[420px] items-center justify-center overflow-hidden rounded-box">
      <img
        src={Images.programs2}
        alt="Không gian phòng gym cao cấp về đêm"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />

      <div className="relative z-10 max-w-xl px-6 text-center">
        <h2 className="font-display mb-6 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Vẫn Còn Phân Vân?
        </h2>
        <p className="mb-10 text-base-content/60">
          Bắt đầu với 3 ngày trải nghiệm miễn phí. Cảm nhận không gian, đội ngũ
          huấn luyện và cộng đồng trước khi quyết định gắn bó.
        </p>
        <Link
          to="/contact"
          className="btn btn-outline btn-primary font-display px-10 uppercase tracking-widest"
        >
          Nhận vé trải nghiệm
        </Link>
      </div>
    </section>
  );
}
