import * as z from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Schema for Creating (File is required)
export const createBadgeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "Description must be at least 2 characters."),
  file: z
    .any()
    .refine((files) => files?.length === 1, "Badge image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

// Schema for Updating (File is not supported by backend yet, so just text)
export const updateBadgeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "Description must be at least 2 characters."),
});

export type CreateBadgeFormValues = z.infer<typeof createBadgeSchema>;
export type UpdateBadgeFormValues = z.infer<typeof updateBadgeSchema>;