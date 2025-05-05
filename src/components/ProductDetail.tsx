"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/productTypes";
import { Bid } from "@/types/bidTypes"; // Adjust the path if necessary
import { getUserIdFromToken } from "@/utils/authUtils";
import { createBid } from "@/services/bidService";

interface Props {
  product: Product;
  onSubmitBidSuccess: () => void;
}

export default function ProductDetail({
  product,
  onSubmitBidSuccess,
}: Readonly<Props>) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const end = new Date(product.auctionEndTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setRemainingTime("หมดเวลาแล้ว");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(`${hours} ชม. ${minutes} นาที ${seconds} วินาที`);
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [product.auctionEndTime]);

  useEffect(() => {
    const basePrice = product.currentBidPrice ?? product.startingBidPrice;
    const serviceFee = basePrice * (product.serviceFee / 100);
    const shipping = product.shippingPrice;
    setTotalPrice(Math.round(basePrice + serviceFee + shipping));
    setBidAmount(basePrice + product.minimumBidIncrement);
  }, [product]);

  const isValidBid = (bidAmount: number) => {
    const currentPrice = product.currentBidPrice ?? product.startingBidPrice;
    return bidAmount >= currentPrice + product.minimumBidIncrement;
  };

  const submitBid = async (bidAmount: number) => {
    if (!isValidBid(bidAmount)) {
      alert(
        `จำนวนเงินที่ต้องการประมูลต้องมากกว่า ${
          (product.currentBidPrice ?? product.startingBidPrice) +
          product.minimumBidIncrement
        }`
      );
      return;
    }

    const authToken = localStorage.getItem("authToken");
    const userId = authToken ? getUserIdFromToken(authToken) : null;
    if (!userId) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการประมูล");
      return;
    }

    const bidData: Bid = {
      productId: product.id,
      userId: userId,
      bidAmount: bidAmount,
    };

    try {
      await createBid(bidData);
      setIsPopupOpen(false);
      onSubmitBidSuccess();
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("ไม่สามารถประมูลได้ กรุณาลองใหม่อีกครั้ง");
    }

    console.log("Bid placed successfully!");
  };

  return (
    <div className="bg-[#2d1a48] p-6 rounded-xl space-y-3 text-white">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-[#f4c2c2] font-bold text-xl">
        ฿{product.actualPrice.toLocaleString()}
      </p>
      <p className="text-gray-300">{product.description}</p>

      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-200">
        <p>
          <span className="font-semibold">วันที่ลงประมูล:</span>
          <br />
          {new Date(product.auctionStartTime).toLocaleString("th-TH")}
        </p>
        <p>
          <span className="font-semibold">วันสิ้นสุด:</span>
          <br />
          {new Date(product.auctionEndTime).toLocaleString("th-TH")}
        </p>
        <p>
          <span className="font-semibold">เวลาคงเหลือ:</span>
          <br />
          <span className="text-yellow-300">{remainingTime}</span>
        </p>
        <p>
          <span className="font-semibold">สถานะ:</span>
          <br />
          <span className="text-green-400">{product.status}</span>
        </p>
        <p>
          <span className="font-semibold">หมวดหมู่:</span>
          <br />#{product.categoryId}
        </p>
        <p>
          <span className="font-semibold">ผู้ขาย:</span>
          <br />
          ID: {product.sellerId}
        </p>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-[#8e44ad] text-white rounded hover:bg-purple-700 transition w-full"
        onClick={() => setIsPopupOpen(true)}
      >
        เข้าร่วมประมูล
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-black">
            <h2 className="text-lg font-semibold mb-2">ประมูล</h2>
            <p className="text-sm text-gray-600">ชื่อสินค้า: {product.name}</p>

            <div className="mt-4">
              <p className="font-semibold text-red-600">
                เวลาคงเหลือ: {remainingTime}
              </p>
              <p>
                ชื่อผู้ขาย:{" "}
                <span className="text-blue-600">{product.sellerName}</span>
              </p>
              <p className="text-sm mt-2">
                ราคาปัจจุบัน: ฿
                {product.currentBidPrice ?? product.startingBidPrice}
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                จำนวนเงินที่ต้องการประมูล
              </label>
              <input
                type="number"
                placeholder={`อย่างน้อย +${product.minimumBidIncrement}`}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setBidAmount(Number(e.target.value))}
                value={bidAmount}
              />
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p>ค่าบริการ: {product.serviceFee}%</p>
              <p>ค่าจัดส่ง: ฿{product.shippingPrice}</p>
              <p className="font-semibold text-green-600">
                รวมทั้งหมด: ฿{totalPrice.toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                ยกเลิก
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                onClick={() => submitBid(bidAmount)}
              >
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
  );
}
