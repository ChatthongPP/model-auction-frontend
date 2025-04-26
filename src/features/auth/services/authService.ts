import apiClient from "@/lib/apiClient";

// ฟังก์ชันเข้าสู่ระบบ
export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  localStorage.setItem("authToken", response.data.token); // เก็บ Token
};

// ฟังก์ชันดึงข้อมูลผู้ใช้
export const getUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const response = await apiClient.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
