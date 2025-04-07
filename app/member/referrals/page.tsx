"use client";

import { Link, Users, Gift, ArrowRight, Clipboard, BarChart, Wallet, Zap, BadgeCheck } from "lucide-react";
import { useState } from "react";

const ReferralsPage = () => {
  const [copied, setCopied] = useState(false);
  const [pointsToConvert, setPointsToConvert] = useState(100);
  
  // Sample data
  const referralLink = "https://gfa.nesa/ref/mujeeb123";
  const totalEarnings = 1250;
  const pendingEarnings = 350;
  const convertedEarnings = 900;
  const referralCount = 8;
  
  const referrals = [
    { name: "Aisha Bello", date: "15 Jun, 2025", status: "Completed", earnings: 500 },
    { name: "Chinedu Okoro", date: "12 Jun, 2025", status: "Pending", earnings: 250 },
    { name: "Fatima Yusuf", date: "8 Jun, 2025", status: "Completed", earnings: 300 },
    { name: "Kwame Mensah", date: "5 Jun, 2025", status: "Completed", earnings: 200 },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConversion = () => {
    // Conversion logic would go here
    alert(`${pointsToConvert} points converted to wallet!`);
  };

  return (
    <div className="pb-20 pt-10 container max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Referrals & Earnings</h1>
        <p className="text-gray-500">Invite friends and earn rewards</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-lg mr-4 text-primary">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="font-bold text-xl">{totalEarnings.toLocaleString()} pts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-lg mr-4 text-yellow-600">
              <BarChart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Earnings</p>
              <p className="font-bold text-xl">{pendingEarnings.toLocaleString()} pts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-4 text-green-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Successful Referrals</p>
              <p className="font-bold text-xl">{referralCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-lg overflow-hidden mb-10 p-6 text-white" style={{ backgroundImage: "url('/images/bg/back_.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Your Unique Referral Link</h2>
            <p className="opacity-90 text-sm">Share this link to earn 500 points for each successful referral</p>
          </div>
          <div className="flex">
            <div className="bg-white/20 rounded-l-lg p-3 px-4 overflow-hidden text-sm md:text-base truncate flex-1">
              {referralLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className="bg-white text-primary-dark px-4 rounded-r-lg font-medium hover:bg-opacity-90 transition flex items-center"
            >
              {copied ? "Copied!" : <Clipboard className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="bg-white text-primary-dark px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center">
            <Link className="w-4 h-4 mr-2" /> Share via Social
          </button>
          <button className="bg-white/20 border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition flex items-center">
            <Users className="w-4 h-4 mr-2" /> View Referral Guide
          </button>
        </div>
      </div>

      {/* Points Conversion */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Convert Points to Wallet</h3>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Points to convert</label>
            <div className="relative">
              <input
                type="number"
                value={pointsToConvert}
                onChange={(e) => setPointsToConvert(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                min="100"
                step="100"
              />
              <span className="absolute right-3 top-3 text-gray-500">pts</span>
            </div>
          </div>
          <div className="flex items-center justify-center text-gray-500">
            <ArrowRight className="w-6 h-6 mx-2" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Wallet credit</label>
            <div className="relative">
              <input
                type="text"
                value={`${pointsToConvert / 100} AFC`}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
              <span className="absolute right-3 top-3 text-gray-500">AFC</span>
            </div>
          </div>
          <button 
            onClick={handleConversion}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition flex items-center"
          >
            Convert Now
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3">Conversion rate: 100 pts = 1 AFC</p>
      </div>

      {/* Upgrade Options */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Upgrade Your Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-yellow-400 rounded-xl p-5 bg-yellow-50">
            <div className="flex items-start mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg mr-4 text-yellow-600">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Ambassador Status</h4>
                <p className="text-sm text-gray-600 mt-1">Earn 20% more on all referrals</p>
              </div>
            </div>
            <button className="w-full bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Upgrade (5000 pts)
            </button>
          </div>
          
          <div className="border-2 border-primary rounded-xl p-5 bg-blue-50">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Member Plus</h4>
                <p className="text-sm text-gray-600 mt-1">Exclusive benefits and early access</p>
              </div>
            </div>
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">
              Upgrade (2000 pts)
            </button>
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Your Referrals</h3>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
            <div className="col-span-5 font-medium text-sm text-gray-500">Name</div>
            <div className="col-span-3 font-medium text-sm text-gray-500">Date</div>
            <div className="col-span-2 font-medium text-sm text-gray-500">Status</div>
            <div className="col-span-2 font-medium text-sm text-gray-500 text-right">Earnings</div>
          </div>
          
          {referrals.map((referral, index) => (
            <div key={index} className="grid grid-cols-12 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
              <div className="col-span-5 font-medium">{referral.name}</div>
              <div className="col-span-3 text-gray-500">{referral.date}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  referral.status === "Completed" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {referral.status}
                </span>
              </div>
              <div className="col-span-2 text-right font-medium">
                +{referral.earnings} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;