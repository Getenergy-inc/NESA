"use client";

import { Link, Users, Gift, ArrowRight, Clipboard, BarChart, Wallet, Zap, BadgeCheck, ChevronDown } from "lucide-react";
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
    <div className="min-h-screen bg-[#f8f9fa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#191307] mb-2">Referral Program</h1>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Invite friends and earn rewards with our referral program
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-md transition">
            <div className="flex items-center">
              <div className="p-3 rounded-lg mr-4" style={{ background: 'rgba(255, 194, 71, 0.1)' }}>
                <Wallet className="w-6 h-6" style={{ color: '#FFC247' }} />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Total Earnings</p>
                <p className="text-2xl font-bold text-[#191307] flex items-center">
                  {totalEarnings.toLocaleString()} 
                  <span className="text-sm font-normal ml-1 text-[#6b7280]">pts</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-md transition">
            <div className="flex items-center">
              <div className="p-3 rounded-lg mr-4 bg-amber-500/10">
                <BarChart className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Pending Earnings</p>
                <p className="text-2xl font-bold text-[#191307] flex items-center">
                  {pendingEarnings.toLocaleString()}
                  <span className="text-sm font-normal ml-1 text-[#6b7280]">pts</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-md transition">
            <div className="flex items-center">
              <div className="p-3 rounded-lg mr-4 bg-emerald-500/10">
                <Users className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Successful Referrals</p>
                <p className="text-2xl font-bold text-[#191307]">{referralCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-2xl shadow-lg overflow-hidden mb-10 p-8 text-white" style={{ backgroundImage: "url('/images/bg/back_.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">Your Unique Referral Link</h2>
              <p className="opacity-90">Share this link to earn 500 points for each successful referral</p>
            </div>
            <div className="flex-1">
              <div className="flex bg-black/20 rounded-lg overflow-hidden">
                <div className="flex-1 p-3 px-4 truncate text-sm md:text-base">
                  {referralLink}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-white text-[#E48900] px-4 font-medium hover:bg-opacity-90 transition flex items-center"
                >
                  {copied ? "Copied!" : <Clipboard className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <button 
              className="bg-white text-[#E48900] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center"
              style={{ minWidth: '180px' }}
            >
              <Link className="w-5 h-5 mr-2" /> Share Link
            </button>
            <button className="bg-white/20 border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition flex items-center">
              <Users className="w-5 h-5 mr-2" /> Referral Guide
            </button>
          </div>
        </div>

        {/* Points Conversion */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-8 mb-10">
          <h3 className="text-xl font-bold text-[#191307] mb-6">Convert Points to Wallet</h3>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#6b7280] mb-2">Points to convert</label>
              <div className="relative">
                <input
                  type="number"
                  value={pointsToConvert}
                  onChange={(e) => setPointsToConvert(Number(e.target.value))}
                  className="w-full p-4 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#FFC247] focus:border-[#FFC247]"
                  min="100"
                  step="100"
                />
                <span className="absolute right-4 top-4 text-[#6b7280]">pts</span>
              </div>
            </div>
            <div className="flex items-center justify-center text-[#6b7280]">
              <ArrowRight className="w-6 h-6 mx-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#6b7280] mb-2">Wallet credit</label>
              <div className="relative">
                <input
                  type="text"
                  value={`${pointsToConvert / 100} AFC`}
                  readOnly
                  className="w-full p-4 border border-[#e5e7eb] rounded-lg bg-[#f9fafb]"
                />
                <span className="absolute right-4 top-4 text-[#6b7280]">AFC</span>
              </div>
            </div>
            <button 
              onClick={handleConversion}
              className="py-4 px-6 rounded-lg font-semibold transition flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                color: 'black',
                minWidth: '180px'
              }}
            >
              Convert Now
            </button>
          </div>
          <p className="text-sm text-[#6b7280] mt-4">Conversion rate: 100 pts = 1 AFC</p>
        </div>

        {/* Upgrade Options */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#191307] mb-6">Upgrade Your Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-amber-400 rounded-xl p-6 bg-amber-50 hover:shadow-md transition">
              <div className="flex items-start mb-6">
                <div className="p-3 rounded-lg mr-4 bg-amber-500/10">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-[#191307] mb-1">Ambassador</h4>
                  <p className="text-[#6b7280]">Earn 20% more on all referrals with exclusive benefits</p>
                </div>
              </div>
              <button 
                className="w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                  color: 'black'
                }}
              >
                Upgrade for 5000 pts
              </button>
            </div>
            
            <div className="border-2 border-[#7E22CE] rounded-xl p-6 bg-purple-50 hover:shadow-md transition">
              <div className="flex items-start mb-6">
                <div className="p-3 rounded-lg mr-4 bg-purple-500/10">
                  <BadgeCheck className="w-6 h-6 text-[#7E22CE]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-[#191307] mb-1">Member Plus</h4>
                  <p className="text-[#6b7280]">Exclusive benefits and early access to new features</p>
                </div>
              </div>
              <button 
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(90deg, #A855F7 -6.07%, #7E22CE 156.79%)'
                }}
              >
                Upgrade for 2000 pts
              </button>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#191307]">Your Referrals</h3>
            <button className="text-sm font-medium flex items-center text-[#E48900]">
              View All <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
            <div className="grid grid-cols-12 bg-[#f9fafb] p-4 border-b border-[#e5e7eb]">
              <div className="col-span-5 font-medium text-sm text-[#6b7280]">Name</div>
              <div className="col-span-3 font-medium text-sm text-[#6b7280]">Date</div>
              <div className="col-span-2 font-medium text-sm text-[#6b7280]">Status</div>
              <div className="col-span-2 font-medium text-sm text-[#6b7280] text-right">Earnings</div>
            </div>
            
            {referrals.map((referral, index) => (
              <div key={index} className="grid grid-cols-12 p-4 border-b border-[#e5e7eb] last:border-0 hover:bg-[#f9fafb] transition">
                <div className="col-span-5 font-medium text-[#191307]">{referral.name}</div>
                <div className="col-span-3 text-[#6b7280]">{referral.date}</div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                    referral.status === "Completed" 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {referral.status}
                  </span>
                </div>
                <div className="col-span-2 text-right font-medium text-[#191307]">
                  +{referral.earnings} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;