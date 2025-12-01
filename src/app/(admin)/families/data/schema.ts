import * as z from "zod";

export const familyFormSchema = z.object({
  familyName: z.string().min(3, { message: "Family name must be at least 3 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export type FamilyFormValues = z.infer<typeof familyFormSchema>;
