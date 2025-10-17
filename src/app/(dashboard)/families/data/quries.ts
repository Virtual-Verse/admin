import apiClient from "@/lib/api";
import { Family } from "./types";

export const getFamilies = async (): Promise<Family[]> => {
  const response = await apiClient.get("/families");
  return response.data;
};