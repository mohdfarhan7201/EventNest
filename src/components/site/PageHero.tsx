import { useGsapContext, gsap, splitWords } from "@/lib/anim";

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
    if (heading) {
      heading.classList.remove("anim-hidden");
      if (reduced) {
        gsap.set(heading, { opacity: 1 });
      } else {
        const words = splitWords(heading);
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 110 },
            { yPercent: 0, duration: 1.0, ease: "power3.out", stagger: 0.05, delay: 0.1 },
          );
        }
      }
    }
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
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.25 + i * 0.12, ease: "power2.out" },
      );
    });
  }, [title, label]);

  return (
    <header ref={ref} className="relative flex min-h-[78vh] items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img src={image} alt={alt} className="h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/30" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-16 sm:px-8 sm:pb-24">
        <p data-fade className="label text-brass">{label}</p>
        <h1 data-heading className="display mt-5 max-w-4xl text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.5rem]">
          {title}
        </h1>
        <p data-fade className="mt-7 max-w-xl text-base leading-relaxed text-ivory/75">{intro}</p>
      </div>
    </header>
  );
}
