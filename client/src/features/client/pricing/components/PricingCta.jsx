import { Link } from "react-router-dom";
import { Images } from "../../../../assets/images";

export default function PricingCta() {
  return (
    <section className="rounded-box relative container mb-24 flex h-[420px] items-center justify-center overflow-hidden">
      <img
        src={Images.programs2}
        alt="Không gian phòng gym cao cấp về đêm"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 grayscale"
      />
      <div className="from-base-100 via-base-100/40 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10 max-w-xl px-6 text-center">
        <h2 className="font-display mb-6 text-4xl font-black tracking-tight uppercase md:text-5xl">
          Vẫn Còn Phân Vân?
        </h2>
        <p className="text-base-content/60 mb-10">
          Bắt đầu với 3 ngày trải nghiệm miễn phí. Cảm nhận không gian, đội ngũ huấn luyện và cộng
          đồng trước khi quyết định gắn bó.
        </p>
        <Link
          to="/contact"
          className="btn btn-outline btn-primary font-display px-10 tracking-widest uppercase"
        >
          Nhận vé trải nghiệm
        </Link>
      </div>
    </section>
  );
}
