const tickerItems = [
  "THỬ NGAY HÔM NAY",
  "LỚP HỌC MỚI ĐANG MỞ!",
  "GIẢM 10% NGAY!",
  "BUỔI TẬP ĐẦU TIÊN MIỄN PHÍ!",
  "GIỚI THIỆU BẠN BÈ, NHẬN ƯU ĐÃI!",
];

export default function MarqueeTicker() {
  const items = [...tickerItems, ...tickerItems]; // nhân đôi để loop liền mạch

  return (
    <div className="overflow-hidden border-y border-base-300 bg-accent py-3">
      <div className="animate-marquee flex w-max gap-8">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-8 text-sm font-bold uppercase tracking-wide text-accent-content"
          >
            {item}
            <span className="text-accent-content/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
