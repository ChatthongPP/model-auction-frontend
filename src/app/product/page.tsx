"use client"; 
import { useSearchParams } from "next/navigation"; 
import { useState, useMemo, useEffect } from "react"; 
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}


const allProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product #${i + 1}`,
  description: "This is a brief description.", 
  price: 99.0 + i, 
  category: ["arttoy", "model", "figurine"][i % 3], 
}));

const PRODUCTS_PER_PAGE = 12; 

export default function ProductPage() {
  const searchParams = useSearchParams(); 
  const searchTerm = searchParams.get("search")?.toLowerCase() || ""; 
  const categoryFilter = searchParams.get("category") || ""; 
  const [currentPage, setCurrentPage] = useState(1); 


  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm, categoryFilter]);

 
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm); // ตรวจสอบว่าชื่อสินค้าตรงกับคำค้นหรือไม่
      const matchesCategory = categoryFilter
        ? product.category === categoryFilter // ถ้ามีหมวดหมู่ ให้เปรียบเทียบ
        : true; // ถ้าไม่มีหมวดหมู่ ถือว่าผ่าน
      return matchesSearch && matchesCategory; // ต้องตรงทั้งสองเงื่อนไข
    });
  }, [searchTerm, categoryFilter]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE); // จำนวนหน้าทั้งหมด
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE, // คำนวณตำแหน่งเริ่มต้นของสินค้าหน้านั้น
    currentPage * PRODUCTS_PER_PAGE // คำนวณตำแหน่งสุดท้าย
  );

  return (
    <div className="bg-gradient-to-b from-[#1f0a38] via-[#3d1e5e] to-[#1f0a38] p-8"> 
      <h2 className="text-center text-3xl font-bold text-white mb-6">
        All Products 
      </h2>
      <div className="h-1 w-24 bg-[#8e44ad] mx-auto rounded-full mb-10"></div> 

      {(searchTerm || categoryFilter) && ( 
        <div className="text-center text-white mb-4">
          <p>
            Showing results for: <strong>{searchTerm || "All"}</strong>{" "}
            {categoryFilter && <span>(Category: {categoryFilter})</span>} 
          </p>
        </div>
      )}

      {filteredProducts.length === 0 ? ( 
        <div className="text-center text-white">
          <p>No products found matching your criteria.</p> 
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"> 
            {paginatedProducts.map((product) => ( // วนลูปแสดงสินค้าตามหน้าปัจจุบัน
             <Link
             href={`/product-detail?id=${product.id}`} // 🔗 ลิงก์ไปยังหน้ารายละเอียด
             key={product.id}
             className="bg-[#3d2075] border border-pink-300 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 block"
           >
             <div className="h-40 bg-[#4c2882] mb-4 rounded" />
             <h3 className="font-semibold text-white text-lg">{product.name}</h3>
             <p className="text-sm text-gray-400 mt-1">{product.description}</p>
             <p className="text-[#f4c2c2] font-bold mt-3">
               ${product.price.toFixed(2)}
             </p>
           </Link>
         ))}
       </div>

          {totalPages > 1 && ( 
            <div className="flex justify-center mt-10 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)} 
                className="px-4 py-2 bg-[#8e44ad] text-white rounded disabled:opacity-50"
                aria-label="Previous page"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-white text-[#8e44ad] font-bold" 
                      : "bg-[#8e44ad] text-white"
                  }`}
                  aria-label={`Page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1} 
                </button>
              ))}
              <button
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage((p) => p + 1)} 
                className="px-4 py-2 bg-[#8e44ad] text-white rounded disabled:opacity-50"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
