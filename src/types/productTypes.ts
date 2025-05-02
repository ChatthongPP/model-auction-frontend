export interface ProductDB {
  id: number;
  name: string;
  description: string;
  category_id: number;
  seller_id: number;
  actual_price: number;
  starting_bid_price: number;
  current_bid_price: number;
  minimum_bid_increment: number;
  shipping_price: number;
  service_fee: number;
  auction_start_time: string;
  auction_end_time: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  categoryId: number;
  sellerId: number;
  actualPrice: number;
  startingBidPrice: number;
  currentBidPrice: number;
  minimumBidIncrement: number;
  shippingPrice: number;
  serviceFee: number;
  auctionStartTime: string; // or Date if parsed
  auctionEndTime: string; // or Date if parsed
  status: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}

export interface ProductResponse {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: Product[];
}

export interface ProductQueryParams {
  current_page?: number;
  limit?: number;
  order_by?: string;
  order?: "asc" | "desc";
  search?: string;
  category_id?: string;
  status?: string;
}
