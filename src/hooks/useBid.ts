import { useEffect, useState } from "react";
import { getBids } from "@/services/bidService";
import { Bid, BidQueryParams } from "@/types/bidTypes";

export const useBid = (queryParams: BidQueryParams = {}) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    limit: queryParams.limit ?? 10,
  });

  const fetchBids = async (params: BidQueryParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getBids(params);

      if (response) {
        setBids(response.data);
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
    fetchBids(queryParams);
  }, [queryParams]);

  const goToPage = (page: number) => {
    const params: BidQueryParams = {
      ...queryParams,
      current_page: page,
    };
    fetchBids(params);
  };

  return { bids, loading, error, pagination, goToPage };
};
