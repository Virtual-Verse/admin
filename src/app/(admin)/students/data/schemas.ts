// src/app/(dashboard)/students/data/schemas.ts
import * as z from "zod";

export const studentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.number().optional(),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  country: z.string().optional(),
  tuitionFee: z.string().optional(), // Keeping as string for form input flexibility
  currency: z.string().optional(),
  enrolledAt: z.string().optional(),
  familyId: z.number().min(1, { message: "You must select a family." }),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;