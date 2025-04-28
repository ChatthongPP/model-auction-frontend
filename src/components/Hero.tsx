"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#1f0a38] via-[#5c2f8b] to-[#1f0a38] py-20 relative">ั
      {/* ส่วนหัว */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-md">
          Welcome to MarketPlace
        </h1>
        <p className="text-lg text-[#f4c2c2] mb-10">
          ค้นหาของสะสมที่คุณชื่นชอบ
        </p>

        {/* Search + Dropdown + Cart */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            className="px-4 py-2 rounded-md border text-gray-300 bg-[#2d1459] border-[#9b59b6] w-64 shadow-sm"
          />
          <select className="px-4 py-2 text-gray-300 bg-[#2d1459] rounded-md border border-[#9b59b6] shadow-sm">
            <option value="">เลือกหมวดหมู่</option>
            <option value="arttoy">อาร์ตทอย</option>
            <option value="model">โมเดล</option>
            <option value="figurine">ฟิกเกอร์</option>
          </select>
          <button className="bg-[#9b59b6] hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-2xl shadow-md">
            Search
          </button>
          <Link
            href="/cart"
            className="bg-[#9b59b6] hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-2xl shadow-md flex items-center gap-2"
          >
            <ShoppingCart size={25} />
            
          </Link>
        </div>

        {/* ปุ่มเมนูหลักด้านล่าง */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/categories"
            className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-6 rounded-2xl shadow-md"
          >
            หมวดหมู่
          </Link>
          <Link
            href="/how-to-bid"
            className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-6 rounded-2xl shadow-md"
          >
            ขั้นตอนการประมูล
          </Link>
          <Link
            href="/how-to-register"
            className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-6 rounded-2xl shadow-md"
          >
            วิธีการสมัครสมาชิก
          </Link>
          <Link
            href="/how-to-topup"
            className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-6 rounded-2xl shadow-md"
          >
            วิธีเติมเงิน
          </Link>
          <Link
            href="/contact"
            className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-6 rounded-2xl shadow-md"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </section>
  );
}
