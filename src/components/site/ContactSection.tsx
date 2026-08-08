import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { enquirySchema, eventTypes } from "@/lib/enquiries.shared";
import { estate } from "@/data/estate";
import { useGsapContext, revealHeading, revealBlock } from "@/lib/anim";

type Errors = Partial<Record<string, string>>;

export function ContactSection({ chapter }: { chapter?: string }) {
  const send = useServerFn(submitEnquiry);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [reference, setReference] = useState("");

  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    revealBlock(root.querySelectorAll("[data-fade]"), reduced, 0.05);
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = enquirySchema.safeParse(values);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setStatus("idle");
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const result = await send({ data: parsed.data });
      setReference(result.reference);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const field = "w-full border-b border-input bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brass";

  return (
    <section id="enquire" aria-labelledby="contact-heading" className="px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <span className="label text-brass">{chapter ? `Ch. ${chapter}` : "Contact"}</span>
          <span className="hairline-x w-10 sm:w-16" />
          <span className="label">Write to the house</span>
        </div>

        <h2 id="contact-heading" data-heading className="display anim-hidden mt-8 max-w-3xl text-[2.6rem] leading-[1.02] sm:text-[4.4rem]">
          Tell us when, and we will keep the room.
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="space-y-10">
            <div data-fade>
              <p className="label">Address</p>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-muted-foreground">{estate.location}</p>
            </div>
            <div data-fade>
              <p className="label">Reservations</p>
              <p className="mt-3 space-x-4">
                <a href={`tel:${estate.phone.replace(/\s/g, "")}`} className="text-base text-foreground underline-offset-4 hover:text-brass hover:underline">{estate.phone}</a>
              </p>
              <p className="mt-2">
                <a href={`mailto:${estate.email}`} className="text-base text-foreground underline-offset-4 hover:text-brass hover:underline">{estate.email}</a>
              </p>
            </div>
            <div data-fade>
              <p className="label">Elsewhere</p>
              <ul className="mt-3 flex gap-6">
                {estate.socials.map((s) => (
                  <li key={s.label}><a href={s.href} className="text-sm text-muted-foreground hover:text-brass">{s.label}</a></li>
                ))}
              </ul>
            </div>
            <div data-fade className="overflow-hidden border border-border">
              <iframe
                title={`Map showing the location of ${estate.name}`}
                src={`https://www.google.com/maps?q=${estate.mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full grayscale-[0.4]"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
            <Field label="Name" name="name" error={errors["name"]}>
              <input id="name" name="name" type="text" autoComplete="name" required className={field} placeholder="Your full name" aria-invalid={Boolean(errors["name"])} />
            </Field>
            <Field label="Email" name="email" error={errors["email"]}>
              <input id="email" name="email" type="email" autoComplete="email" required className={field} placeholder="you@example.com" aria-invalid={Boolean(errors["email"])} />
            </Field>
            <Field label="Phone" name="phone" error={errors["phone"]}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" required className={field} placeholder="+91" aria-invalid={Boolean(errors["phone"])} />
            </Field>
            <Field label="Approximate date" name="date" error={errors["date"]}>
              <input id="date" name="date" type="date" required className={field} aria-invalid={Boolean(errors["date"])} />
            </Field>
            <Field label="Occasion" name="eventType" error={errors["eventType"]}>
              <select id="eventType" name="eventType" defaultValue="A stay" className={`${field} appearance-none`} aria-invalid={Boolean(errors["eventType"])}>
                {eventTypes.map((t) => <option key={t} value={t} className="bg-card text-card-foreground">{t}</option>)}
              </select>
            </Field>
            <Field label="Number of guests" name="guests" error={errors["guests"]}>
              <input id="guests" name="guests" type="number" min={1} max={500} defaultValue={2} required className={field} aria-invalid={Boolean(errors["guests"])} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Message" name="message" error={errors["message"]}>
                <textarea id="message" name="message" rows={4} className={`${field} resize-none`} placeholder="Anything we should know before you arrive" aria-invalid={Boolean(errors["message"])} />
              </Field>
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor="Open"
                className="label border border-brass/60 px-8 py-4 !text-brass transition-colors hover:bg-brass hover:!text-charcoal disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </button>

              <p role="status" aria-live="polite" className="text-sm">
                {status === "sent" && (
                  <span className="text-brass">Received. Your reference is {reference} — we reply within one working day.</span>
                )}
                {status === "failed" && (
                  <span className="text-destructive">
                    We could not send that. Please try again, or write to{" "}
                    <a href={`mailto:${estate.email}`} className="underline">{estate.email}</a>.
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div data-fade>
      <label htmlFor={name} className="label">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
