import { uploadFile } from "@/services/fileService";
import { createProduct } from "@/services/productService";
import { ProductDB } from "@/types/productTypes";
import { convertToUTC } from "@/utils/common";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddProductModal({
  onClose,
  sellerId,
}: {
  onClose: () => void;
  sellerId: number;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: 1,
    seller_id: sellerId,
    actual_price: 0,
    starting_bid_price: 0,
    minimum_bid_increment: 0,
    shipping_price: 10,
    service_fee: 0,
    auction_start_time: "",
    auction_end_time: "",
    status: "active",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImages((prev) => {
        const combined = [...prev, ...selectedFiles];
        return combined.slice(0, 3); // จำกัดไม่เกิน 3 รูป
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("price") ||
        name.includes("fee") ||
        name.includes("increment")
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    // อัปโหลดไฟล์ภาพทั้งหมด
    const imageUploadPromises = images.map((file) => {
      return uploadFile("product", file);
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const validImageUrls: string[] = imageUrls.filter(
      (url): url is string => url !== null
    );

    const finalFormData: ProductDB = {
      name: formData.name,
      description: formData.description,
      category_id: Number(formData.category_id),
      seller_id: formData.seller_id,
      actual_price: formData.actual_price,
      starting_bid_price: formData.starting_bid_price,
      minimum_bid_increment: formData.minimum_bid_increment,
      shipping_price: formData.shipping_price,
      service_fee: formData.service_fee,
      auction_start_time: convertToUTC(formData.auction_start_time),
      auction_end_time: convertToUTC(formData.auction_end_time),
      status: formData.status,
      image: validImageUrls,
    };

    try {
      await createProduct(finalFormData);

      Swal.fire({
        icon: "success",
        title: "สร้างสินค้าเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 2000,
      });
      onClose();
    } catch (err: unknown) {
      console.error("Error creating product:", err);

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถสร้างสินค้าได้ กรุณาลองใหม่",
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-900 rounded-xl shadow-xl w-full max-w-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">เพิ่มสินค้าใหม่</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">ชื่อสินค้า</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">หมวดหมู่</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white text-gray-900"
            >
              <option value={1}>Model</option>
              <option value={2}>Art Toy</option>
              <option value={3}>Figure</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">ราคาจริง</label>
            <input
              name="actual_price"
              type="number"
              value={formData.actual_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">ราคาเริ่มต้นประมูล</label>
            <input
              name="starting_bid_price"
              type="number"
              value={formData.starting_bid_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">ขั้นต่ำเพิ่มราคา</label>
            <input
              name="minimum_bid_increment"
              type="number"
              value={formData.minimum_bid_increment}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">ค่าจัดส่ง</label>
            <input
              name="shipping_price"
              type="number"
              value={formData.shipping_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">เวลาเริ่มประมูล</label>
            <input
              name="auction_start_time"
              type="datetime-local"
              value={formData.auction_start_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">เวลาสิ้นสุดประมูล</label>
            <input
              name="auction_end_time"
              type="datetime-local"
              value={formData.auction_end_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">รายละเอียดสินค้า</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            อัปโหลดรูปภาพ (สูงสุด 3 รูป)
          </label>
          <div className="relative border border-dashed border-gray-300 rounded-md p-4 text-center hover:border-purple-500 transition">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              คลิกหรือลากรูปภาพมาวางที่นี่ (รองรับสูงสุด 3 รูป)
            </p>
          </div>

          {images.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap">
              {images.map((image, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    title="ลบรูปนี้"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            บันทึกสินค้า
          </button>
        </div>
      </div>
    </div>
  );
}
