"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Gift, Users, Vote, ShoppingCart, WalletCards, X, ChevronDown, Banknote, CreditCard, Bitcoin } from "lucide-react";
import Image from "next/image";
import { useAuthContext } from '@/lib/context/AuthContext';

const Wallet = () => {
  const { user } = useAuthContext();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const firstName = user?.name?.split(' ')[0] || 'First Name';
  const lastName = user?.name?.split(' ')[1] || 'Last Name';

  const walletId = "NESA/VIS/2025/000123";
  const balance = 1250;
  const transactions = [
    { type: "credit", amount: 590, reason: "Referral Bonus", date: "15 Jun, 2025" },
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

  const paymentMethods = [
    { id: "bank", name: "Bank Transfer", icon: <Banknote className="w-5 h-5" /> },
    { id: "card", name: "Credit/Debit Card", icon: <CreditCard className="w-5 h-5" /> },
    { id: "crypto", name: "Cryptocurrency", icon: <Bitcoin className="w-5 h-5" /> },
  ];

  const withdrawMethods = [
    { id: "bank", name: "Bank Transfer", icon: <Banknote className="w-5 h-5" />, min: 100 },
    { id: "crypto", name: "Cryptocurrency", icon: <Bitcoin className="w-5 h-5" />, min: 50 },
  ];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle deposit logic
    console.log("Depositing:", amount, "via", selectedMethod);
    setShowDepositModal(false);
    setAmount("");
    setSelectedMethod("");
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal logic
    console.log("Withdrawing:", amount, "via", selectedMethod, "to", walletAddress);
    setShowWithdrawModal(false);
    setAmount("");
    setSelectedMethod("");
    setWalletAddress("");
  };

  return (
    <div className="pb-20 pt-10 container max-w-4xl">
      {/* Header with wallet ID */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome {firstName} {lastName},
          </h1>
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
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4" /> Withdraw
            </button>
            <button 
              onClick={() => setShowDepositModal(true)}
              className="bg-white/20 border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" /> Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Deposit Funds</h3>
                <button 
                  onClick={() => setShowDepositModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`flex-1 py-2 font-medium text-sm ${activeTab === "deposit" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
                  onClick={() => setActiveTab("deposit")}
                >
                  Deposit
                </button>
              </div>

              <form onSubmit={handleDeposit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={"/svgs/africoin.svg"} alt="africoin" width={20} height={20} />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="0.00"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${selectedMethod === method.id ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 text-primary">
                          {method.icon}
                        </div>
                        <span className="font-medium">{method.name}</span>
                        {selectedMethod === method.id && (
                          <div className="ml-auto bg-primary text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!amount || !selectedMethod}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Withdraw Funds</h3>
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleWithdraw}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={"/svgs/africoin.svg"} alt="africoin" width={20} height={20} />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="0.00"
                      required
                      min="1"
                      max={balance}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Available: {balance.toLocaleString()} coins</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                  <div className="space-y-3">
                    {withdrawMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${selectedMethod === method.id ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 text-primary">
                          {method.icon}
                        </div>
                        <div>
                          <span className="font-medium block">{method.name}</span>
                          <span className="text-xs text-gray-500">Min: {method.min} coins</span>
                        </div>
                        {selectedMethod === method.id && (
                          <div className="ml-auto bg-primary text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedMethod && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedMethod === "bank" ? "Bank Account Details" : "Wallet Address"}
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder={selectedMethod === "bank" ? "Enter account number" : "Enter wallet address"}
                      required
                    />
                    {selectedMethod === "bank" && (
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                          <div className="relative">
                            <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary appearance-none">
                              <option>Select Bank</option>
                              <option>Access Bank</option>
                              <option>GTBank</option>
                              <option>Zenith Bank</option>
                              <option>First Bank</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                          <input
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="Account name"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">Withdrawal Information</h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Minimum withdrawal: 50 coins</li>
                    <li>• Processing time: 1-3 business days</li>
                    <li>• 1% transaction fee applies</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={!amount || !selectedMethod || !walletAddress}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Request Withdrawal
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your existing wallet content */}
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