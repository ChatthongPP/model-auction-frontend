'use client';

import { useState, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';


const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), { ssr: false });

interface Product {
  id: number;
  name: string;
  category: string;
  priceStart: number;
  highestBid?: number;
}

export default function AdminAuctionManagement() {
  const [approvedProducts, setApprovedProducts] = useState<Product[]>([
    { id: 1, name: 'โมเดล Gundam RX-78', category: 'model', priceStart: 1000, highestBid: 1200 },
  ]);
  const [pendingProducts, setPendingProducts] = useState<Product[]>([
    { id: 2, name: 'ฟิกเกอร์ Luffy', category: 'figurine', priceStart: 800 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const [approvedRes, pendingRes] = await Promise.all([
          fetch('/api/products/approved', { next: { revalidate: 60 } }),
          fetch('/api/products/pending', { next: { revalidate: 60 } }),
        ]);

        if (!approvedRes.ok || !pendingRes.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
        }

        const approvedData = await approvedRes.json();
        const pendingData = await pendingRes.json();
        setApprovedProducts(approvedData);
        setPendingProducts(pendingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = useCallback(async (id: number, name: string) => {
    const confirm = await Swal.fire({
      title: 'ลบสินค้านี้?',
      text: 'เมื่อทำการลบแล้วจะไม่สามารถกู้คืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded',
      },
    });

    if (confirm.isConfirmed) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการลบสินค้า');
        }

        setApprovedProducts((prev) => prev.filter((p) => p.id !== id));
        setPendingProducts((prev) => prev.filter((p) => p.id !== id));
        Swal.fire('ลบเรียบร้อยแล้ว', '', 'success');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleApprove = useCallback(async (id: number, product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการอนุมัติสินค้า');
      }

      setPendingProducts((prev) => prev.filter((p) => p.id !== id));
      setApprovedProducts((prev) => [...prev, { ...product, highestBid: 0 }]);
      Swal.fire('อนุมัติสินค้าเรียบร้อย', '', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReject = useCallback(async (id: number, name: string) => {
    const confirm = await Swal.fire({
      title: 'ปฏิเสธสินค้านี้?',
      text: 'สินค้าจะถูกลบออกจากรายการรออนุมัติ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ปฏิเสธ',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded',
      },
    });

    if (confirm.isConfirmed) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products/${id}/reject`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' }),
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการปฏิเสธสินค้า');
        }

        setPendingProducts((prev) => prev.filter((p) => p.id !== id));
        Swal.fire('ปฏิเสธสินค้าเรียบร้อย', '', 'success');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  // CSV headers
  const headers = [
    { label: 'ชื่อสินค้า', key: 'name' },
    { label: 'หมวดหมู่', key: 'category' },
    { label: 'ราคาเริ่มต้น', key: 'priceStart' },
    { label: 'ราคาสูงสุด', key: 'highestBid' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">จัดการสินค้าสำหรับประมูล</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {isLoading && (
        <div className="text-gray-600 mb-4">กำลังโหลด...</div>
      )}

      {/* รายงาน CSV */}
      <div className="mb-4">
        <CSVLink
          data={approvedProducts}
          headers={headers}
          filename="approved_products_report.csv"
          className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600"
          aria-label="ดาวน์โหลดรายงาน CSV"
        >
          ดาวน์โหลดรายงาน (CSV)
        </CSVLink>
      </div>

      
      
      {/* สินค้าที่ได้รับการอนุมัติ */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">สินค้าที่ได้รับการอนุมัติ</h2>
        {approvedProducts.length === 0 ? (
          <p className="text-gray-600">ไม่มีสินค้าที่ได้รับการอนุมัติ</p>
        ) : (
          <table
            className="w-full table-auto bg-white rounded-md shadow-md overflow-hidden"
            role="grid"
            aria-describedby="approved-products-table"
          >
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="p-3" scope="col">ชื่อ</th>
                <th className="p-3" scope="col">หมวดหมู่</th>
                <th className="p-3" scope="col">ราคาเริ่มต้น</th>
                <th className="p-3" scope="col">ราคาสูงสุด</th>
                <th className="p-3" scope="col">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {approvedProducts.map((p) => (
                <tr key={p.id} className="text-center border-b border-gray-200">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{p.priceStart.toLocaleString()}</td>
                  <td className="p-2">{p.highestBid?.toLocaleString()}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      aria-label={`ลบสินค้า ${p.name}`}
                      disabled={isLoading}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
