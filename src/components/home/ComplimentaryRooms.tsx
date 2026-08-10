import { Link } from "@tanstack/react-router";
import { useGsapContext, revealHeading, revealImage } from "@/lib/anim";
import { rooms } from "@/data/estate";
import { ChapterMark } from "@/components/site/Chapter";

export function ComplimentaryRooms() {
  const room = rooms[0];

  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);

    const frame = root.querySelector<HTMLElement>("[data-room-frame]");
    if (frame) revealImage(frame, reduced);
  });

  if (!room) return null;

  return (
    <section ref={ref} id="complimentary" aria-labelledby="rooms-heading" className="px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <ChapterMark number="05" title="Getting Ready" />
        <h2 id="rooms-heading" data-heading className="display anim-hidden mt-8 text-[3rem] leading-[0.9] sm:text-[5.5rem] lg:text-[7rem]">
          For the host family.
        </h2>

        <article className="mt-20 lg:mt-32 border-t border-border pt-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
          <figure data-room-frame className="overflow-hidden lg:w-3/5">
            <img
              data-room-img
              src={room.image}
              alt={room.name}
              loading="lazy"
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
            />
          </figure>
          
          <div className="flex flex-col justify-center lg:w-2/5">
            <h3 className="display text-3xl sm:text-4xl">{room.name}</h3>
            <p className="mt-6 max-w-md text-foreground/80 text-lg leading-relaxed">{room.description}</p>
            
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 border-t border-border pt-8">
              {[
                ["Available For", room.guests],
                ["Space", room.size],
                ["Feature", room.feature],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-muted-foreground mb-1">{k}</dt>
                  <dd className="text-foreground font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </div>
    </section>
  );
}
