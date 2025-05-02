import apiClient from "@/lib/apiClient";

export const getProducts = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const response = await apiClient.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
