export default function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  description,
  height = "h-[55vh] min-h-[420px] md:h-[65vh] md:min-h-[480px]",
}) {
  return (
    <section className={`relative flex items-center overflow-hidden ${height}`}>
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 md:bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={imageAlt}
      />
      {/* Overlay ngang: đủ tối bên trái để chữ luôn đọc được, mờ dần sang phải để vẫn thấy ảnh */}
      <div className="from-base-100 via-base-100/60 absolute inset-0 z-0 bg-gradient-to-r to-transparent" />
      {/* Overlay dọc: làm dịu cạnh trên/dưới, tránh ảnh "vỡ" ở mép section */}
      <div className="from-base-100 absolute inset-0 z-0 bg-gradient-to-t via-transparent to-transparent" />

      <div className="relative z-10 container text-center">
        <div className="mx-auto max-w-2xl">
          {eyebrow && (
            <span className="text-primary mb-4 block text-sm font-bold tracking-[0.2em] uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display heading-vn mb-4 text-lg leading-tight font-black tracking-tight uppercase md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="text-base-content/70 max-w-xl text-base leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
