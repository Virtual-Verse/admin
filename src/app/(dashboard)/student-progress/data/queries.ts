import apiClient from "@/lib/api";
import { StudentProgressItem } from "./types";

export const getStudentProgress = async (studentId: number): Promise<StudentProgressItem[]> => {
  if (!studentId) return [];
  const response = await apiClient.get(`/student-progress/student/${studentId}`);
  return response.data;
};