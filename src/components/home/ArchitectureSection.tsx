import { useState } from "react";
import { useGsapContext, revealHeading, revealBlock, gsap } from "@/lib/anim";
import { architecture } from "@/data/estate";
import { ChapterMark, Section } from "@/components/site/Chapter";

export function ArchitectureSection() {
  const [active, setActive] = useState(0);

  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    revealBlock(root.querySelectorAll("[data-fade]"), reduced, 0.06);
    if (!reduced) {
      gsap.to(root.querySelectorAll("[data-arch-img]"), {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.querySelector("[data-arch-frame]"), start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  });

  return (
    <Section labelledBy="house-heading">
      <div ref={ref}>
        <ChapterMark number="04" title="The House" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 id="house-heading" data-heading className="display anim-hidden max-w-3xl text-[2.6rem] leading-[1.02] sm:text-[4.2rem]">
            Read the house the way an architect would.
          </h2>
          <p data-fade className="label lg:pb-3">Plates 01 — 05</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div data-arch-frame className="relative overflow-hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
              {architecture.map((item, i) => (
                <img
                  key={item.id}
                  data-arch-img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 h-[112%] w-full object-cover transition-opacity duration-[900ms] ease-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 border border-ivory/15" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <span className="label bg-charcoal/70 px-3 py-2 !text-ivory backdrop-blur-sm">{architecture[active]?.meta}</span>
                <span className="label bg-charcoal/70 px-3 py-2 !text-brass backdrop-blur-sm">
                  {String(active + 1).padStart(2, "0")} / {String(architecture.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <ul className="flex flex-col justify-center">
            {architecture.map((item, i) => (
              <li key={item.id} data-fade className="border-b border-border last:border-0">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group w-full py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="label text-brass">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`display text-2xl transition-colors sm:text-3xl ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.name}
                    </span>
                  </span>
                  <span
                    className="grid overflow-hidden text-sm leading-relaxed text-muted-foreground transition-[grid-template-rows,opacity] duration-500"
                    style={{ gridTemplateRows: active === i ? "1fr" : "0fr", opacity: active === i ? 1 : 0 }}
                  >
                    <span className="min-h-0 overflow-hidden pl-11 pt-3">{item.note}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
