import type { ReactNode } from "react";

export function ChapterMark({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="label text-brass">Ch. {number}</span>
      <span className="hairline-x w-10 sm:w-16" />
      <span className="label">{title}</span>
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative px-5 py-24 sm:px-8 sm:py-32 lg:py-40 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
