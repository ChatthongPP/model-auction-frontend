"use client";

export default function PdfModal() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] text-white p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-3xl">
        {/* Viewer */}
        <div className="flex justify-center mb-4">
          <iframe
            src="/regis.pdf"
            title="PDF Viewer"
            className="w-full h-[80vh]"
            style={{ border: "none" }}
          ></iframe>
        </div>

        {/* ข้อความ fallback */}
        <p className="text-center text-sm mb-4 text-black">
          หากไม่สามารถแสดงไฟล์ได้ กรุณาใช้ลิงก์ด้านล่าง
        </p>

        {/* ปุ่มต่างๆ */}
        <div className="flex flex-col md:flex-row gap-2 justify-center">
          <a
            href="/regis.pdf"
            download
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-center"
          >
            ดาวน์โหลด PDF
          </a>
          <a
            href="/regis.pdf"
            target="_blank"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-center"
          >
            เปิด PDF ในแท็บใหม่
          </a>
        </div>
      </div>
    </div>
  );
}
