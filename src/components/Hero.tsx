"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20 relative">
      
      {/* ส่วนหัว */}
      <div className="text-center">
        <h1 className="text-4xl text-gray-600 font-bold mb-4">
          Welcome to MarketPlace
        </h1>
        <p className="text-lg text-gray-600 mb-10">.</p>

        {/* Search + Dropdown + Cart */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            className="px-4 py-2 rounded-md border text-gray-600 border-gray-300 w-64"
          />
          <select className="px-4 py-2 text-gray-600 rounded-md border border-gray-300">
            <option value="">เลือกหมวดหมู่</option>
            <option value="arttoy">อาร์ตทอย</option>
            <option value="model">โมเดล</option>
            <option value="figurine">ฟิกเกอร์</option>
          </select>
          <button className="bg-[#a448c0] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl">
            Search
          </button>
          <Link
            href="/cart"
            className="bg-[#ffffff] hover:bg-[#a448c0] text-[#a448c0] font-bold py-2 px-4 rounded-2xl"
          >
            🛒
          </Link>
        </div>

        {/* ปุ่มเมนูหลักด้านล่าง */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/categories"
            className="bg-[#a448c0] hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            หมวดหมู่
          </Link>
          <Link
            href="/how-to-bid"
            className="bg-[#a448c0] hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            ขั้นตอนการประมูล
          </Link>
          <Link
            href="/how-to-register"
            className="bg-[#a448c0] hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            วิธีการสมัครสมาชิก
          </Link>
          <Link
            href="/how-to-topup"
            className="bg-[#a448c0] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            วิธีเติมเงิน
          </Link>
          <Link
            href="/contact"
            className="bg-[#a448c0] hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>

    </section>
  );
}
