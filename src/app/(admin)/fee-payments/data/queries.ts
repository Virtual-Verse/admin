import apiClient from "@/lib/api";
import { FeePayment } from "./types";

export const getFeePayments = async (): Promise<FeePayment[]> => {
  const response = await apiClient.get("/fee-payments");
  return response.data;
};