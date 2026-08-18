import { trainers } from "../homeData";

export default function TrainersSection() {
  return (
    <section id="trainers" className="bg-base-100 py-32">
      <div className="container">
        <div className="mb-20">
          <h2 className="font-display mb-4 text-5xl font-black tracking-tight uppercase">
            Đội Ngũ Kiến Tạo
          </h2>
          <div className="bg-primary h-1 w-24" />
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className={`group ${trainer.offset ? "lg:translate-y-12" : ""}`}
            >
              <div className="bg-base-300 mb-6 aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  src={trainer.image}
                  alt={trainer.name}
                />
              </div>
              <h4 className="font-display text-2xl font-black uppercase">{trainer.name}</h4>
              <p className="text-primary mb-4 text-xs font-bold tracking-widest uppercase">
                {trainer.role}
              </p>
              <p className="text-base-content/60 text-sm">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
