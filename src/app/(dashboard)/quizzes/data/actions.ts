import apiClient from "@/lib/api";
import { QuizFormValues } from "./schemas";

export const createQuiz = async (data: QuizFormValues) => {
  const response = await apiClient.post("/quizzes", {
    ...data,
    content: {}, // Initialize with empty JSON object
  });
  return response.data;
};

export const updateQuiz = async ({ id, data }: { id: number; data: QuizFormValues }) => {
  const response = await apiClient.patch(`/quizzes/${id}`, data);
  return response.data;
};

export const deleteQuiz = async (id: number) => {
  await apiClient.delete(`/quizzes/${id}`);
};