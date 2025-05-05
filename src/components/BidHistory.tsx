import { Bid } from "@/types/bidTypes";

interface Props {
  bids: Bid[];
}

export default function BidHistory({ bids }: Readonly<Props>) {
  return (
    <div className="bg-[#2d1a48] p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold mb-4">ประวัติการประมูล</h2>
      <div className="space-y-2 text-sm">
        {bids.map((bid, idx) => (
          <div
            key={idx}
            className="flex justify-between border-b border-gray-600 pb-2"
          >
            <span>{bid.userId}</span>
            <span>฿{bid.bidAmount}</span>
            <span className="text-gray-400">{bid.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
