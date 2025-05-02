import apiClient from "@/lib/apiClient";
import { User, AuthResponse, UserRequest } from "@/types/authTypes";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/login", {
    email,
    password,
  });
  localStorage.setItem("authToken", response.data.token);
  return response.data;
};

export const getProfile = async (): Promise<User | null> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const response = await apiClient.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = response.data.data;

    const mappedUserData: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      gender: userData.gender,
      phoneNumber: userData.phone_number,
      address: userData.address,
      citizenId: userData.citizen_id,
      roleId: userData.role_id,
    };

    return mappedUserData;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const register = async (
  userData: UserRequest
): Promise<AuthResponse> => {
  const payload = {
    email: userData.email,
    password: userData.password,
    first_name: userData.firstName,
    last_name: userData.lastName,
    gender: userData.gender,
    phone_number: userData.phoneNumber,
    address: userData.address,
    citizen_id: userData.citizenId,
    role_id: userData.roleId,
  };

  const response = await apiClient.post("/register", payload);
  return response.data.data;
};
