import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MarketPlace</h1>
      <p className="text-lg text-gray-600 mb-6">
        Buy and sell your favorite items with ease.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
        >
          Register
        </Link>
        <Link
          href="/profile"
          className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
        >
          Profile
        </Link>
      </div>
    </section>
  );
}
