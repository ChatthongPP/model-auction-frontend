"use client";
import { useRouter } from "next/navigation";

export default function ProductPreview() {
  const router = useRouter();
  const categories = [
    { id: 1, name: "โมเดล", value: "model", image: "/model.jpg" },
    { id: 2, name: "ฟิกเกอร์", value: "figurine", image: "/figur.jpg" },
    { id: 3, name: "อาร์ททอย", value: "arttoy", image: "/arttoy.png" },
  ];

  const handleCategoryClick = (value: string) => {
    router.push(`/product?category=${value}`);
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.value)}
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
          {[...Array(12).keys()].map((i) => {
            const id = i + 1;
            return (
              <div
                key={id}
                onClick={() => handleProductClick(id)}
                className="cursor-pointer bg-[#3d2075] border border-[#8e44ad] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <div className="h-40 bg-[#4c2882] mb-4 rounded" />
                <h3 className="font-semibold text-white text-lg">
                  Product #{id}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  This is a brief description.
                </p>
                <p className="text-[#f4c2c2] font-bold mt-3">$99.00</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
