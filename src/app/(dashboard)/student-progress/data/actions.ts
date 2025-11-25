import apiClient from "@/lib/api";
import { CreateProgressFormValues, UpdateProgressFormValues } from "./schemas";

export const createProgress = async ({ studentId, data }: { studentId: number; data: CreateProgressFormValues }) => {
  const payload = { ...data, studentId };
  const response = await apiClient.post("/student-progress", payload);
  return response.data;
};

export const updateProgress = async ({ id, data }: { id: number; data: UpdateProgressFormValues }) => {
  const response = await apiClient.patch(`/student-progress/${id}`, data);
  return response.data;
};

export const incrementRevision = async (id: number) => {
  const response = await apiClient.post(`/student-progress/${id}/increment-revision`);
  return response.data;
};

export const deleteProgress = async (id: number) => {
  await apiClient.delete(`/student-progress/${id}`);
};