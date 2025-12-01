import apiClient from "@/lib/api";
import { LibraryResource } from "./types";

export const getResources = async (): Promise<LibraryResource[]> => {
  const response = await apiClient.get("/library-resources");
  return response.data;
};