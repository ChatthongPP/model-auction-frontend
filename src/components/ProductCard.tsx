import { Product } from "@/types/productTypes";
import React from "react";

interface ProductCardProps {
  key: number;
  product: Product;
  handleProductClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  key,
  product,
  handleProductClick,
}) => {
  return (
    <div
      key={key}
      onClick={() => handleProductClick(product.id)}
      className="cursor-pointer bg-[#3d2075] border border-[#8e44ad] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
    >
      <div className="h-40 bg-[#4c2882] mb-4 rounded" />
      <h3 className="font-semibold text-white text-lg">
        Product #{product.id}
      </h3>
      <p className="text-sm text-gray-400 mt-1">{product.name}</p>
      <p className="text-[#f4c2c2] font-bold mt-3">${product.actualPrice}</p>
    </div>
  );
};

export default ProductCard;
