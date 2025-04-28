"use client";

export default function ProductPreview() {
  const categories = [
    { id: 1, name: "โมเดล", image: "/model.jpg" },
    { id: 2, name: "ฟิกเกอร์", image: "/arttoy.png" },
    { id: 3, name: "อาร์ททอย", image: "/figur.jpg" },
  ];

  return (
    <section className="flex flex-col">

      {/* หมวดหมู่สินค้า */}
      <div className="py-12 px-4 bg-gradient-to-b from-[#2d1459] to-[#3d2075] text-white">
        <h2 className="text-3xl font-semibold mb-4 text-center">หมวดหมู่สินค้า</h2>
        <div className="h-1 bg-pink-300 w-24 mx-auto mb-8 rounded-full"></div>

        <div className="flex justify-center gap-6 flex-wrap mb-10">
          {categories.map((cat) => (
            <div key={cat.id} className="w-28 text-center">
              <div className="w-28 h-28 bg-[#4b2991] text-white rounded-full overflow-hidden mx-auto shadow-lg hover:shadow-2xl transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 font-semibold text-[#f4c2c2]">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* สินค้าแนะนำ */}
      <div className="py-12 px-4 bg-gradient-to-b from-[#3d2075] to-[#4b2991] text-white">
        <h2 className="text-3xl font-semibold mb-4 text-center">สินค้าแนะนำ</h2>
        <div className="h-1 bg-pink-300 w-24 mx-auto mb-8 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-[#5c32a3] border border-pink-300 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="h-40 bg-[#7046b6] mb-3 rounded" />
              <h3 className="font-semibold text-white">Product #{id}</h3>
              <p className="text-sm text-gray-300">
                This is a brief description.
              </p>
              <p className="text-pink-300 font-bold mt-2">$99.00</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
