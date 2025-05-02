"use client";

import {
  Heart,
  FileText,
  ShoppingBag,
  CheckCircle,
  CreditCard,
} from "lucide-react";

export default function AuctionMenu() {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-8">ประมูลสินค้า</h2>
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
  );
}
