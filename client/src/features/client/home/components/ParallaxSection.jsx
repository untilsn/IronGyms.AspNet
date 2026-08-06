import { Images } from "../../../../assets/images";

export default function ParallaxSection() {
  return (
    <section
      className="parallax-bg relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:bg-fixed"
      style={{ backgroundImage: `url(${Images.parallax})` }}
    >
      <div className="absolute inset-0 bg-base-100/70" />

      <div className="relative z-10 max-w-3xl px-6 text-center">
        <span className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-primary">
          Triết lý IronGyms
        </span>
        <p className="font-display text-3xl font-semibold uppercase leading-snug tracking-tight text-base-content md:text-5xl">
          Kỷ luật hôm nay
          <br />
          là hình dáng bạn
          <br />
          của ngày mai.
        </p>
      </div>
    </section>
  );
}
