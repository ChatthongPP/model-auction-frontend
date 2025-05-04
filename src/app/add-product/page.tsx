"use client";

import * as React from "react";
import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return "กรุณากรอกชื่อสินค้า";
    }
    if (form.price <= 0) {
      return "ราคาต้องมากกว่า 0";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
      }

      setSuccess("เพิ่มสินค้าสำเร็จ!");
      setForm({ name: "", price: 0, description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-10 px-4 text-white">
      <div className="max-w-2xl mx-auto bg-[#2d1459] p-8 rounded-xl shadow-2xl border border-purple-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-300 drop-shadow">
          เพิ่มสินค้าใหม่
        </h1>

        {error && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4 text-sm font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-pink-200">
              ชื่อสินค้า
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#3a1d70] text-white border border-purple-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1 font-semibold text-pink-200">
              ราคาเริ่มต้น (บาท)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full bg-[#3a1d70] text-white border border-purple-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
              min="1"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-semibold text-pink-200">
              รายละเอียดสินค้า
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-[#3a1d70] text-white border border-purple-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังเพิ่ม..." : "เพิ่มสินค้า"}
          </button>
        </form>
      </div>
    </div>
  );
}
