import { Link } from "@tanstack/react-router";
import { useGsapContext, gsap, splitWords } from "@/lib/anim";
import { images } from "@/data/estate";

export function FinalInvitation() {
  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    root.querySelectorAll(".anim-hidden").forEach((el) => el.classList.remove("anim-hidden"));
    if (reduced) return;

    root.querySelectorAll<HTMLElement>("[data-huge]").forEach((line, i) => {
      const words = splitWords(line);
      gsap.fromTo(words, { yPercent: 115 }, {
        yPercent: 0, duration: 1.4, ease: "power3.out", delay: i * 0.12,
        scrollTrigger: { trigger: root, start: "top 60%" },
      });
    });

    gsap.from(root.querySelectorAll("[data-fade]"), {
      opacity: 0, y: 20, duration: 1, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: root, start: "top 55%" },
    });

    gsap.to(root.querySelector("img"), {
      yPercent: 10, scale: 1.08, ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={ref} aria-labelledby="invitation-heading" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.terrace} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/82" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-48">
        <p data-fade className="label text-brass">Your story starts here</p>
        <h2 id="invitation-heading" className="display mt-8 text-[4.5rem] leading-[0.86] sm:text-[9rem] lg:text-[12rem]">
          <span data-huge className="anim-hidden block overflow-hidden">Come</span>
          <span data-huge className="anim-hidden block overflow-hidden italic text-cream">inside.</span>
        </h2>

        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Link
            data-fade
            data-cursor="Open"
            to="/contact"
            className="label border border-brass/60 px-8 py-4 !text-brass transition-colors hover:bg-brass hover:!text-charcoal"
          >
            Plan your visit
          </Link>
          <Link data-fade to="/contact" className="label border-b border-current pb-1 transition-colors hover:text-brass">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
