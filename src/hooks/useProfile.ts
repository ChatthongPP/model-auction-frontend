import { useEffect, useState } from "react";
import { getProfile } from "@/services/authService";
import { User as UserType } from "@/types/authTypes";

export function useProfile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (error) {
        console.error("โหลดโปรไฟล์ล้มเหลว", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, loading };
}
