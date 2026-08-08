import { createServerFn } from "@tanstack/react-start";
import { enquirySchema, recordEnquiry } from "./enquiries.shared";

/**
 * Enquiry intake. Validation runs server-side; `recordEnquiry` is the single
 * integration point — swap its body for a database write, CRM call or
 * transactional email without touching the form.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => recordEnquiry(data));
