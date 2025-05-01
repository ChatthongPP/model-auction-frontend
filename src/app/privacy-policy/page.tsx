"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] text-black">
      <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-8">
        <h1 className="text-3xl font-bold text-pink-600 text-center">นโยบายความเป็นส่วนตัว</h1>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">1. การเก็บรวบรวมข้อมูล</h2>
          <p className="mt-2 text-black">
            เราเก็บข้อมูลที่จำเป็นจากผู้ใช้งาน เช่น ชื่อ, อีเมล, ที่อยู่สำหรับจัดส่ง, รายละเอียดการประมูล และธุรกรรมต่าง ๆ เพื่อให้บริการได้อย่างมีประสิทธิภาพ
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">2. การใช้ข้อมูล</h2>
          <p className="mt-2 text-black">
            ข้อมูลที่เก็บจะถูกใช้เพื่อดำเนินการประมูล จัดส่งสินค้า ติดต่อผู้ใช้งาน และวิเคราะห์การใช้งานเพื่อพัฒนาบริการ
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">3. การเปิดเผยข้อมูล</h2>
          <p className="mt-2 text-black">
            เราจะไม่ขายหรือเปิดเผยข้อมูลของผู้ใช้งานแก่บุคคลที่สาม เว้นแต่เป็นไปตามที่กฎหมายกำหนดหรือเพื่อให้บริการที่จำเป็น เช่น การจัดส่ง
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">4. การป้องกันข้อมูล</h2>
          <p className="mt-2 text-black">
            เรามีมาตรการด้านความปลอดภัยเพื่อป้องกันการเข้าถึงหรือการใช้งานข้อมูลโดยไม่ได้รับอนุญาต
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">5. สิทธิของผู้ใช้งาน</h2>
          <p className="mt-2 text-black">
            ผู้ใช้งานสามารถขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนตัวของตนได้โดยติดต่อทีมงานของเรา
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">6. การเปลี่ยนแปลงนโยบาย</h2>
          <p className="mt-2 text-black">
            เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว โดยจะแจ้งให้ผู้ใช้งานทราบผ่านเว็บไซต์
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">7. การติดต่อ</h2>
          <p className="mt-2 text-black">
            หากคุณมีคำถามเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราที่{" "}
            <Link href="/contact" className="text-pink-600 hover:underline">
              หน้าติดต่อเรา
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
