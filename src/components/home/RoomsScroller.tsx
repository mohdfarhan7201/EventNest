import { Link } from "@tanstack/react-router";
import { useGsapContext, gsap, revealHeading, revealImage } from "@/lib/anim";
import { rooms } from "@/data/estate";
import { ChapterMark } from "@/components/site/Chapter";

/**
 * Desktop: pinned horizontal scrub through the rooms.
 * Mobile / reduced motion: a vertical editorial sequence of the same records.
 */
export function RoomsScroller() {
  const ref = useGsapContext<HTMLElement>(({ root, reduced, desktop }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);

    if (!desktop || reduced) {
      root.querySelectorAll<HTMLElement>("[data-room-frame]").forEach((frame) => revealImage(frame, reduced));
      gsap.set(root.querySelectorAll("[data-room-body]"), { opacity: 1 });
      return;
    }

    const track = root.querySelector<HTMLElement>("[data-track]");
    const viewport = root.querySelector<HTMLElement>("[data-viewport]");
    if (!track || !viewport) return;

    const distance = () => track.scrollWidth - viewport.clientWidth;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: viewport,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    gsap.utils.toArray<HTMLElement>("[data-room]", track).forEach((panel) => {
      const img = panel.querySelector("[data-room-img]");
      gsap.fromTo(
        img,
        { xPercent: 8, scale: 1.14 },
        {
          xPercent: -8,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        },
      );
      gsap.fromTo(
        panel.querySelectorAll("[data-room-body] > *"),
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 78%" },
        },
      );
    });
  });

  return (
    <section ref={ref} aria-labelledby="rooms-heading" className="relative">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32">
        <ChapterMark number="05" title="Rooms & Suites" />
        <h2 id="rooms-heading" data-heading className="display anim-hidden mt-8 text-[2.8rem] leading-none sm:text-[5rem] lg:text-[6rem]">
          Chambers of rest
        </h2>
        <p className="label mt-6">{rooms.length} rooms — no two alike</p>
      </div>

      {/* Desktop horizontal track / mobile vertical sequence */}
      <div data-viewport className="lg:h-[100svh] lg:overflow-hidden">
        <div
          data-track
          className="flex flex-col gap-20 px-5 pb-8 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:pb-0"
        >
          {rooms.map((room) => (
            <article
              key={room.id}
              data-room
              className="lg:flex lg:h-full lg:w-[86vw] lg:max-w-[1180px] lg:shrink-0 lg:items-center lg:gap-16 lg:px-[4vw]"
            >
              <div data-room-frame className="relative overflow-hidden lg:w-[52%]">
                <img
                  data-room-img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  width={1400}
                  height={1100}
                  className="aspect-[4/5] w-full scale-105 object-cover lg:aspect-[3/4]"
                />
                <span className="label absolute left-4 top-4 bg-charcoal/70 px-3 py-2 !text-ivory backdrop-blur-sm">
                  {room.index}
                </span>
              </div>

              <div data-room-body className="mt-8 lg:mt-0 lg:w-[48%]">
                <p className="label text-brass">Chamber {room.index}</p>
                <h3 className="display mt-4 text-[2.2rem] leading-tight sm:text-[3.2rem]">{room.name}</h3>
                <p className="mt-5 max-w-md text-sm leading-[1.9] text-muted-foreground sm:text-base">{room.description}</p>

                <dl className="mt-9 grid max-w-md grid-cols-2 gap-y-5 border-t border-border pt-6">
                  {[
                    ["Size", room.size],
                    ["Capacity", room.guests],
                    ["Bed", room.bed],
                    ["Signature", room.feature],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label">{k}</dt>
                      <dd className="mt-1.5 text-sm text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  to="/rooms"
                  data-cursor="Open"
                  className="label mt-9 inline-flex border-b border-current pb-1 text-foreground transition-colors hover:text-brass"
                >
                  All rooms & rates
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
