"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/app/login/LoginForm";
import RegisterForm from "@/app/register/RegisterForm";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );

  const closeModal = () => setActiveModal(null);

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#2d1459] text-white`}
      >
        {/* Header */}
        <header className="bg-gradient-to-b from-[#1f0a38] to-[#2d1459] shadow-md">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-bold text-pink-300">MarketPlace</h1>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveModal("login")}
                className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-4 rounded-2xl shadow-md"
              >
                Login
              </button>
              <button
                onClick={() => setActiveModal("register")}
                className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-4 rounded-2xl shadow-md"
              >
                Register
              </button>
              <Link
                href="/profile"
                className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-4 rounded-2xl shadow-md"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* แถบ Divider */}
          <div className="h-1 bg-pink-300"></div>
        </header>

        {/* Popup Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50">
            <div
              className={`bg-gradient-to-b from-[#2d1459] to-[#3d2075] text-white p-8 rounded-2xl shadow-2xl border-4 border-pink-300 relative mx-4
      ${
        activeModal === "register" ? "w-[900px] h-auto" : "w-[400px] h-[350px]"
      }`}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-300 hover:text-pink-300 text-2xl"
              >
                ❌
              </button>

              {/* Render Modal */}
              {activeModal === "login" && (
                <LoginForm setActiveModal={setActiveModal} />
              )}
              {activeModal === "register" && (
                <RegisterForm setActiveModal={setActiveModal} />
              )}
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
