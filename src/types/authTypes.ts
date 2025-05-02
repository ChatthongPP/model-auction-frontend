export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  citizenId: string;
  roleId: number;
}

export interface UserRequest {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  citizenId: string;
  roleId: number;
}

export interface AuthResponse {
  token: string;
}
