import * as z from "zod";

export const assignQuizSchema = z.object({
  studentId: z.string().min(1, "Please select a student."), // Select returns strings
  quizId: z.string().min(1, "Please select a quiz."),
});

export const assignResourceSchema = z.object({
  studentId: z.string().min(1, "Please select a student."),
  resourceId: z.string().min(1, "Please select a resource."),
});

export type AssignQuizFormValues = z.infer<typeof assignQuizSchema>;
export type AssignResourceFormValues = z.infer<typeof assignResourceSchema>;