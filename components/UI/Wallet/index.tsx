"use client";

import { ArrowDown, ArrowUp, Gift, Users, Vote, ShoppingCart, WalletCards } from "lucide-react";
import Image from "next/image";

const Wallet = () => {
  // Sample data
  const walletId = "NESA/VIS/2025/000123";
  const balance = 1250;
  const transactions = [
    { type: "credit", amount: 500, reason: "Referral Bonus", date: "15 Jun, 2025" },
    { type: "debit", amount: 250, reason: "Merchandise Purchase", date: "10 Jun, 2025" },
    { type: "credit", amount: 300, reason: "Voting Activity", date: "5 Jun, 2025" },
    { type: "credit", amount: 200, reason: "Nomination Reward", date: "1 Jun, 2025" },
    { type: "credit", amount: 500, reason: "Initial Deposit", date: "28 May, 2025" },
  ];

  const earningOptions = [
    { icon: <Users className="w-6 h-6" />, title: "Referrals", points: "+500 per successful referral" },
    { icon: <Vote className="w-6 h-6" />, title: "Voting", points: "+100 per voting activity" },
    { icon: <Gift className="w-6 h-6" />, title: "Nominations", points: "+200 per nomination" },
    { icon: <ShoppingCart className="w-6 h-6" />, title: "Purchases", points: "+10 per $1 spent" },
  ];

  return (
    <div className="pb-20 pt-10 container max-w-4xl">
      {/* Header with wallet ID */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome Mujeeb,</h1>
          <p className="text-gray-500">Your GFA Wallet Dashboard</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-100">
          <p className="text-sm font-medium text-gray-600">Wallet ID</p>
          <p className="text-primary font-mono">{walletId}</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-lg overflow-hidden mb-10">
        <div className="p-6 md:p-8 text-white" style={{ backgroundImage: "url('/images/bg/back_.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Current Balance</p>
              <div className="flex items-end mt-2">
                <Image src={"/svgs/africoin.svg"} alt="africoin" width={40} height={40} className="mr-2" />
                <h2 className="text-4xl md:text-5xl font-bold">{balance.toLocaleString()}</h2>
              </div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <WalletCards className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
              Withdraw Earnings
            </button>
            <button className="bg-white/20 border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition">
              Deposit Coins
            </button>
          </div>
        </div>
      </div>

      {/* Earning Opportunities */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Earn More Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {earningOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg mr-4 text-primary">
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{option.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{option.points}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction, id) => (
            <div key={id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {transaction.type === "credit" ? (
                    <div className="bg-green-100 p-2 rounded-lg mr-4 text-green-600">
                      <ArrowUp className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="bg-red-100 p-2 rounded-lg mr-4 text-red-600">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{transaction.reason}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "credit" ? "+" : "-"}{transaction.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;