"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton"; 
import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/login/LoginForm";
import RegisterForm from "@/register/RegisterForm";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#1f0a38] text-white`}>

        {/* Header */}
        <header className="bg-[#1f0a38] shadow-md">
          <div className="flex justify-between items-center px-8 py-4">
            <HomeButton /> {/* ✅ ใช้ HomeButton Component */}

            <div className="flex gap-3">
              <button
                onClick={() => setActiveModal("login")}
                className="bg-[#6a0dad] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
              >
                Login
              </button>
              <button
                onClick={() => setActiveModal("register")}
                className="bg-[#6a0dad] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
              >
                Register
              </button>
              <Link
                href="/profile"
                className="bg-[#6a0dad] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
              >
                Profile
              </Link><Link
                href="/seller-centre"
                className="bg-[#970505] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
              >
                Seller
              </Link>

            </div>
          </div>

          {/* แถบสีตัดเพิ่มเติม */}
          <div className="h-2 bg-[#8e44ad]"></div>
        </header>

        {/* Popup Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
            <div
              className={`bg-[#2d1459] text-white p-8 rounded-2xl shadow-2xl relative mx-4 
              ${activeModal === "register" ? "w-[900px] h-auto" : "w-[400px] h-[350px]"}`}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 text-2xl"
              >
                ❌
              </button>

              {/* Render Modal */}
              {activeModal === "login" && <LoginForm setActiveModal={setActiveModal} />}
              {activeModal === "register" && <RegisterForm setActiveModal={setActiveModal} />}
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
