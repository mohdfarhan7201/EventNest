import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useGsapContext, gsap, revealHeading } from "@/lib/anim";
import { gallery, galleryFilters, type GalleryItem } from "@/data/estate";
import { ChapterMark, Section } from "@/components/site/Chapter";

export function ArchiveGallery({ heading = "The archive", chapter = "10" as string | null }) {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = gallery.filter((g) => filter === "All" || g.category === filter);

  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
  });

  // Animate the grid whenever the filter changes.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const figures = root.querySelectorAll("[data-tile]");
    gsap.set(figures, { opacity: 1 });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      figures,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.045, ease: "power2.out" },
    );
    return () => { tween.kill(); };
  }, [filter, ref]);

  // Lightbox: lock scroll, trap escape, restore focus.
  useEffect(() => {
    if (!lightbox) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [lightbox]);

  return (
    <Section labelledBy="archive-heading" id="archive">
      <div ref={ref}>
        {chapter && <ChapterMark number={chapter} title="The Archive" />}
        <h2 id="archive-heading" data-heading className="display anim-hidden mt-8 text-[2.8rem] leading-none sm:text-[5rem]">
          {heading}
        </h2>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-4" role="group" aria-label="Filter the archive">
          {galleryFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`label transition-colors ${filter === f ? "!text-brass" : "hover:!text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <figure
              key={item.id}
              data-tile
              className={`group relative overflow-hidden opacity-0 ${
                item.span === "wide" ? "col-span-2" : ""
              } ${item.span === "tall" ? "row-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => setLightbox(item)}
                data-cursor="Explore"
                className="block h-full w-full text-left"
                aria-label={`Open ${item.caption} in full screen`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className={`w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06] ${
                    item.span === "tall" ? "aspect-[3/4] h-full" : item.span === "wide" ? "aspect-[16/9]" : "aspect-square"
                  }`}
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-charcoal/85 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="label block !text-ivory">{item.caption}</span>
                  <span className="label mt-1 block !text-brass">{item.category} — {item.year}</span>
                </span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
          className="fixed inset-0 z-[96] flex flex-col bg-charcoal/97 p-4 backdrop-blur-sm sm:p-8"
          onClick={(e) => e.currentTarget === e.target && setLightbox(null)}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="label !text-brass">{lightbox.category}</p>
              <p className="display mt-1 text-xl text-ivory sm:text-2xl">{lightbox.caption}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close image"
              className="flex h-11 w-11 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-brass hover:text-brass"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <img
            src={lightbox.image}
            alt={lightbox.caption}
            className="mx-auto my-6 max-h-[74vh] w-auto max-w-full object-contain"
          />
          <p className="label text-center">{lightbox.year}</p>
        </div>
      )}
    </Section>
  );
}
