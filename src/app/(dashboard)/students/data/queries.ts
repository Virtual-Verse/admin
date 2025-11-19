import apiClient from "@/lib/api";
import { Student, FamilyOption } from "./types";
import { Family } from "../../families/data/types";

export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get("/students");
  return response.data;
};

export const getFamiliesForSelect = async (): Promise<FamilyOption[]> => {
  const response = await apiClient.get("/families");
  // We only need the id and name for the select dropdown
  return response.data.map((family: Family) => ({
    id: family.id,
    familyName: family.familyName,
  }));
};