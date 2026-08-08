import { useGsapContext, gsap, revealHeading } from "@/lib/anim";

export function PageHero({
  label,
  title,
  intro,
  image,
  alt,
}: {
  label: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
}) {
  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    const heading = root.querySelector<HTMLElement>("[data-heading]");
    if (heading) revealHeading(heading, reduced);
    const img = root.querySelector("img");
    if (!reduced && img) {
      gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: "power3.out" });
      gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }
    root.querySelectorAll("[data-fade]").forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 18, duration: 0.9, delay: 0.35 + i * 0.12, ease: "power2.out" });
    });
  });

  return (
    <header ref={ref} className="relative flex min-h-[78vh] items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img src={image} alt={alt} className="h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/30" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-16 sm:px-8 sm:pb-24">
        <p data-fade className="label text-brass">{label}</p>
        <h1 data-heading className="display anim-hidden mt-5 max-w-4xl text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.5rem]">
          {title}
        </h1>
        <p data-fade className="mt-7 max-w-xl text-base leading-relaxed text-ivory/75">{intro}</p>
      </div>
    </header>
  );
}
