"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { register } from "@/services/authService";
import { UserRequest } from "@/types/authTypes";

interface RegisterFormProps {
  setActiveModal: React.Dispatch<
    React.SetStateAction<"login" | "register" | null>
  >;
}

export default function RegisterForm({ setActiveModal }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    roleId: "3",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    citizenId: "",
    zipcode: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setErrorMessage("");

    const finalFormData: UserRequest = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      citizenId: formData.citizenId,
      address: formData.address,
      roleId: Number(formData.roleId),
    };

    try {
      await register(finalFormData);

      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        text: "คุณสามารถเข้าสู่ระบบได้ทันที",
        confirmButtonText: "ตกลง",
      }).then(() => {
        setActiveModal("login");
      });
    } catch (err: unknown) {
      let errorMessage = "ไม่สามารถสมัครสมาชิกได้";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="h-full max-h-[80vh] overflow-y-auto px-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> บทบาท:
          </label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          >
            <option value="3">Bidder</option>
            <option value="4">Seller</option>
          </select>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> อีเมล์:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> ชื่อจริง:
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> นามสกุล:
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> รหัสผ่าน:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> ยืนยันรหัสผ่าน:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> เพศ:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          >
            <option value="">เลือกเพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่น ๆ</option>
          </select>
        </div>

        {/* phone_number */}
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> เบอร์โทรศัพท์:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="เบอร์โทรศัพท์"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* ID Card */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> เลขบัตรประชาชน:
          </label>
          <input
            type="text"
            name="citizenId"
            placeholder="เลขบัตรประชาชน"
            value={formData.citizenId}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-white mb-1">
            <span className="text-red-500">*</span> ที่อยู่:
          </label>
          <input
            type="text"
            name="address"
            placeholder="ที่อยู่"
            value={formData.address}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#6a0dad] to-[#9b59b6] hover:from-[#9b59b6] hover:to-pink-400 w-full text-white font-bold py-3 rounded-full transition duration-300 mt-4"
          >
            สมัครสมาชิก
          </button>
        </div>
      </form>

      <p className="text-center text-white text-sm mt-6">
        มีบัญชีอยู่แล้ว?{" "}
        <button
          type="button"
          onClick={() => setActiveModal("login")}
          className="text-pink-300 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
