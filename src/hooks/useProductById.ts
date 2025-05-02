"use client";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/productTypes";

export const useProductById = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedProduct = await getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Internal server error");
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading, error };
};
