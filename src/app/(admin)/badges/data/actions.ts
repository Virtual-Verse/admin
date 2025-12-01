import apiClient from "@/lib/api";
import { CreateBadgeFormValues, UpdateBadgeFormValues } from "./schemas";

export const createBadge = async (data: CreateBadgeFormValues) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("file", data.file[0]); // The backend expects 'file'

  const response = await apiClient.post("/badges", formData);
  return response.data;
};

export const updateBadge = async ({ id, data }: { id: number; data: UpdateBadgeFormValues }) => {
  // Backend only supports text updates for now
  const response = await apiClient.patch(`/badges/${id}`, data);
  return response.data;
};

export const deleteBadge = async (id: number) => {
  await apiClient.delete(`/badges/${id}`);
};