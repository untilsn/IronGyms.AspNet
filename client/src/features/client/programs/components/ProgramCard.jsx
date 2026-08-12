import { ArrowUpRight } from "lucide-react";

export default function ProgramCard({ program }) {
  const { title, level, description, image, featured } = program;

  return (
    <article
      className={`group relative overflow-hidden rounded-box bg-base-200 transition-colors duration-500 hover:bg-base-300 ${
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
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-90" />
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full p-8 ${
          featured ? "md:w-1/2" : ""
        }`}
      >
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-white">
            {title}
          </h3>
          <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {level}
          </span>
        </div>

        <p className="mb-6 text-sm font-medium text-base-content/60 line-clamp-2">
          {description}
        </p>

        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-display text-sm font-bold uppercase tracking-tight text-primary-content transition-colors hover:bg-accent hover:text-accent-content">
          Khám phá lộ trình <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
