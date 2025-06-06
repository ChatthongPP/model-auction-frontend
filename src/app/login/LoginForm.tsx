"use client";

import { useState } from "react";

interface LoginFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<"login" | "register" |null>>;
}

export default function LoginForm({ setActiveModal }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ทำ logic login
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-pink-400 text-[#FFFFFF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-pink-400 text-[#FFFFFF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 text-white font-bold py-2 px-4 rounded-2xl shadow-md"
        >
          เข้าสู่ระบบ
        </button>
      </form>

      <p className="text-center text-[#FFFFFF] text-sm mt-6">
        ยังไม่มีบัญชี?{" "}
        <button
          type="button"
          onClick={() => setActiveModal("register")}
          className="text-pink-400  hover:underline"
        >
          สมัครสมาชิก
        </button>
      </p>
    </div>
  );
}
