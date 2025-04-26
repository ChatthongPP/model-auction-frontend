import { useState, useEffect } from "react";
import { User } from "../types/authTypes";

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await getUser();

//       console.log("userData", userData);
//       setUser(userData);
//     };

//     fetchUser();
//   }, []);

//   return { user };
// }

export const mockUser: User = {
  id: "123456",
  name: "John Doe",
  email: "john@example.com",
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // mock async loading
    const fetchUser = async () => {
      await new Promise((res) => setTimeout(res, 500)); // simulate delay
      setUser(mockUser);
    };

    fetchUser();
  }, []);

  return { user };
}
