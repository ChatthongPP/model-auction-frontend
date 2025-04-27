"use client";

export default function ProductPreview() {
  const categories = [
    { id: 1, name: "โมเดล", image: "/model.jpg" },
    { id: 2, name: "ฟิกเกอร์", image: "/arttoy.png" },
    { id: 3, name: "อาร์ททอย", image: "/figur.jpg" },
  ];

  return (
    <section className="py-10 px-4">
      
      {/* หมวดหมู่สินค้า */}
      <h2 className="text-2xl font-semibold mb-6 text-center">หมวดหมู่สินค้า</h2>
      <div className="flex justify-center gap-6 flex-wrap mb-10">
        {categories.map((cat) => (
          <div key={cat.id} className="w-28 text-center">
            <div className="w-28 h-28 bg-gray-200 text-white rounded-full overflow-hidden mx-auto shadow hover:shadow-lg transition">
              <img
                src={cat.image}
                alt={cat.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-2 font-semibold text-white">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* สินค้าแนะนำ */}
      <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="border p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-200 mb-3 rounded" />
            <h3 className="font-semibold">Product #{id}</h3>
            <p className="text-sm text-gray-600">
              This is a brief description.
            </p>
            <p className="text-blue-600 font-bold mt-2">$99.00</p>
          </div>
        ))}
      </div>

    </section>
  );
}
