import { z } from "zod";

export const eventTypes = [
  "A stay",
  "Wedding",
  "Private event",
  "Corporate retreat",
  "Full property buyout",
  "Something else",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a contactable number").max(24, "That number looks too long"),
  date: z.string().trim().min(1, "Choose an approximate date"),
  eventType: z.enum(eventTypes),
  guests: z.coerce.number().int().min(1, "At least one guest").max(500, "Please call us for parties over 500"),
  message: z.string().trim().max(1200, "Please keep this under 1200 characters").optional().default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export type EnquiryResult = { reference: string; receivedAt: string };

/**
 * Integration point. Today the enquiry is validated and acknowledged with a
 * reference; connect a database, mailer or CRM here when credentials exist.
 */
export async function recordEnquiry(data: Enquiry): Promise<EnquiryResult> {
  const receivedAt = new Date().toISOString();
  const reference = `BH-${receivedAt.slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  console.info("[enquiry]", { reference, receivedAt, name: data.name, eventType: data.eventType, guests: data.guests });
  return { reference, receivedAt };
}
