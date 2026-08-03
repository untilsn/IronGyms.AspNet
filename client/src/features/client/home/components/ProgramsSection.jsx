import { ArrowUpRight } from "lucide-react";
import { programs } from "../data";

export default function ProgramsSection() {
  return (
    <section id="programs" className="bg-base-200 py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tight">
            Chương Trình
          </h2>
          <p className="max-w-sm text-right text-base-content/60">
            Làm chủ cơ chế vận động của con người qua các lộ trình được tuyển
            chọn kỹ lưỡng.
          </p>
        </div>

        <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-12">
          {programs.map((program) => (
            <div
              key={program.title}
              className={`group relative min-h-[320px] overflow-hidden rounded-xl bg-base-300 ${program.span}`}
            >
              <img
                className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                src={program.image}
                alt={program.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="font-display mb-2 text-4xl font-black uppercase">
                  {program.title}
                </h3>
                <p className="mb-6 max-w-md text-base-content/70">
                  {program.description}
                </p>
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                  Xem chương trình <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          ))}

          {/* Ô Recovery — dạng khối tĩnh, không có ảnh */}
          <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-base-300 md:col-span-7">
            <div className="absolute inset-0 bg-primary/10 transition-colors duration-500 group-hover:bg-primary/20" />
            <div className="relative flex h-full flex-col justify-center p-12">
              <span className="font-display absolute right-10 top-10 select-none text-7xl font-black text-primary opacity-10">
                REST
              </span>
              <h3 className="font-display mb-2 text-4xl font-black uppercase">
                Phục Hồi
              </h3>
              <p className="mb-6 max-w-sm text-base-content/70">
                Liệu pháp lạnh, hồng ngoại và massage áp lực giúp rút ngắn thời
                gian hồi phục giữa các buổi tập.
              </p>
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                Khám phá Recovery Hub <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
