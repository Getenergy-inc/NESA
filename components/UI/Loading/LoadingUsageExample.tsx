"use client";
import React from "react";
import Button from "@/components/Common/Button";
import useLoadingState from "@/hooks/useLoadingState";

const LoadingUsageExample: React.FC = () => {
  const {
    pageLoad,
    submitting,
    fetching,
    nominating,
    processing_payment,
    custom,
    hideLoading,
    isLoading,
  } = useLoadingState();

  const handlePageLoad = () => {
    pageLoad();
    // Simulate page load
    setTimeout(() => hideLoading(), 2000);
  };

  const handleFormSubmit = async () => {
    submitting();
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      hideLoading();
      alert("Form submitted successfully!");
    } catch (error) {
      hideLoading();
      alert("Error submitting form");
    }
  };

  const handleDataFetch = async () => {
    fetching();
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      hideLoading();
      alert("Data fetched successfully!");
    } catch (error) {
      hideLoading();
      alert("Error fetching data");
    }
  };

  const handleNomination = async () => {
    nominating();
    // Simulate nomination submission
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      hideLoading();
      alert("Nomination submitted successfully!");
    } catch (error) {
      hideLoading();
      alert("Error submitting nomination");
    }
  };

  const handlePayment = async () => {
    processing_payment();
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      hideLoading();
      alert("Payment processed successfully!");
    } catch (error) {
      hideLoading();
      alert("Payment failed");
    }
  };

  const handleCustomLoading = () => {
    custom("Doing something amazing...");
    setTimeout(() => hideLoading(), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a140b] to-[#2a1f15] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-deepGold font-raleway">
            Loading System Demo
          </h1>
          <p className="text-gray-300 text-lg">
            Test the dynamic loading spinner with different scenarios
          </p>
          <p className="text-sm text-gray-400">
            Current loading state: {isLoading ? "Loading..." : "Idle"}
          </p>
        </div>

        {/* Demo Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-deepGold font-semibold text-lg">Page Actions</h3>
            <div className="space-y-3">
              <Button
                text="Simulate Page Load"
                onClick={handlePageLoad}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-deepGold font-semibold text-lg">Form Actions</h3>
            <div className="space-y-3">
              <Button
                text="Submit Form"
                onClick={handleFormSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-deepGold font-semibold text-lg">API Actions</h3>
            <div className="space-y-3">
              <Button
                text="Fetch Data"
                onClick={handleDataFetch}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-deepGold font-semibold text-lg">NESA Actions</h3>
            <div className="space-y-3">
              <Button
                text="Submit Nomination"
                onClick={handleNomination}
                className="w-full bg-deepGold hover:bg-deepGold/90 text-black px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-deepGold font-semibold text-lg">Payment Actions</h3>
            <div className="space-y-3">
              <Button
                text="Process Payment"
                onClick={handlePayment}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-deepGold font-semibold text-lg">Custom Actions</h3>
            <div className="space-y-3">
              <Button
                text="Custom Loading"
                onClick={handleCustomLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white/5 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-deepGold">How to Use</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-3">
              <h3 className="text-deepGold font-semibold">In Components:</h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`import useLoadingState from '@/hooks/useLoadingState';

const MyComponent = () => {
  const { submitting, hideLoading } = useLoadingState();
  
  const handleSubmit = async () => {
    submitting();
    try {
      await submitForm();
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };
};`}
              </pre>
            </div>
            <div className="space-y-3">
              <h3 className="text-deepGold font-semibold">Available Methods:</h3>
              <ul className="text-sm space-y-1">
                <li>• <code className="text-deepGold">pageLoad()</code> - Page loading</li>
                <li>• <code className="text-deepGold">submitting()</code> - Form submission</li>
                <li>• <code className="text-deepGold">fetching()</code> - API calls</li>
                <li>• <code className="text-deepGold">nominating()</code> - Nominations</li>
                <li>• <code className="text-deepGold">processing_payment()</code> - Payments</li>
                <li>• <code className="text-deepGold">custom(message)</code> - Custom loading</li>
                <li>• <code className="text-deepGold">hideLoading()</code> - Hide spinner</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingUsageExample;
