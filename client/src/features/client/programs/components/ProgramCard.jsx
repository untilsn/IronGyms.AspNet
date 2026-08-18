import { ArrowUpRight } from "lucide-react";

export default function ProgramCard({ program }) {
  const { title, level, description, image, featured } = program;

  return (
    <article
      className={`group rounded-box bg-base-200 hover:bg-base-300 relative overflow-hidden transition-colors duration-500 ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={
          featured
            ? "aspect-[16/9] overflow-hidden md:aspect-[21/9]"
            : "aspect-[4/5] overflow-hidden"
        }
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="from-base-100 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90" />
      </div>

      <div className={`absolute bottom-0 left-0 w-full p-8 ${featured ? "md:w-1/2" : ""}`}>
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-3xl leading-tight font-black tracking-tight text-white uppercase">
            {title}
          </h3>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-white uppercase backdrop-blur-md">
            {level}
          </span>
        </div>

        <p className="text-base-content/60 mb-6 line-clamp-2 text-sm font-medium">{description}</p>

        <button className="bg-primary font-display text-primary-content hover:bg-accent hover:text-accent-content flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-bold tracking-tight uppercase transition-colors">
          Khám phá lộ trình <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
