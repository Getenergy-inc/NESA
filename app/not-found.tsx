"use client";

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whiteGold via-[#fdf3dc] to-xlGold flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-darkBrown">404</span>
          </div>
          <h1 className="text-3xl font-bold text-darkBrown mb-4">Page Not Found</h1>
          <p className="text-darkBrown/70 text-lg leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-primaryGold hover:text-deepGold font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        <div className="mt-12 text-sm text-darkBrown/60">
          <p>Need help? <Link href="/faq" className="text-primaryGold hover:text-deepGold font-medium">Check our FAQ</Link> or <Link href="/contact" className="text-primaryGold hover:text-deepGold font-medium">contact support</Link>.</p>
        </div>
      </div>
    </div>
  );
}
