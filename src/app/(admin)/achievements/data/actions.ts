import apiClient from "@/lib/api";
import { AwardBadgeFormValues, LogCompletionFormValues } from "./schemas";

export const awardBadge = async (data: AwardBadgeFormValues) => {
    const payload = {
        studentId: parseInt(data.studentId),
        badgeId: parseInt(data.badgeId),
    };
    const response = await apiClient.post("/achievements/award-badge", payload);
    return response.data;
};

export const logCompletion = async (data: LogCompletionFormValues) => {
    const payload = {
        studentId: parseInt(data.studentId),
        completedItem: data.completedItem,
    };
    const response = await apiClient.post("/achievements/log-completion", payload);
    return response.data;
};