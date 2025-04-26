// src/utils/apiClient.ts
import axios from "axios";

// สร้าง instance ของ axios
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ใช้ base URL จาก .env
  headers: {
    "Content-Type": "application/json",
  },
});

// เพิ่มการตั้งค่าหรือ Interceptor ถ้าต้องการ
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // เพิ่ม Authorization Header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
