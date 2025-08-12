"use client";
import React, { useState } from "react";
import { LoadingSpinner, SimpleSpinner, PageLoader } from "./index";
import Button from "@/components/Common/Button";

const LoadingDemo: React.FC = () => {
  const [showPageLoader, setShowPageLoader] = useState(false);

  const handleShowPageLoader = () => {
    setShowPageLoader(true);
    // Auto hide after 3 seconds for demo
    setTimeout(() => setShowPageLoader(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a140b] to-[#2a1f15] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-deepGold font-raleway">
            NESA Loading Spinners
          </h1>
          <p className="text-gray-300 text-lg">
            Clean and visually appealing loading components
          </p>
        </div>

        {/* Loading Spinner Variants */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Small */}
          <div className="bg-white/5 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-deepGold font-semibold">Small</h3>
            <LoadingSpinner size="small" />
          </div>

          {/* Medium */}
          <div className="bg-white/5 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-deepGold font-semibold">Medium</h3>
            <LoadingSpinner size="medium" />
          </div>

          {/* Large */}
          <div className="bg-white/5 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-deepGold font-semibold">Large</h3>
            <LoadingSpinner size="large" />
          </div>

          {/* Extra Large */}
          <div className="bg-white/5 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-deepGold font-semibold">Extra Large</h3>
            <LoadingSpinner size="extra-large" />
          </div>
        </div>

        {/* Simple Spinner Examples */}
        <div className="bg-white/5 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-deepGold text-center">Simple Spinners</h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center space-y-2">
              <SimpleSpinner size={30} />
              <p className="text-gray-400 text-sm">30px</p>
            </div>
            <div className="text-center space-y-2">
              <SimpleSpinner size={50} />
              <p className="text-gray-400 text-sm">50px</p>
            </div>
            <div className="text-center space-y-2">
              <SimpleSpinner size={70} />
              <p className="text-gray-400 text-sm">70px</p>
            </div>
          </div>
        </div>

        {/* Overlay Spinner */}
        <div className="bg-white/5 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-deepGold text-center">Overlay Spinner</h2>
          <div className="text-center">
            <LoadingSpinner size="medium" overlay={false} />
          </div>
        </div>

        {/* Page Loader Demo */}
        <div className="bg-white/5 rounded-2xl p-8 space-y-6 text-center">
          <h2 className="text-2xl font-bold text-deepGold">Full Page Loader</h2>
          <p className="text-gray-300">Click to see the full-page loading experience</p>
          <Button
            text="Show Page Loader"
            onClick={handleShowPageLoader}
            className="bg-deepGold text-black hover:bg-deepGold/90 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          />
        </div>

        {/* Usage Examples */}
        <div className="bg-white/5 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-deepGold">Usage Examples</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-3">
              <h3 className="text-deepGold font-semibold">Basic Usage</h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`import { LoadingSpinner } from '@/components/UI/Loading';

// Basic spinner
<LoadingSpinner />

// Custom size and text
<LoadingSpinner 
  size="large" 
  text="Processing..." 
/>

// Overlay mode
<LoadingSpinner 
  size="medium" 
  overlay={true} 
/>`}
              </pre>
            </div>
            <div className="space-y-3">
              <h3 className="text-deepGold font-semibold">Page Loader</h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`import { PageLoader } from '@/components/UI/Loading';

// Full page loading
<PageLoader 
  isLoading={loading} 
  message="Loading NESA..." 
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Page Loader Component */}
      <PageLoader isLoading={showPageLoader} />
    </div>
  );
};

export default LoadingDemo;
