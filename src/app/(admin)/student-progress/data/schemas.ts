import * as z from "zod";
import { ProgressStatus } from "./types";

export const createProgressSchema = z.object({
  category: z.string().min(1, "Category is required (e.g., Quran, Dua)."),
  title: z.string().min(1, "Title is required."),
  notes: z.string().optional(),
  status: z.nativeEnum(ProgressStatus).default(ProgressStatus.NOT_STARTED),
});

export const updateProgressSchema = createProgressSchema.partial();

export type CreateProgressFormValues = z.infer<typeof createProgressSchema>;
export type UpdateProgressFormValues = z.infer<typeof updateProgressSchema>;