"use client";

import { useState, useMemo, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product, ProductQueryParams } from "@/types/productTypes";
import { useProduct } from "@/hooks/useProduct";
import { getUserIdFromToken } from "@/utils/authUtils";

export default function SellerCentre() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Product["status"]>(
    "all"
  );

  // const filteredProducts: Product[] = mockProducts.filter((product) => {
  //   const matchSearch = product.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchStatus =
  //     statusFilter === "all" || product.status === statusFilter;
  //   return matchSearch && matchStatus;
  // });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);
    }
  }, [userId]);

  const params = useMemo<ProductQueryParams>(
    () => ({
      seller_id: userId ?? undefined,
      current_page: 1,
      limit: 12,
      order_by: "id",
      order: "desc",
    }),
    []
  );
  const { products } = useProduct(params);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-10 px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Seller Centre</h1>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200 whitespace-nowrap"
          >
            <PlusCircle size={20} />
            เพิ่มสินค้าของฉัน
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-1 items-center border border-purple-300 rounded-md overflow-hidden bg-white shadow-sm">
            {/* ช่องค้นหา */}
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none"
            />

            {/* ฟิลเตอร์สถานะ */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-gray-900 bg-white border-l border-purple-200 focus:outline-none"
            >
              <option value="all">ทั้งหมด</option>
              <option value="active">กำลังดำเนินการ</option>
              <option value="completed">สิ้นสุดแล้ว</option>
              <option value="pending">รอจัดส่ง</option>
              <option value="shipping">กำลังจัดส่ง</option>
            </select>

            {/* ปุ่มค้นหา */}
            <button
              onClick={() => {
                console.log(
                  "Searching:",
                  searchTerm,
                  "with filter:",
                  statusFilter
                );
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductClick={() =>
                console.log(`Product ID: ${product.id}`)
              }
            />
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-200">
              ไม่พบสินค้าที่ตรงกับเงื่อนไข
            </div>
          )}
        </div>
      </div>
      {showAddProductModal && (
        <AddProductModal onClose={() => setShowAddProductModal(false)} />
      )}
    </div>
  );
}

export function AddProductModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-900 rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">เพิ่มสินค้าใหม่</h2>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="number"
            placeholder="ราคา"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <textarea
            placeholder="รายละเอียดสินค้า"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              // TODO: handleSubmit();
              onClose();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
