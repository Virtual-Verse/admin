import apiClient from "@/lib/api";
import { CreateFeePaymentFormValues } from "./schemas";

export const createFeePayment = async (data: CreateFeePaymentFormValues) => {
  // Convert string IDs/Values to numbers for backend
  const payload = {
    familyId: parseInt(data.familyId),
    year: Number(data.year),
    month: Number(data.month),
  };
  const response = await apiClient.post("/fee-payments", payload);
  return response.data;
};

export const deleteFeePayment = async (id: number) => {
  await apiClient.delete(`/fee-payments/${id}`);
};