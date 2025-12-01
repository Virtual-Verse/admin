import apiClient from "@/lib/api";
import { AssignQuizFormValues, AssignResourceFormValues } from "./schemas";

export const assignQuiz = async (data: AssignQuizFormValues) => {
  // Convert string IDs to numbers for backend
  const payload = {
    studentId: parseInt(data.studentId),
    quizId: parseInt(data.quizId),
  };
  const response = await apiClient.post("/assignments/quizzes", payload);
  return response.data;
};

export const assignResource = async (data: AssignResourceFormValues) => {
  const payload = {
    studentId: parseInt(data.studentId),
    resourceId: parseInt(data.resourceId),
  };
  const response = await apiClient.post("/assignments/resources", payload);
  return response.data;
};