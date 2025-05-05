"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useProduct } from "@/hooks/useProduct";
import { ProductQueryParams } from "@/types/productTypes";

const PRODUCTS_PER_PAGE = 2;

export default function ProductPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const categoryFilter = searchParams.get("category_id") || "";

  const params = useMemo<ProductQueryParams>(
    () => ({
      search: searchTerm,
      category_id: categoryFilter,
      limit: PRODUCTS_PER_PAGE,
      current_page: 1,
      order_by: "id",
      order: "desc",
    }),
    [searchTerm, categoryFilter]
  );

  const { products, loading, error, pagination, goToPage } = useProduct(params);

  return (
    <div className="bg-gradient-to-b from-[#1f0a38] via-[#3d1e5e] to-[#1f0a38] p-8">
      <h2 className="text-center text-3xl font-bold text-white mb-6">
        All Products
      </h2>
      <div className="h-1 w-24 bg-[#8e44ad] mx-auto rounded-full mb-10" />

      {(searchTerm || categoryFilter) && (
        <div className="text-center text-white mb-4">
          <p>
            Showing results for: <strong>{searchTerm || "All"}</strong>{" "}
            {categoryFilter && <span>(Category: {categoryFilter})</span>}
          </p>
        </div>
      )}

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-white">
          No products found matching your criteria.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination pagination={pagination} goToPage={goToPage} />
        </>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const handleProductClick = (id: number) => {
    router.push(`/product-detail?id=${id}`);
  };

  return (
    <div
      onClick={() => handleProductClick(product.id)}
      className="cursor-pointer bg-[#3d2075] border border-[#8e44ad] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
    >
      <div className="h-40 bg-[#4c2882] mb-4 rounded" />
      <h3 className="font-semibold text-white text-lg">
        Product #{product.id}
      </h3>
      <p className="text-sm text-gray-400 mt-1">{product.name}</p>
      <p className="text-[#f4c2c2] font-bold mt-3">${product.actualPrice}</p>
    </div>
  );
}

function Pagination({
  pagination,
  goToPage,
}: {
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  goToPage: (page: number) => void;
}) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10 space-x-2">
      <button
        disabled={pagination.currentPage === 1}
        onClick={() => goToPage(pagination.currentPage - 1)}
        className="px-4 py-2 bg-[#8e44ad] text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded ${
              pagination.currentPage === page
                ? "bg-white text-[#8e44ad] font-bold"
                : "bg-[#8e44ad] text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={pagination.currentPage === pagination.totalPages}
        onClick={() => goToPage(pagination.currentPage + 1)}
        className="px-4 py-2 bg-[#8e44ad] text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
