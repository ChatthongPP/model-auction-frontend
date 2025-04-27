"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/app/login/LoginForm";
import RegisterForm from "@/app/register/RegisterForm";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>

        {/* Header */}
        <header className="bg-[#9966cc] shadow-md">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-xl font-bold text-gray-800"></h1>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveModal("login")}
                className="bg-[#5B21B6] hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
              >
                Login
              </button>
              <button
                onClick={() => setActiveModal("register")}
                className="bg-[#5B21B6] hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
              >
                Register
              </button>
              <Link
                href="/profile"
                className="bg-[#5B21B6] hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* แถบสีตัดเพิ่มเติม */}
          <div className="h-2 bg-[#7842ce]"></div>
        </header>

        {/* Popup Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
