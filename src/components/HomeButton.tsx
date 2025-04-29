"use client";

import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/" className="text-2xl font-bold text-white hover:text-pink-300 transition">
      HOME
    </Link>
  );
}
