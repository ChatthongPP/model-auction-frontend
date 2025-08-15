import { jwtDecode } from "jwt-decode";

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

export const getUserIdFromToken = (authToken: string): number | null => {
  try {
    const decodedToken: { user_id: number } = jwtDecode(authToken);
    console.log("decodedToken.user_id", decodedToken.user_id);
    return Number(decodedToken.user_id);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getRoleIdFromToken = (authToken: string): number | null => {
  try {
    const decodedToken: { role_id: number } = jwtDecode(authToken);
    console.log("decodedToken.role_id", decodedToken.role_id);
    return Number(decodedToken.role_id);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
