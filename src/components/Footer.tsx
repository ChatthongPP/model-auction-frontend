"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* แถบสีตัดด้านบน */}
      <div className="h-1 bg-pink-300 w-full"></div>

      <footer className="bg-gradient-to-b from-[#2d1459] to-[#120c24] text-white pt-10 pb-6 mt-0">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">

          {/* โลโก้/ชื่อเว็บ */}
          <div className="text-center md:text-left md:col-span-1">
            <h2 className="text-2xl font-bold text-pink-300">MarketPlace</h2>
            <p className="text-sm text-gray-400 mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Auction Web */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-300">Auction Web</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <Link href="/contact" className="hover:text-pink-300 transition">ติดต่อเรา</Link>
              <Link href="/privacy-policy" className="hover:text-pink-300 transition">นโยบายความเป็นส่วนตัว</Link>
              <Link href="/terms-and-conditions" className="hover:text-pink-300 transition">ข้อตกลงและเงื่อนไข</Link>
            </div>
          </div>

          {/* ข้อมูลและความช่วยเหลือ */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-300">ข้อมูลและความช่วยเหลือ</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <Link href="/how-to-bid" className="hover:text-pink-300 transition">ขั้นตอนการประมูล</Link>
              <Link href="/payment" className="hover:text-pink-300 transition">การชำระเงิน</Link>
              <Link href="/unavailable-products" className="hover:text-pink-300 transition">สินค้าที่ไม่สามารถประมูลได้</Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end justify-between">
            <h3 className="text-xl font-bold mb-4 text-pink-300">ติดตามเรา</h3>
            <div className="flex gap-4 text-sm">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* เส้นคั่น ด้านล่างสุด */}
        <div className="border-t border-pink-300 mt-10 pt-4 text-center text-gray-500 text-xs">
          Powered by MarketPlace Team
        </div>
      </footer>
    </>
  );
}
