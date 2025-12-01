import * as z from "zod";

export const quizFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  // We are intentionally skipping 'content' here for now. 
  // We will handle questions in a separate interface.
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;