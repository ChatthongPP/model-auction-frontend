"use client";

import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/app/login/LoginForm";
import RegisterForm from "@/app/register/RegisterForm";

export default function Hero() {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <section className="bg-gray-100 py-20 relative">
      {/* ปุ่มด้านขวาบน */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={() => setActiveModal("login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Login
        </button>
        <button
          onClick={() => setActiveModal("register")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Register
        </button>
        <Link
          href="/profile"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Profile
        </Link>
      </div>

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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl">
            Search
          </button>
          <Link
            href="/cart"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-2xl"
          >
            🛒
          </Link>
        </div>

        {/* ปุ่มเมนูหลักด้านล่าง */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/categories"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            หมวดหมู่
          </Link>
          <Link
            href="/how-to-bid"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            ขั้นตอนการประมูล
          </Link>
          <Link
            href="/how-to-register"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            วิธีการสมัครสมาชิก
          </Link>
          <Link
            href="/how-to-topup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            วิธีเติมเงิน
          </Link>
          <Link
            href="/contact"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>

      {/* Popup Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`bg-white text-black p-8 rounded-2xl shadow-lg relative mx-4 
          ${activeModal === "register" ? "w-[900px] h-auto" : "w-[400px] h-[350px]"}`}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ❌
            </button>

            {/* Render modal */}
            {activeModal === "login" && (
              <LoginForm setActiveModal={setActiveModal} />
            )}
            {activeModal === "register" && (
              <RegisterForm setActiveModal={setActiveModal} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
