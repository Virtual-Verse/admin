import apiClient from "@/lib/api";
import { ResourceFormValues } from "./schemas";

export const createResource = async (data: ResourceFormValues) => {
  // 1. Create a FormData object
  const formData = new FormData();
  
  // 2. Append text fields
  formData.append("title", data.title);
  formData.append("category", data.category);
  if (data.description) formData.append("description", data.description);

  // 3. Append the file (if it exists)
  // data.file comes from React Hook Form as a FileList
  if (data.file && data.file[0]) {
    formData.append("file", data.file[0]);
  }

  // 4. Send as multipart/form-data
  // Axios will automatically set the Content-Type header when it sees FormData
  const response = await apiClient.post("/library-resources", formData);
  return response.data;
};

// Update is tricky with files. Usually, if no new file is provided, we just update text.
// For simplicity, let's implement text-only update first, or simple delete.
export const deleteResource = async (id: number) => {
  await apiClient.delete(`/library-resources/${id}`);
};