"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  console.log("user", user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
