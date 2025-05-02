"use client";

import { Mail, User, Phone, Home } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

export default function UserInfo() {
  const { user, loading } = useProfile();

  if (loading) return <p className="text-white">กำลังโหลดข้อมูล...</p>;

  if (!user) return <p className="text-red-500">ไม่พบข้อมูลผู้ใช้</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white border rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-700">ข้อมูลส่วนตัว</h2>
            <button className="text-sm text-blue-500 hover:underline">
              แก้ไข
            </button>
          </div>

          <div className="space-y-6 text-gray-700 text-base">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-pink-400" />
              <span className="font-medium">อีเมล์:</span> {user.email}
            </div>
            <div className="flex items-center gap-2">
              <User size={20} className="text-pink-400" />
              <span className="font-medium">ชื่อ-นามสกุล:</span>{" "}
              {user.firstName} {user.lastName}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} className="text-pink-400" />
              <span className="font-medium">เบอร์โทรศัพท์:</span>{" "}
              {user.phoneNumber}
            </div>
            <div className="flex items-center gap-2">
              <Home size={20} className="text-pink-400" />
              <span className="font-medium">ที่อยู่:</span> {user.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
