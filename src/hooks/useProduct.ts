import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { Product, ProductQueryParams } from "@/types/productTypes";

export const useProduct = (queryParams: ProductQueryParams = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    limit: queryParams.limit ?? 10,
  });

  const fetchProducts = async (params: ProductQueryParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProducts(params);

      if (response) {
        setProducts(response.data);
        setPagination({
          currentPage: response.currentPage,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          limit: params.limit ?? 10,
        });
      } else {
        setError("No data available");
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

  useEffect(() => {
    fetchProducts(queryParams);
  }, [queryParams]);

  const goToPage = (page: number) => {
    const params: ProductQueryParams = {
      ...queryParams,
      current_page: page,
    };
    fetchProducts(params);
  };

  return { products, loading, error, pagination, goToPage };
};
