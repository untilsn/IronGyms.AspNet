import { trainers } from "../data";

export default function TrainersSection() {
  return (
    <section id="trainers" className="bg-base-100 py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-20">
          <h2 className="font-display mb-4 text-5xl font-black uppercase tracking-tight">
            Đội Ngũ Kiến Tạo
          </h2>
          <div className="h-1 w-24 bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className={`group ${trainer.offset ? "lg:translate-y-12" : ""}`}
            >
              <div className="mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-base-300">
                <img
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  src={trainer.image}
                  alt={trainer.name}
                />
              </div>
              <h4 className="font-display text-2xl font-black uppercase">
                {trainer.name}
              </h4>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                {trainer.role}
              </p>
              <p className="text-sm text-base-content/60">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
