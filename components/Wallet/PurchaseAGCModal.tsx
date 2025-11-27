'use client';
import React, { useState, useEffect } from 'react';
import { X, Wallet, Info, Loader2, CheckCircle, DollarSign } from 'lucide-react';
import walletService from '@/lib/services/walletService';

interface PurchaseAGCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Currency = 'USD' | 'NGN';

interface CurrencyConfig {
  symbol: string;
  name: string;
  minAmount: number;
  quickAmounts: number[];
  exchangeRate: number; // To USD for AGC calculation
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
    minAmount: 1455, // ~$1 at 1455 NGN/USD
    quickAmounts: [7275, 14550, 29100, 72750, 145500], // 5, 10, 20, 50, 100 USD equivalent
    exchangeRate: 1455 // 1 USD = 1455 NGN
  }
};

export const PurchaseAGCModal: React.FC<PurchaseAGCModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<string>('10');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const conversionRate = 20; // $1 = 20 AGC
  const userSplit = 0.75; // 75% to user
  const companySplit = 0.25; // 25% to company

  const config = currencyConfigs[currency];
  const numAmount = parseFloat(amount) || 0;
  const usdEquivalent = numAmount / config.exchangeRate;
  const totalAGC = usdEquivalent * conversionRate;
  const userAGC = totalAGC * userSplit;
  const companyAGC = totalAGC * companySplit;

  // Update amount when currency changes
  useEffect(() => {
    if (currency === 'USD') {
      setAmount('10');
    } else {
      setAmount('14550');
    }
    setError('');
  }, [currency]);

  // Reset loading state if modal closes
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError('');
    }
  }, [isOpen]);

  const handlePurchase = async () => {
    if (numAmount < config.minAmount) {
      setError(`Minimum purchase amount is ${config.symbol}${config.minAmount.toLocaleString()}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await walletService.initiatePurchase(numAmount, currency);
      
      // Check if we have an authorization URL (response can be nested in data or at root)
      const authUrl = response.data?.authorizationUrl || response.authorizationUrl;
      
      if (authUrl) {
        // Small delay to show loading state, then redirect
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Purchase AGC</h2>
                <p className="text-sm opacity-90">AfriGold Coin</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Currency Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Currency
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrency('USD')}
                disabled={loading}
                className={`p-4 rounded-xl border-2 transition-all ${
                  currency === 'USD'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl">$</span>
                  <span className="font-bold">USD</span>
                </div>
                <p className="text-xs opacity-75">US Dollar</p>
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                disabled={loading}
                className={`p-4 rounded-xl border-2 transition-all ${
                  currency === 'NGN'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl">₦</span>
                  <span className="font-bold">NGN</span>
                </div>
                <p className="text-xs opacity-75">Nigerian Naira</p>
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Amount ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                {config.symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={config.minAmount}
                step={currency === 'NGN' ? '100' : '1'}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder={config.minAmount.toString()}
                disabled={loading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum: {config.symbol}{formatAmount(config.minAmount)} {currency}
              {currency === 'NGN' && ' (~$1 USD)'}
            </p>
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Select</p>
            <div className="grid grid-cols-5 gap-2">
              {config.quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className={`py-2 px-2 rounded-lg font-medium transition-all text-xs ${
                    amount === quickAmount.toString()
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled={loading}
                >
                  {config.symbol}{currency === 'NGN' ? formatAmount(quickAmount) : quickAmount}
                </button>
              ))}
            </div>
            {currency === 'NGN' && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                ≈ $5, $10, $20, $50, $100 USD
              </p>
            )}
          </div>

          {/* Conversion Preview */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-orange-800 mb-2">
              <Info className="w-4 h-4" />
              <p className="text-sm font-semibold">Purchase Breakdown</p>
            </div>
            
            <div className="space-y-2">
              {currency === 'NGN' && (
                <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                  <span className="text-xs text-gray-600">USD Equivalent</span>
                  <span className="text-sm font-semibold text-gray-700">
                    ${usdEquivalent.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Total AGC</span>
                <span className="text-lg font-bold text-gray-900">
                  {totalAGC.toFixed(2)} AGC
                </span>
              </div>
              
              <div className="border-t border-orange-200 pt-2 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    Your AGC (75%)
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {userAGC.toFixed(2)} AGC
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Info className="w-3 h-3 text-blue-600" />
                    Platform Reserve (25%)
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {companyAGC.toFixed(2)} AGC
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-3 mt-3">
              <p className="text-xs text-gray-600 leading-relaxed">
                💡 <span className="font-semibold">How it works:</span> When you purchase AGC, 
                75% goes directly to your wallet for voting, transfers, and platform activities. 
                The remaining 25% supports NESA's mission and helps us maintain and improve the platform 
                for everyone. Thank you for your support! 🙏
              </p>
            </div>
          </div>

          {/* Conversion Rate Info */}
          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Conversion Rates</p>
              <p>$1 USD = {conversionRate} AGC</p>
              {currency === 'NGN' && (
                <p className="text-xs mt-1 opacity-75">
                  ₦{formatAmount(config.exchangeRate)} = $1 USD
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              disabled={loading || numAmount < config.minAmount}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" />
                  Purchase {userAGC.toFixed(2)} AGC
                </>
              )}
            </button>
          </div>

          {/* Security Note */}
          <p className="text-xs text-center text-gray-500">
            🔒 Secure payment powered by Flutterwave
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAGCModal;
