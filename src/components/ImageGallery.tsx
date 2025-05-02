"use client";

import { useState } from "react";
import { Product } from "@/types/productTypes";

interface Props {
  product: Product;
}

export default function ImageGallery({ product }: Props) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  return (
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
  );
}
