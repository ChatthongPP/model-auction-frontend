"use client";
import { useCategory } from "@/hooks/useCategory";
import { useProduct } from "@/hooks/useProduct";
import { ProductQueryParams } from "@/types/productTypes";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ProductCard from "./ProductCard";
// import ProductCard from "./ProductCard";

export default function ProductPreview() {
  console.log("products");
  const router = useRouter();
  const { categories } = useCategory();

  const params = useMemo<ProductQueryParams>(
    () => ({
      current_page: 1,
      limit: 12,
      order_by: "id",
      order: "desc",
    }),
    []
  );
  const { products } = useProduct(params);

  const handleCategoryClick = (id: number) => {
    router.push(`/product?category_id=${id}`);
  };

  const handleProductClick = (id: number) => {
    router.push(`/product-detail?id=${id}`);
  };

  return (
    <>
      <div className="h-2 bg-[#8e44ad] mx-auto rounded-full" />
      <section className="py-10 px-4 bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] text-white">
        <h2 className="text-3xl font-bold mb-2 text-center">หมวดหมู่สินค้า</h2>
        <div className="h-1 w-24 bg-[#8e44ad] mx-auto rounded-full mb-10"></div>

        <div className="flex justify-center gap-6 flex-wrap mb-16">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="w-28 text-center focus:outline-none"
              aria-label={`View products in ${cat.name} category`}
            >
              <div className="w-28 h-28 bg-[#3d2075] text-white rounded-full overflow-hidden mx-auto shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-3 font-semibold text-gray-300">{cat.name}</p>
            </button>
          ))}
        </div>

        {/* สินค้าแนะนำ */}
        <h2 className="text-3xl font-bold mb-2 text-center">สินค้า</h2>
        <div className="h-1 w-24 bg-[#8e44ad] mx-auto rounded-full mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                handleProductClick={handleProductClick}
              />
              // <div
              //   key={product.id}
              //   onClick={() => handleProductClick(product.id)}
              //   className="cursor-pointer bg-[#3d2075] border border-[#8e44ad] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              // >
              //   <div className="h-40 bg-[#4c2882] mb-4 rounded" />
              //   <h3 className="font-semibold text-white text-lg">
              //     Product #{product.id}
              //   </h3>
              //   <p className="text-sm text-gray-400 mt-1">{product.name}</p>
              //   <p className="text-[#f4c2c2] font-bold mt-3">
              //     ${product.actualPrice}
              //   </p>
              // </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
