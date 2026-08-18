import { trainWithUsFeatures } from "../trainersData";

export default function TrainWithUsSection() {
  return (
    <section className="bg-base-200 py-16 md:py-24">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-black tracking-tight uppercase md:text-5xl">
            Tập Luyện Cùng Chúng Tôi
          </h2>
          <p className="text-base-content/50 max-w-xs">
            Chúng tôi không chỉ rèn luyện cơ thể, chúng tôi xây dựng lối sống.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {trainWithUsFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-box relative aspect-square overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay gradient 2 lớp: tối đáy để đọc chữ, tối nhẹ đỉnh để cân bố cục */}
                <div className="from-base-100 via-base-100/10 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="from-base-100/40 absolute inset-0 bg-gradient-to-b via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon badge — gradient primary→accent, viền mềm, nổi khối */}
                <span className="rounded-box from-primary to-accent shadow-primary/20 absolute top-0 right-0 flex h-14 w-14 items-center justify-center bg-gradient-to-br shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={26} strokeWidth={2} className="text-primary-content" />
                </span>

                {/* Label — kính mờ thay vì nền phẳng, có gạch chân accent */}
                <div className="absolute inset-x-0 bottom-10 p-5">
                  <span className="rounded-field border-base-content/10 bg-base-100/60 inline-flex items-center gap-2 border px-4 py-2 backdrop-blur-md">
                    <span className="bg-accent h-1.5 w-1.5 rounded-full" />
                    <span className="font-display text-base-content text-sm font-semibold tracking-wide uppercase">
                      {item.label}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
