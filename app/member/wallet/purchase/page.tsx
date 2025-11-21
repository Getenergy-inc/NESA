'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Wallet, 
  Info, 
  Loader2, 
  CheckCircle, 
  Shield,
  AlertCircle
} from 'lucide-react';
import walletService from '@/lib/services/walletService';

type Currency = 'USD' | 'NGN';

interface CurrencyConfig {
  symbol: string;
  name: string;
  minAmount: number;
  quickAmounts: number[];
  exchangeRate: number;
}

const currencyConfigs: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: '$',
    name: 'US Dollar',
    minAmount: 1,
    quickAmounts: [5, 10, 20, 50, 100],
    exchangeRate: 1
  },
  NGN: {
    symbol: '₦',
    name: 'Nigerian Naira',
    minAmount: 1455,
    quickAmounts: [7275, 14550, 29100, 72750, 145500],
    exchangeRate: 1455
  }
};

export default function PurchaseAGCPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<string>('10');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const conversionRate = 20;
  const userSplit = 0.75;
  const companySplit = 0.25;

  const config = currencyConfigs[currency];
  const numAmount = parseFloat(amount) || 0;
  const usdEquivalent = numAmount / config.exchangeRate;
  const totalAGC = usdEquivalent * conversionRate;
  const userAGC = totalAGC * userSplit;
  const companyAGC = totalAGC * companySplit;

  useEffect(() => {
    if (currency === 'USD') {
      setAmount('10');
    } else {
      setAmount('14550');
    }
    setError('');
  }, [currency]);

  const handlePurchase = async () => {
    if (numAmount < config.minAmount) {
      setError(`Minimum purchase amount is ${config.symbol}${config.minAmount.toLocaleString()}`);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await walletService.initiatePurchase(numAmount, currency);
      
      const authUrl = response.data?.authorizationUrl || response.authorizationUrl;
      
      if (authUrl) {
        setTimeout(() => {
          window.location.href = authUrl;
        }, 500);
      } else {
        setError('Failed to initiate purchase. Please try again.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initiate purchase');
      setLoading(false);
    }
  };

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            disabled={loading}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Wallet
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Purchase AGC</h1>
              <p className="text-gray-600">AfriGold Coin - NESA's Digital Currency</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Purchase Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Currency Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Currency</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrency('USD')}
                  disabled={loading}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    currency === 'USD'
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl">$</span>
                    <span className="text-xl font-bold">USD</span>
                  </div>
                  <p className="text-sm opacity-75">US Dollar</p>
                </button>
                <button
                  onClick={() => setCurrency('NGN')}
                  disabled={loading}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    currency === 'NGN'
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl">₦</span>
                    <span className="text-xl font-bold">NGN</span>
                  </div>
                  <p className="text-sm opacity-75">Nigerian Naira</p>
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Amount</h2>
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl font-semibold">
                  {config.symbol}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={config.minAmount}
                  step={currency === 'NGN' ? '100' : '1'}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-2xl font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder={config.minAmount.toString()}
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Minimum: {config.symbol}{formatAmount(config.minAmount)} {currency}
                {currency === 'NGN' && ' (~$1 USD)'}
              </p>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
                <div className="grid grid-cols-5 gap-2">
                  {config.quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                        amount === quickAmount.toString()
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      disabled={loading}
                    >
                      {config.symbol}{currency === 'NGN' ? formatAmount(quickAmount) : quickAmount}
                    </button>
                  ))}
                </div>
                {currency === 'NGN' && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    ≈ $5, $10, $20, $50, $100 USD
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="font-semibold">Please read and agree to the following:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>AGC purchases are non-refundable once completed</li>
                    <li>75% of purchased AGC goes to your wallet, 25% supports platform operations</li>
                    <li>AGC can be used for voting, transfers, and platform activities</li>
                    <li>AGC cannot be withdrawn or converted back to fiat currency</li>
                    <li>Prices are subject to change based on exchange rates</li>
                    <li>You must be 18 years or older to make purchases</li>
                    <li>All transactions are processed securely through Flutterwave</li>
                  </ul>
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  I have read and agree to the terms and conditions, and I understand that 
                  75% of my purchase goes to my wallet while 25% supports NESA's platform operations.
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={loading || numAmount < config.minAmount || !agreedToTerms}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="w-6 h-6" />
                  Proceed to Secure Payment
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500">
              🔒 Secure payment powered by Flutterwave
            </p>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-6 border-2 border-orange-200 sticky top-8">
              <div className="flex items-center gap-2 text-orange-800 mb-4">
                <Info className="w-5 h-5" />
                <h3 className="text-lg font-bold">Purchase Summary</h3>
              </div>
              
              <div className="space-y-4">
                {currency === 'NGN' && (
                  <div className="pb-3 border-b border-orange-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Amount</span>
                      <span className="text-lg font-bold text-gray-900">
                        ₦{formatAmount(numAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-600">USD Equivalent</span>
                      <span className="text-sm font-semibold text-gray-700">
                        ${usdEquivalent.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Total AGC</span>
                    <span className="text-xl font-bold text-gray-900">
                      {totalAGC.toFixed(2)} AGC
                    </span>
                  </div>
                  
                  <div className="bg-white/60 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Your Wallet (75%)
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {userAGC.toFixed(2)} AGC
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Info className="w-4 h-4 text-blue-600" />
                        Platform (25%)
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {companyAGC.toFixed(2)} AGC
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-4 mt-4">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    💡 <span className="font-semibold">How it works:</span> When you purchase AGC, 
                    75% goes directly to your wallet for voting, transfers, and platform activities. 
                    The remaining 25% supports NESA's mission and helps us maintain and improve the platform. 
                    Thank you for your support! 🙏
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mt-4">
                  <p className="text-xs text-blue-900 font-semibold mb-1">Conversion Rates</p>
                  <p className="text-xs text-blue-800">$1 USD = {conversionRate} AGC</p>
                  {currency === 'NGN' && (
                    <p className="text-xs text-blue-800 mt-1">
                      ₦{formatAmount(config.exchangeRate)} = $1 USD
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
