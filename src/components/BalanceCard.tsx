"use client";

export default function BalanceCard() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white border rounded-2xl shadow-sm p-8">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-4 md:mb-0">
        💰 ยอดเงินคงเหลือ 99999.00 บาท
      </div>
      <div className="flex gap-4">
        <button className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-[#9b59b6] text-white font-bold px-6 py-2 rounded-full shadow-md transition">
          เติมเงิน
        </button>
        <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition">
          ถอนเงิน
        </button>
      </div>
    </div>
  );
}
