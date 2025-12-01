import * as z from "zod";

export const createFeePaymentSchema = z.object({
  familyId: z.string().min(1, "Please select a family."),
  year: z.number().min(2020).max(2099),
  month: z.number().min(1).max(12),
}).refine(
  (data) => {
    return typeof data.year === "number" && typeof data.month === "number";
  },
  {
    message: "Year and month must be valid numbers",
  }
);

export type CreateFeePaymentFormValues = z.infer<typeof createFeePaymentSchema>;