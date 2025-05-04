"use client";

import { useState, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  status: string;
}

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "One Piece",
      price: 1200,
      status: "กำลังรออนุมัติ",
    },
    {
      id: 2,
      name: "Gundam",
      price: 4500,
      status: "เปิดประมูลอยู่",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = useCallback(async (id: number, name: string) => {
    if (!confirm(`ยืนยันการลบสินค้า "${name}"?`)) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดในการลบสินค้า");
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
      setSuccess(`ลบสินค้า "${name}" สำเร็จ`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEdit = useCallback((id: number) => {
    alert(`แก้ไขสินค้า ID: ${id}`);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-10 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-[#2d1459] p-6 rounded-xl shadow-2xl border border-purple-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-300 drop-shadow">
          สินค้าของฉัน
        </h1>

        {error && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4 text-sm font-medium">
            {success}
          </div>
        )}

        {products.length === 0 ? (
          <p className="text-gray-300 text-center">ไม่มีสินค้าในขณะนี้</p>
        ) : (
          <div className="space-y-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#3a1d70] p-5 rounded-lg border border-purple-500 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-pink-200">
                      {product.name}
                    </h2>
                    <p className="text-sm text-pink-100">
                      ราคาเริ่มต้น: ฿{product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-white">{product.status}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                      aria-label={`แก้ไขสินค้า ${product.name}`}
                      disabled={isLoading}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      aria-label={`ลบสินค้า ${product.name}`}
                      disabled={isLoading}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
