import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useGsapContext, revealHeading, revealBlock } from "@/lib/anim";
import { celebrationTypes } from "@/data/estate";
import { ChapterMark } from "@/components/site/Chapter";

export function CelebrationSection() {
  const [active, setActive] = useState(0);

  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    revealBlock(root.querySelectorAll("[data-fade]"), reduced, 0.06);
  });

  return (
    <section ref={ref} aria-labelledby="celebrations-heading" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {celebrationTypes.map((c, i) => (
          <img
            key={c.id}
            src={c.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-charcoal/78" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 py-28 sm:px-8">
        <ChapterMark number="02" title="Celebrations" />
        <h2 id="celebrations-heading" data-heading className="display anim-hidden mt-8 max-w-4xl text-[2.5rem] leading-[1.0] sm:text-[4.6rem] lg:text-[5.6rem]">
          For the moments that deserve more than a simple hall.
        </h2>

        <ul className="mt-14 max-w-3xl">
          {celebrationTypes.map((c, i) => (
            <li key={c.id} data-fade className="border-b border-ivory/12 last:border-0">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className="group flex w-full flex-col gap-1.5 py-5 text-left sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className={`display text-[1.9rem] leading-none transition-all duration-500 sm:w-[46%] sm:text-[2.8rem] ${active === i ? "translate-x-1 text-ivory" : "text-ivory/55"}`}>
                  {c.title}
                </span>
                <span className="text-sm leading-relaxed text-ivory/60 sm:flex-1">{c.body}</span>
              </button>
            </li>
          ))}
        </ul>

        <div data-fade className="mt-12 flex flex-wrap gap-8">
          <Link
            to="/celebrations"
            data-cursor="Open"
            className="label border border-brass/60 px-7 py-4 !text-brass transition-colors hover:bg-brass hover:!text-charcoal"
          >
            Plan your celebration
          </Link>
        </div>
      </div>
    </section>
  );
}
