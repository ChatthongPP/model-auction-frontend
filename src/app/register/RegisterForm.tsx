"use client";

import { useState } from "react";

interface RegisterFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<"login" | "register" | null>>;
}

export default function RegisterForm({ setActiveModal }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    idCard: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // เช็ค password กับ confirmPassword
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    // ถ้าตรงกัน
    setErrorMessage(""); // เคลียร์ข้อความ error
    console.log("สมัครสมาชิกข้อมูล:", formData);
    // TODO: ส่งข้อมูลไป backend
  };

  return (
    <div className="h-full max-h-[80vh] overflow-y-auto px-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {/* แสดง error ถ้ามี */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span> อีเมล์:</label>
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
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  ชื่อจริง:</label>
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
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  นามสกุล:</label>
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
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  รหัสผ่าน:</label>
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
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  ยืนยันรหัสผ่าน:</label>
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
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  เพศ:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          >
            <option value="">เลือกเพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่น ๆ</option>
          </select>
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  เบอร์โทรศัพท์:</label>
          <input
            type="tel"
            name="phone"
            placeholder="เบอร์โทรศัพท์"
            value={formData.phone}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Zipcode */}
        <div className="flex flex-col">
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  รหัสไปรษณีย์:</label>
          <input
            type="text"
            name="zipcode"
            placeholder="รหัสไปรษณีย์"
            value={formData.zipcode}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* ID Card */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  เลขบัตรประชาชน:</label>
          <input
            type="text"
            name="idCard"
            placeholder="เลขบัตรประชาชน"
            value={formData.idCard}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-[#FFFFFFFF} mb-1"><span className="text-red-500">*</span>  บ้านเลขที่ / หมู่บ้าน:</label>
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

        {/* Sub-district */}
        <div className="flex flex-col">
          <label className="text-sm text-[#FFFFFFFF} mb-1">แขวง/ตำบล:</label>
          <input
            type="text"
            name="subDistrict"
            placeholder="แขวง/ตำบล"
            value={formData.subDistrict}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
          />
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="text-sm text-[#FFFFFFFF} mb-1">เขต/อำเภอ:</label>
          <input
            type="text"
            name="district"
            placeholder="เขต/อำเภอ"
            value={formData.district}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
          />
        </div>

        {/* Province */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-[#FFFFFFFF} mb-1">จังหวัด:</label>
          <input
            type="text"
            name="province"
            placeholder="จังหวัด"
            value={formData.province}
            onChange={handleChange}
            className="border border-pink-300 rounded-lg px-4 py-2 text-white"
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

      {/* มีบัญชีอยู่แล้ว? */}
      <p className="text-center text-[#FFFFFFFF] text-sm mt-6">
        มีบัญชีอยู่แล้ว?{" "}
        <button
          type="button"
          onClick={() => setActiveModal("login")}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
