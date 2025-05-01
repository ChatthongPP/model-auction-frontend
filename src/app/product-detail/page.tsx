"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  seller: string;
  sellerRating: number;
  startDate: string;
  endDate: string;
  autoExtend: boolean;
  bidderCount: number;
  bidHistory: { user: string; price: number; time: string }[];
}

const mockProduct: ProductDetail = {
  id: 1,
  name: "onepiece",
  description: "ตะมุตะมิ",
  price: 4455,
  images: ["/onepiece.png", "/onepiece2.png", "/onepiece3.png"],
  seller: "duggud555",
  sellerRating: 4.7,
  startDate: "2025-04-25T12:00:00Z",
  endDate: "2025-04-30T18:00:00Z",
  autoExtend: true,
  bidderCount: 13,
  bidHistory: [
    { user: "a***z", price: 4400, time: "29 เม.ย. 2025 19:34" },
    { user: "p***s", price: 4300, time: "28 เม.ย. 2025 17:12" },
    { user: "r***r", price: 4200, time: "27 เม.ย. 2025 12:03" },
  ],
};

function formatRemainingTime(end: string) {
  const now = new Date();
  const endTime = new Date(end);
  const diff = endTime.getTime() - now.getTime();

  if (diff <= 0) return "หมดเวลา";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours} ชม. ${minutes} นาที ${seconds} วินาที`;
}

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "1";
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ ย้ายมาไว้ใน component

  useEffect(() => {
    setProduct(mockProduct);
    setMainImageIndex(0);
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (product) {
        setRemainingTime(formatRemainingTime(product.endDate));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [product]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ภาพสินค้าและประมูล */}
        <div className="lg:col-span-2 space-y-6">
          {/* รูปภาพสินค้า */}
          <div>
            <img
              src={product.images[mainImageIndex]}
              alt={product.name}
              className="w-full h-auto rounded-xl border border-gray-600"
            />
            <div className="flex mt-4 gap-2">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`w-16 h-16 object-cover rounded border cursor-pointer ${
                    i === mainImageIndex ? "ring-2 ring-purple-400" : ""
                  }`}
                  onClick={() => setMainImageIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* รายละเอียดสินค้า */}
          <div className="bg-[#2d1a48] p-6 rounded-xl space-y-3">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-[#f4c2c2] font-bold text-xl">
              ฿{product.price.toLocaleString()}
            </p>
            <p className="text-gray-300">{product.description}</p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-200">
              <p>
                <span className="font-semibold">วันที่ลงประมูล:</span>
                <br />
                {new Date(product.startDate).toLocaleString("th-TH")}
              </p>
              <p>
                <span className="font-semibold">วันสิ้นสุด:</span>
                <br />
                {new Date(product.endDate).toLocaleString("th-TH")}
              </p>
              <p>
                <span className="font-semibold">เวลาคงเหลือ:</span>
                <br />
                <span className="text-yellow-300">{remainingTime}</span>
              </p>
              <p>
                <span className="font-semibold">ต่อเวลาอัตโนมัติ:</span>
                <br />
                {product.autoExtend ? "✅ มี" : "❌ ไม่มี"}
              </p>
              <p>
                <span className="font-semibold">ผู้เข้าร่วมประมูล:</span>
                <br />
                {product.bidderCount.toLocaleString()} คน
              </p>
              <p>
                <span className="font-semibold">สถานะ:</span>
                <br />
                <span className="text-green-400">กำลังประมูล</span>
              </p>
            </div>

            {/* ปุ่มประมูล */}
            <button
              className="mt-6 px-6 py-2 bg-[#8e44ad] text-white rounded hover:bg-purple-700 transition w-full"
              onClick={() => setIsPopupOpen(true)}
            >
              เข้าร่วมประมูล
            </button>

            {/* Popup */}
            {isPopupOpen && (
              <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-black">
                  <h2 className="text-lg font-semibold mb-2">ประมูล</h2>
                  <p className="text-sm text-gray-600">
                    ชื่อสินค้า: onepiece
                  </p>
                  

                  <div className="mt-4">
                    <p className="font-semibold text-red-600">
                      เวลาคงเหลือ: 0 วัน 01:33:32
                    </p>
                    <p>
                      ข้อมูลผู้ขาย:{" "}
                      <span className="text-blue-600">duggud555</span> 
                    </p>
                    <p className="text-sm mt-2">จำนวนแต้มเครดิตตวามน่าเชื่อถือ : 3 </p>
                    <p className="text-sm mt-2">ราคาปัจจุบัน: 4400 บาท</p>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      จำนวนเงินที่ต้องการประมูล
                    </label>
                    <input
                      type="number"
                      placeholder="เช่น 179500"
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div className="mt-4 text-sm text-gray-700">
                  <p>ราคาสินค้ารวมภาษึ : 4400 </p>
                    <p>ค่าบริการ: 3%</p>
                    <p>ค่าจัดส่ง: 35 บาท</p>
                    <p className="font-semibold text-green-600">
                      รวมทั้งหมด: 196,553 บาท
                    </p>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      ยกเลิก
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                      ยืนยันการประมูล
                    </button>
                  </div>

                  <p className="text-xs text-center text-gray-400 mt-4">
                    หน้านี้จะรีเฟรชอัตโนมัติใน 30 วินาที
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ประวัติการประมูล */}
          <div className="bg-[#2d1a48] p-6 rounded-xl mt-8">
            <h2 className="text-2xl font-semibold mb-4">ประวัติการประมูล</h2>
            <div className="space-y-2 text-sm">
              {product.bidHistory.map((bid, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-gray-600 pb-2"
                >
                  <span>{bid.user}</span>
                  <span>฿{bid.price.toLocaleString()}</span>
                  <span className="text-gray-400">{bid.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* การ์ดผู้ขาย */}
        <div className="bg-[#2d1a48] p-6 rounded-xl h-fit shadow-lg">
          <h2 className="text-xl font-bold mb-4">ข้อมูลผู้ขาย</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">ชื่อผู้ขาย:</span>{" "}
              {product.seller}
            </p>
            <p>
              <span className="font-semibold">คะแนน:</span> ⭐{" "}
              {product.sellerRating.toFixed(1)} / 5.0
            </p>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition">
              ดูสินค้าอื่นจากร้านนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
