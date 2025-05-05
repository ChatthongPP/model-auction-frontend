import apiClient from "@/lib/apiClient";

export const uploadFile = async (
  topic: string,
  file: File
): Promise<string | null> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("file", file);

  try {
    const response = await apiClient.post("/media/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const url = response.data?.data.url;
    return url ?? null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
