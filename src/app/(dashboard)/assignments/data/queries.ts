import apiClient from "@/lib/api";
import { QuizAssignment, ResourceAssignment } from "./types";

export const getQuizAssignments = async (): Promise<QuizAssignment[]> => {
  const response = await apiClient.get("/assignments/quizzes");
  return response.data;
};

export const getResourceAssignments = async (): Promise<ResourceAssignment[]> => {
  const response = await apiClient.get("/assignments/resources");
  return response.data;
};