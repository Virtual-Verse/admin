import * as z from "zod";

export const awardBadgeSchema = z.object({
    studentId: z.string().min(1, "Please select a student."),
    badgeId: z.string().min(1, "Please select a badge."),
});

export const logCompletionSchema = z.object({
    studentId: z.string().min(1, "Please select a student."),
    completedItem: z.string().min(2, "Completion item name is required (e.g. Quran)."),
});

export type AwardBadgeFormValues = z.infer<typeof awardBadgeSchema>;
export type LogCompletionFormValues = z.infer<typeof logCompletionSchema>;