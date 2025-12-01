import apiClient from "@/lib/api";
import { Quiz } from "./types";

export const getQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response = await apiClient.get("/quizzes");
    console.log("Quizzes response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching quizzes:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch quizzes");
  }
};

// Also needed for the Builder page
export const getQuiz = async (id: number): Promise<Quiz> => {
  try {
    if (!id || isNaN(id)) {
      throw new Error("Invalid quiz ID");
    }
    const response = await apiClient.get(`/quizzes/${id}`);
    console.log("Quiz response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching quiz:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch quiz");
  }
};