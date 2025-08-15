"use client";

export default function ContactPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] px-4 py-10 text-[#6a0dad]">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#6a0dad]">ติดต่อเรา</h2>

        {/* ข้อมูลติดต่อ */}
        <div className="space-y-2 text-center">
          <p>📧 อีเมล: <a href="mailto:example@email.com" className="text-[#6a0dad] hover:underline">example@email.com</a></p>
          <p>📞 โทร: <a href="tel:0812345678" className="text-[#6a0dad] hover:underline">081-234-5678</a></p>
        
        </div>

        
      </div>
    </div>
  );
}
