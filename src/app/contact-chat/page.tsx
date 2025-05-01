"use client";

import { useState } from "react";

export default function ContactChat() {
  const [messages, setMessages] = useState<{ from: "user" | "admin"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    // จำลองข้อความจาก admin
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "admin", text: "ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับโดยเร็วที่สุดค่ะ" }]);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] px-4 py-10 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-pink-400">สอบถามกับแอดมิน</h2>
        <div className="h-80 overflow-y-auto bg-white bg-opacity-20 rounded-lg p-4 space-y-2 text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs ${
                msg.from === "user"
                  ? "bg-pink-500 text-white self-end ml-auto"
                  : "border border-[#1f0a38] bg-white text-black self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-[#1f0a38] flex-1 px-3 py-2 rounded-lg text-black"
            placeholder="พิมพ์ข้อความ..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}
