// src/app/(dashboard)/families/data/actions.ts
import apiClient from "@/lib/api";
import { FamilyFormValues } from "./schema";

export const createFamily = async (newFamily: FamilyFormValues) => {
  const response = await apiClient.post("/families", newFamily);
  return response.data;
};

// --- ADD UPDATE AND DELETE FUNCTIONS ---

export const updateFamily = async ({ id, data }: { id: number; data: Partial<FamilyFormValues> }) => {
  // Omit password if it's an empty string
  const payload = data.password ? data : { familyName: data.familyName };
  const response = await apiClient.patch(`/families/${id}`, payload);
  return response.data;
};

export const deleteFamily = async (familyId: number) => {
  await apiClient.delete(`/families/${familyId}`);
};  