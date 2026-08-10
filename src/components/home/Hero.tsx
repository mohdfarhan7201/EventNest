import { useGsapContext, gsap, splitWords } from "@/lib/anim";
import { estate, images } from "@/data/estate";

export function Hero() {
  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    const img = root.querySelector<HTMLElement>("[data-hero-img]");
    const frame = root.querySelector<HTMLElement>("[data-hero-frame]");
    const line1 = root.querySelector<HTMLElement>("[data-line='1']");
    const line2 = root.querySelector<HTMLElement>("[data-line='2']");
    root.querySelectorAll(".anim-hidden").forEach((el) => el.classList.remove("anim-hidden"));

    if (reduced) return;

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(frame, { clipPath: "inset(14% 14% 14% 14%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.inOut" })
      .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 2.2, ease: "power3.out" }, 0);

    [line1, line2].forEach((line, i) => {
      if (!line) return;
      const words = splitWords(line);
      tl.fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 1.1, ease: "power3.out", stagger: 0.07 }, 0.7 + i * 0.12);
    });

    tl.from(root.querySelectorAll("[data-hero-meta]"), { opacity: 0, y: 16, duration: 0.9, ease: "power2.out", stagger: 0.12 }, 1.2);

    gsap.to(img, {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(root.querySelector("[data-hero-content]"), {
      opacity: 0,
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: root, start: "60% top", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div data-hero-frame className="absolute inset-0 overflow-hidden">
        <img
          data-hero-img
          src={images.heroEstate}
          alt={`The east facade of ${estate.name} at dusk, its carved doors lit from within`}
          width={1920}
          height={1200}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-charcoal/45" />
      </div>

      <div data-hero-content className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-14 sm:px-8 sm:pb-20">
        <p data-hero-meta className="label text-brass">Chapter 01 — The Arrival</p>

        <h1 className="display mt-6 text-[3.1rem] leading-[0.92] sm:text-[6rem] lg:text-[8rem]">
          <span data-line="1" className="anim-hidden block overflow-hidden">A legacy</span>
          <span data-line="2" className="anim-hidden block overflow-hidden italic text-cream">worth arriving for</span>
        </h1>

        <div className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr_auto] sm:items-end">
          <div data-hero-meta className="flex flex-col gap-2">
            <p className="label">Est. {estate.established}</p>
            <p className="text-sm font-semibold tracking-wider text-white bg-white/10 px-3 py-1 rounded backdrop-blur-sm w-fit border border-white/20">
              {estate.descriptor}
            </p>
          </div>
          <div data-hero-meta className="max-w-md flex flex-col gap-6">
            <p className="text-sm leading-relaxed text-ivory/80">
              Set against the vibrant backdrop of Gorakhpur, Event Nest is a beautifully crafted premium venue designed to host your most cherished celebrations. From the moment you step through our grand entrance, you are greeted by sprawling open courtyards, an impeccably lit banquet hall, and a dedicated team committed to flawless execution. Whether it is an intimate family gathering, a grand wedding, or a professional corporate retreat, we provide the perfect blend of luxury, comfort, and seamless hospitality.
            </p>
            <a 
              href={`tel:${estate.phone.replace(/\s/g, "")}`} 
              className="inline-flex items-center justify-center gap-2 bg-[#d4b06e] text-[#1c1c1c] px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,176,110,0.4)] w-fit"
            >
              Call for Booking
            </a>
          </div>
          <p data-hero-meta className="label flex items-center gap-3 text-brass">
            Scroll to explore
            <span className="block h-8 w-px bg-brass/50" />
          </p>
        </div>
      </div>
    </section>
  );
}
