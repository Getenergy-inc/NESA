"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

export default function WalletBadge() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/wallet/balance", { cache: "no-store" });
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error("Wallet fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 10000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white shadow px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-medium w-fit">
      <Wallet className="w-4 h-4 text-amber-600" />
      {loading ? "Loading..." : `₦${balance?.toLocaleString()}`}
    </div>
  );
}
