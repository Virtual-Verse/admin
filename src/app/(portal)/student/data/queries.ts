import apiClient from "@/lib/api";

// 1. Get Student Details (Name, etc.)
export const getStudentProfile = async (studentId: number) => {
    const response = await apiClient.get(`/students/${studentId}`);
    return response.data;
};

// 2. Get Assigned Quizzes
export const getStudentQuizzes = async (studentId: number) => {
    const response = await apiClient.get(`/assignments/student/${studentId}/quizzes`);
    return response.data;
};

// 3. Get Assigned Resources (Books/PDFs)
export const getStudentResources = async (studentId: number) => {
    const response = await apiClient.get(`/assignments/student/${studentId}/resources`);
    return response.data;
};