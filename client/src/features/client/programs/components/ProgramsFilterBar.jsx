import { categories } from "../programsdata";

export default function ProgramsFilterBar({ activeCategory, onChange }) {
  return (
    <section className="bg-base-200 mb-12 px-4 py-6 md:px-8">
      <div className="container flex flex-wrap gap-3 px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`font-display rounded-lg px-6 py-2 text-sm font-bold tracking-tight uppercase transition-colors ${
              activeCategory === cat.id
                ? "bg-primary text-primary-content"
                : "bg-base-300 text-base-content/70 hover:bg-base-content/10 hover:text-base-content"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}
