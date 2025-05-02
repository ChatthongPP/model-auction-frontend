import BalanceCard from "@/components/BalanceCard";
import UserInfo from "@/components/UserInfo";
import AuctionMenu from "@/components/AuctionMenu";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <BalanceCard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <UserInfo />
          <AuctionMenu />
        </div>
      </div>
    </div>
  );
}
