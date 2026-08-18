import { ArrowUpRight } from "lucide-react";
import { programs } from "../homeData";

export default function ProgramsSection() {
  return (
    <section id="programs" className="bg-base-200 py-32">
      <div className="container">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <h2 className="font-display text-5xl leading-none font-black tracking-tight uppercase">
            Chương Trình
          </h2>
          <p className="text-base-content/60 max-w-sm text-right">
            Làm chủ cơ chế vận động của con người qua các lộ trình được tuyển chọn kỹ lưỡng.
          </p>
        </div>

        <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-12">
          {programs.map((program) => (
            <div
              key={program.title}
              className={`group bg-base-300 relative min-h-[320px] overflow-hidden rounded-xl ${program.span}`}
            >
              <img
                className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                src={program.image}
                alt={program.title}
              />
              <div className="from-base-100 absolute inset-0 bg-gradient-to-t to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="font-display mb-2 text-4xl font-black uppercase">{program.title}</h3>
                <p className="text-base-content/70 mb-6 max-w-md">{program.description}</p>
                <span className="text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                  Xem chương trình <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          ))}

          {/* Ô Recovery — dạng khối tĩnh, không có ảnh */}
          <div className="bg-base-300 relative min-h-[320px] overflow-hidden rounded-xl md:col-span-7">
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute inset-0 transition-colors duration-500" />
            <div className="relative flex h-full flex-col justify-center p-12">
              <span className="font-display text-primary absolute top-10 right-10 text-7xl font-black opacity-10 select-none">
                REST
              </span>
              <h3 className="font-display mb-2 text-4xl font-black uppercase">Phục Hồi</h3>
              <p className="text-base-content/70 mb-6 max-w-sm">
                Liệu pháp lạnh, hồng ngoại và massage áp lực giúp rút ngắn thời gian hồi phục giữa
                các buổi tập.
              </p>
              <span className="text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                Khám phá Recovery Hub <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
