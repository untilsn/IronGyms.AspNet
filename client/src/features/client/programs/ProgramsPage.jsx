import { useMemo, useState } from "react";
import ProgramsHero from "./components/ProgramsHero";
import ProgramsFilterBar from "./components/ProgramsFilterBar";
import ProgramCard from "./components/ProgramCard";
import { programs } from "./programsdata";
import NewsletterCta from "../../../components/common/NewsletterCta";

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPrograms = useMemo(() => {
    if (activeCategory === "all") return programs;
    return programs.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <ProgramsHero />

      <ProgramsFilterBar activeCategory={activeCategory} onChange={setActiveCategory} />

      <section className="container">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <p className="text-base-content/50 py-20 text-center">
            Chưa có chương trình nào trong danh mục này.
          </p>
        )}
      </section>

      <NewsletterCta />
    </>
  );
}
