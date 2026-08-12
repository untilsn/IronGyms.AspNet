import { Images } from "../../../../assets/images";

export default function AboutHero() {
  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${Images.aboutHero})` }}
        role="img"
        aria-label="Không gian phòng tập IronGyms"
      />
      <div className="absolute inset-0 bg-base-100/70" />

      <div className="relative z-10 text-center">
        <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-base-content/50">
          Tìm hiểu về
        </span>
        <h1 className="font-display text-5xl font-black uppercase tracking-tight text-base-content md:text-6xl">
          Về Chúng Tôi
        </h1>
      </div>
    </section>
  );
}
