import apiClient from "@/lib/apiClient";
import { Bid, BidDB, BidQueryParams, BidResponse } from "@/types/bidTypes";

export const getBids = async (
  params: BidQueryParams = {}
): Promise<BidResponse | null> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const response = await apiClient.get("/bids", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  const rawBids = response.data.data;

  const bids: Bid[] = rawBids.data.map((item: BidDB) => ({
    id: item.id,
    productId: item.product_id,
    userId: item.user_id,
    bidAmount: item.bid_amount,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));

  return {
    currentPage: rawBids.currrent_page,
    limit: rawBids.limit,
    totalCount: rawBids.total_count,
    totalPages: rawBids.total_pages,
    data: bids,
  };
};

export const createBid = async (data: Bid): Promise<unknown> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const payload = {
    product_id: data.productId,
    user_id: data.userId,
    bid_amount: data.bidAmount,
  };

  const response = await apiClient.post("/bids", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
