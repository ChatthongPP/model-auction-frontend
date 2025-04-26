export default function ProductPreview() {
  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Featured Products
      </h2>
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
