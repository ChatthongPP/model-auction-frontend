"use client";

import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] text-black">
      <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-8">
        <h1 className="text-3xl font-bold text-pink-600 text-center">ข้อตกลงและเงื่อนไขการใช้งาน</h1>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">1. การยอมรับข้อตกลง</h2>
          <p className="mt-2 text-black">
            ผู้ใช้งานต้องยอมรับข้อตกลงและเงื่อนไขนี้ก่อนใช้งานเว็บไซต์ หากคุณไม่ยอมรับ กรุณาอย่าใช้บริการของเรา
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">2. การลงทะเบียนและบัญชี</h2>
          <p className="mt-2 text-black">
            ผู้ใช้งานต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันเมื่อลงทะเบียน และต้องรักษาข้อมูลบัญชีของตนเองให้ปลอดภัย
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">3. กฎการประมูล</h2>
          <p className="mt-2 text-black">
            ห้ามการประมูลโดยใช้บัญชีปลอมหรือพฤติกรรมที่ไม่เหมาะสม เช่น ปั่นราคาหรือประมูลแล้วไม่ชำระเงิน
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">4. การชำระเงินและจัดส่ง</h2>
          <p className="mt-2 text-black">
            ผู้ชนะการประมูลต้องชำระเงินภายในระยะเวลาที่กำหนด สินค้าจะถูกจัดส่งหลังจากได้รับการยืนยันการชำระเงิน
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">5. การยกเลิกและคืนเงิน</h2>
          <p className="mt-2 text-black">
            การยกเลิกหรือคืนเงินสามารถทำได้เฉพาะในกรณีที่มีเหตุผลที่เหมาะสมตามนโยบายของเว็บไซต์
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">6. ความรับผิดชอบของผู้ใช้งาน</h2>
          <p className="mt-2 text-black">
            ผู้ใช้งานต้องรับผิดชอบต่อการกระทำของตนในระบบ และต้องไม่กระทำสิ่งใดที่อาจก่อให้เกิดความเสียหายแก่เว็บไซต์หรือผู้อื่น
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">7. การเปลี่ยนแปลงข้อตกลง</h2>
          <p className="mt-2 text-black">
            เราขอสงวนสิทธิ์ในการปรับเปลี่ยนข้อตกลงนี้ตามความเหมาะสม และจะแจ้งให้ผู้ใช้งานทราบผ่านเว็บไซต์
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-600">8. การติดต่อ</h2>
          <p className="mt-2 text-black">
            หากคุณมีคำถามเกี่ยวกับข้อตกลงนี้ กรุณาติดต่อเราที่{" "}
            <Link href="/contact" className="text-pink-600 hover:underline">
              หน้าติดต่อเรา
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
