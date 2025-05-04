'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AdminAuctionManagement() {
  const [approvedProducts, setApprovedProducts] = useState([
    {
      id: 1,
      name: 'โมเดล Gundam RX-78',
      category: 'model',
      status: 'active',
      priceStart: 1000,
      highestBid: 1200,
    },
  ]);

  const [pendingProducts, setPendingProducts] = useState([
    {
      id: 2,
      name: 'ฟิกเกอร์ Luffy',
      category: 'figurine',
      status: 'pending',
      priceStart: 800,
    },
  ]);

  const handleApprove = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'ยืนยันการอนุมัติ?',
      text: 'คุณต้องการอนุมัติสินค้านี้หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่, อนุมัติ',
      cancelButtonText: 'ยกเลิก',
    });

    if (confirm.isConfirmed) {
      const product = pendingProducts.find((p) => p.id === id);
      if (!product) return;

      setApprovedProducts([
        ...approvedProducts,
        {
          ...product,
          status: 'upcoming',
          highestBid: 0,
        },
      ]);
      setPendingProducts(pendingProducts.filter((p) => p.id !== id));
      Swal.fire('อนุมัติสำเร็จ!', '', 'success');
    }
  };

  const handleReject = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'ปฏิเสธสินค้านี้?',
      text: 'คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ปฏิเสธ',
      cancelButtonText: 'ยกเลิก',
    });

    if (confirm.isConfirmed) {
      setPendingProducts(pendingProducts.filter((p) => p.id !== id));
      Swal.fire('ปฏิเสธเรียบร้อย', '', 'success');
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'ลบสินค้านี้?',
      text: 'เมื่อทำการลบแล้วจะไม่สามารถกู้คืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
    });

    if (confirm.isConfirmed) {
      setApprovedProducts(approvedProducts.filter((p) => p.id !== id));
      Swal.fire('ลบเรียบร้อยแล้ว', '', 'success');
    }
  };

  const handleDeletePending = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'ลบสินค้าที่รออนุมัติ?',
      text: 'คุณต้องการลบสินค้านี้จากรายการรออนุมัติหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
    });

    if (confirm.isConfirmed) {
      setPendingProducts(pendingProducts.filter((p) => p.id !== id));
      Swal.fire('ลบรายการแล้ว', '', 'success');
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">จัดการสินค้าสำหรับประมูล</h1>

      {/* รายการรออนุมัติ */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">รายการสินค้ารออนุมัติ</h2>
        <table className="w-full table-auto bg-[#2d1459] rounded-md overflow-hidden">
          <thead className="bg-yellow-700 text-white">
            <tr>
              <th className="p-3">ชื่อ</th>
              <th className="p-3">หมวดหมู่</th>
              <th className="p-3">ราคาเริ่มต้น</th>
              <th className="p-3">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((p) => (
              <tr key={p.id} className="text-center border-b border-purple-700">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">{p.priceStart}</td>
                <td className="p-2 flex gap-2 justify-center flex-wrap">
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    อนุมัติ
                  </button>
                  <button
                    onClick={() => handleReject(p.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    ปฏิเสธ
                  </button>
    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* รายการที่อนุมัติแล้ว */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">สินค้าที่ผ่านการอนุมัติ</h2>
        <table className="w-full table-auto bg-[#2d1459] rounded-md overflow-hidden">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="p-3">ชื่อ</th>
              <th className="p-3">หมวดหมู่</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3">ราคาเริ่ม</th>
              <th className="p-3">ราคาสูงสุด</th>
              <th className="p-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {approvedProducts.map((p) => (
              <tr key={p.id} className="text-center border-b border-purple-700">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2">{p.priceStart}</td>
                <td className="p-2">{p.highestBid}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
