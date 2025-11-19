import apiClient from "@/lib/api";
import { StudentFormValues } from "./schemas";

export const createStudent = async (newStudent: StudentFormValues) => {
  const response = await apiClient.post("/students", newStudent);
  return response.data;
};

export const updateStudent = async ({ id, data }: { id: number; data: Partial<StudentFormValues> }) => {
  console.log('Updating student', id, data);
  const response = await apiClient.patch(`/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (studentId: number) => {
  // We don't actually delete, we update the status.
  // This is a placeholder for the status update logic you'll add.
  // For now, let's pretend it works, or you can implement the status update endpoint.
  // Let's assume you have a PATCH /students/:id/status endpoint
  await apiClient.patch(`/students/${studentId}/status`, { status: 'LEFT_UNCOMPLETED' });
};