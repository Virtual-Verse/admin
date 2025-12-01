import apiClient from "@/lib/api";
import { Badge } from "./types";

export const getBadges = async (): Promise<Badge[]> => {
  const response = await apiClient.get("/badges");
  return response.data;
};