import apiClient from "@/lib/apiClient";

export const getCategories = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const response = await apiClient.get("/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};
