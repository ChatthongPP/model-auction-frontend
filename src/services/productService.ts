import apiClient from "@/lib/apiClient";
import {
  Product,
  ProductDB,
  ProductQueryParams,
  ProductResponse,
} from "@/types/productTypes";

export const getProducts = async (
  params: ProductQueryParams = {}
): Promise<ProductResponse | null> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const response = await apiClient.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  const rawProducts = response.data.data;

  const products: Product[] = rawProducts.data.map((item: ProductDB) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    categoryId: item.category_id,
    sellerId: item.seller_id,
    actualPrice: item.actual_price,
    startingBidPrice: item.starting_bid_price,
    currentBidPrice: item.current_bid_price,
    minimumBidIncrement: item.minimum_bid_increment,
    shippingPrice: item.shipping_price,
    serviceFee: item.service_fee,
    auctionStartTime: item.auction_start_time,
    auctionEndTime: item.auction_end_time,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));

  return {
    currentPage: rawProducts.currrent_page,
    limit: rawProducts.limit,
    totalCount: rawProducts.total_count,
    totalPages: rawProducts.total_pages,
    data: products,
  };
};

export const getProductById = async (
  productId: number
): Promise<Product | null> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const response = await apiClient.get(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const rawProduct = response.data.data;

    const product: Product = {
      id: rawProduct.id,
      name: rawProduct.name,
      description: rawProduct.description,
      images: [],
      categoryId: rawProduct.category_id,
      sellerId: rawProduct.seller_id,
      actualPrice: rawProduct.actual_price,
      startingBidPrice: rawProduct.starting_bid_price,
      currentBidPrice: rawProduct.current_bid_price,
      minimumBidIncrement: rawProduct.minimum_bid_increment,
      shippingPrice: rawProduct.shipping_price,
      serviceFee: rawProduct.service_fee,
      auctionStartTime: rawProduct.auction_start_time,
      auctionEndTime: rawProduct.auction_end_time,
      status: rawProduct.status,
      createdAt: rawProduct.created_at,
      updatedAt: rawProduct.updated_at,
    };

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
