"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import {
  PlusCircle,
  Eye,
  Clock,
  PackageCheck,
  BarChart,
  Banknote,
  Store,
} from "lucide-react";

export default function SellerCentre() {
  const [sellerStats] = useState({
    activeAuctions: 5,
    completedAuctions: 12,
    totalRevenue: 24500,
    pendingPayout: 3500,
  });

  const [showModal, setShowModal] = useState<null | string>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-10 px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* หัวข้อหลัก */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Seller Centre</h1>
          <div className="flex gap-3">
            <Link href="/my-product">
              <button
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200"
                aria-label="ดูสินค้าของฉัน"
              >
                <PlusCircle size={20} />
                สินค้าของฉัน
              </button>
            </Link>
            <Link href="/add-product">
              <button
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200"
                aria-label="เพิ่มสินค้าใหม่"
              >
                <PlusCircle size={20} />
                เพิ่มสินค้าใหม่
              </button>
            </Link>
          </div>
        </div>

        {/* สรุปภาพรวมผู้ขาย */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SummaryCard
            icon={<Clock size={28} />}
            label="ประมูลที่กำลังดำเนินการ"
            value={`${sellerStats.activeAuctions} รายการ`}
          />
          <SummaryCard
            icon={<PackageCheck size={28} />}
            label="สิ้นสุดการประมูล"
            value={`${sellerStats.completedAuctions} รายการ`}
          />
          <SummaryCard
            icon={<BarChart size={28} />}
            label="ยอดขายรวม"
            value={`฿${sellerStats.totalRevenue.toLocaleString()}`}
          />
          <SummaryCard
            icon={<Banknote size={28} />}
            label="รอโอนเงิน"
            value={`฿${sellerStats.pendingPayout.toLocaleString()}`}
          />
        </div>

        {/* เมนูผู้ขาย */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <SellerMenuButton
            icon={<Eye size={24} />}
            title="รายการที่เปิดประมูล"
            onClick={() => setShowModal("active")}
          />
          <SellerMenuButton
            icon={<PackageCheck size={24} />}
            title="รายการที่สิ้นสุดแล้ว"
            onClick={() => setShowModal("completed")}
          />
          <SellerMenuButton
            icon={<BarChart size={24} />}
            title="ยอดขายรวม"
            onClick={() => setShowModal("revenue")}
          />
          <SellerMenuButton
            icon={<Banknote size={24} />}
            title="การโอนเงิน"
            onClick={() => setShowModal("payout")}
          />
          <SellerMenuButton
            icon={<Store size={24} />}
            title="ไปยังหน้าร้าน"
            onClick={() => setShowModal("shop")}
          />
          <SellerMenuButton
            icon={<Clock size={24} />}
            title="ที่ต้องจัดส่ง"
            onClick={() => setShowModal("pending")}
          />
          <SellerMenuButton
            icon={<PackageCheck size={24} />}
            title="กำลังจัดส่ง"
            onClick={() => setShowModal("shipping")}
          />
          <SellerMenuButton
            icon={<Banknote size={24} />}
            title="คืนเงิน/คืนสินค้า/ยกเลิก"
            onClick={() => setShowModal("refund")}
          />
        </div>

        {/* Popup Modals */}
        <SellerModal
          isOpen={showModal === "active"}
          onClose={() => setShowModal(null)}
          title="รายการที่เปิดประมูล"
        >
          <p>แสดงรายการที่เปิดประมูลอยู่...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "completed"}
          onClose={() => setShowModal(null)}
          title="รายการที่สิ้นสุดแล้ว"
        >
          <p>แสดงรายการที่สิ้นสุดแล้วที่นี่...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "revenue"}
          onClose={() => setShowModal(null)}
          title="ยอดขายรวม"
        >
          <p>สรุปรายได้รวมทั้งหมด...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "payout"}
          onClose={() => setShowModal(null)}
          title="การโอนเงิน"
        >
          <p>แสดงสถานะการโอนเงินให้ผู้ขาย...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "shop"}
          onClose={() => setShowModal(null)}
          title="หน้าร้านของคุณ"
        >
          <p>ตัวอย่างหน้าร้านของคุณ...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "pending"}
          onClose={() => setShowModal(null)}
          title="รายการที่ต้องจัดส่ง"
        >
          <p>แสดงรายการสินค้าที่ต้องจัดส่งที่นี่...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "shipping"}
          onClose={() => setShowModal(null)}
          title="รายการกำลังจัดส่ง"
        >
          <p>แสดงสถานะการจัดส่งที่นี่...</p>
        </SellerModal>

        <SellerModal
          isOpen={showModal === "refund"}
          onClose={() => setShowModal(null)}
          title="คืนเงิน/คืนสินค้า/ยกเลิก"
        >
          <p>แสดงคำขอคืนสินค้า ยกเลิก หรือคืนเงินที่นี่...</p>
        </SellerModal>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-gray-800 flex flex-col gap-2">
      <div className="flex items-center gap-3 text-purple-600">{icon}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

function SellerMenuButton({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-[#2d1a48] rounded-xl p-6 flex items-center gap-4 hover:bg-purple-700 transition text-left"
    >
      <div className="text-white">{icon}</div>
      <span className="text-lg font-medium text-white">{title}</span>
    </button>
  );
}

function SellerModal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                  {title}
                </Dialog.Title>
                <div className="text-gray-700">{children}</div>
                <div className="mt-6 text-right">
                  <button
                    onClick={onClose}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                  >
                    ปิด
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
