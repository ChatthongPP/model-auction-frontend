"use client";
import BidHistory from "@/components/BidHistory";
import ProductDetail from "@/components/ProductDetail";
import { useBid } from "@/hooks/useBid";
import { useProductById } from "@/hooks/useProductById";
import { BidQueryParams } from "@/types/bidTypes";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
// import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const productId = parseInt(searchParams.get("id") || "1", 10);
  const { product, loading: loadingProductById } = useProductById(productId);
  const params = useMemo<BidQueryParams>(
    () => ({
      current_page: 1,
      limit: 12,
      order_by: "id",
      order: "desc",
      product_id: productId,
    }),
    []
  );
  const { bids, loading: loadingBid, goToPage } = useBid(params);

  const onSubmitBidSuccess = () => {
    goToPage(params.current_page ?? 1);
  };

  // const [remainingTime, setRemainingTime] = useState("");
  // const [mainImageIndex, setMainImageIndex] = useState(0);

  // useEffect(() => {
  //   setMainImageIndex(0);
  // }, [productId]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (product) {
  //       setRemainingTime(formatRemainingTime(product.endDate));
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [product]);

  if (loadingProductById || loadingBid) return <p>Loading...</p>;
  // if (notFound) return <p>ไม่พบสินค้าที่คุณต้องการ</p>;

  // const totalPrice = product.price + product.price * 0.03 + 35;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* <ImageGallery
            images={product.images}
            mainImageIndex={mainImageIndex}
            setMainImageIndex={setMainImageIndex}
          /> */}
          {product && (
            <ProductDetail
              product={product}
              onSubmitBidSuccess={onSubmitBidSuccess}
              // remainingTime={remainingTime}
              // totalPrice={totalPrice}
            />
          )}
          <BidHistory bids={bids} />
        </div>

        {/* <SellerInfo seller={product.seller} rating={product.sellerRating} /> */}
      </div>
    </div>
  );
}
