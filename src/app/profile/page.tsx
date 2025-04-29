"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Home,
  Heart,
  FileText,
  ShoppingBag,
  CheckCircle,
  CreditCard,
} from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const [user] = useState({
    email: "chatthong.pp@gmail.com",
    password: "********",
    name: "Chatthong",
    phone: "0966918134",
    address: "28/479 หมู่บ้านซิตี้เซนต์ 5 กระทุ่มล้ม สายห้า นครปฐม 73220",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* เงินคงเหลือ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white border rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-4 md:mb-0">
            💰 ยอดเงินคงเหลือ 99999.00 บาท
          </div>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-[#9b59b6] text-white font-bold px-6 py-2 rounded-full shadow-md transition">
              เติมเงิน
            </button>

            <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition">
              ถอนเงิน
            </button>
          </div>
        </div>

        {/* Content หลัก */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ข้อมูลส่วนตัว */}
          <div className="bg-white border rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-700">
                ข้อมูลส่วนตัว
              </h2>
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
                <Lock size={20} className="text-pink-400" />
                <span className="font-medium">รหัสผ่าน:</span> {user.password}
              </div>
              <div className="flex items-center gap-2">
                <User size={20} className="text-pink-400" />
                <span className="font-medium">ชื่อจริง:</span> {user.name}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-pink-400" />
                <span className="font-medium">เบอร์โทรศัพท์:</span> {user.phone}
              </div>
              <div className="flex items-center gap-2">
                <Home size={20} className="text-pink-400" />
                <span className="font-medium">ที่อยู่จัดส่งสินค้า:</span>{" "}
                {user.address}
              </div>
            </div>
          </div>

          {/* เมนูประมูล */}
          <div className="bg-white border rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-8">
              ประมูลสินค้า
            </h2>
            <div className="flex flex-col gap-6 text-base text-gray-600">
              <button className="flex items-center gap-2 text-left hover:text-pink-500 transition font-medium">
                <Heart size={20} /> รายการโปรด
              </button>
              <div className="border-t"></div>
              <button className="flex items-center gap-2 text-left hover:text-indigo-500 transition font-medium">
                <FileText size={20} /> รายการประมูลสินค้า
              </button>
              <div className="border-t"></div>
              <button className="flex items-center gap-2 text-left hover:text-green-500 transition font-medium">
                <ShoppingBag size={20} /> ประวัติการซื้อสินค้า
              </button>
              <div className="border-t"></div>
              <button className="flex items-center gap-2 text-left hover:text-blue-500 transition font-medium">
                <CheckCircle size={20} /> สินค้าที่ส่งแล้ว
              </button>
              <div className="border-t"></div>
              <button className="flex items-center gap-2 text-left hover:text-yellow-500 transition font-medium">
                <CreditCard size={20} /> ประวัติการโอนทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
