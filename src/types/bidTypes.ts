export interface BidDB {
  id: number;
  product_id: number;
  user_id: number;
  bid_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Bid {
  id?: number;
  productId: number;
  userId: number;
  bidAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BidResponse {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: Bid[];
}

export interface BidQueryParams {
  current_page?: number;
  limit?: number;
  order_by?: string;
  order?: "asc" | "desc";
  search?: string;
  user_id?: number;
  product_id?: number;
  status?: string;
}
