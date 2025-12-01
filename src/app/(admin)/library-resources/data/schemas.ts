import * as z from "zod";

// Max file size: 5MB
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

export const resourceFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  category: z.string().min(2, { message: "Category is required." }),
  // We accept a FileList (what the input returns) or undefined (for editing without changing file)
  file: z
    .any()
    .optional() 
    // In a real app, you might add refinement here to check file size/type on the client
});

export type ResourceFormValues = z.infer<typeof resourceFormSchema>;


