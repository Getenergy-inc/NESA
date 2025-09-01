"use client";

import Link from "next/link";

export default function LegacyEndorserShowcase() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">Endorser Showcase (Legacy)</h1>
        <p className="text-gray-700 mb-6">
          This legacy version has been archived. Please use the new Tailwind-powered showcase page for the latest experience.
        </p>
        <Link
          href="/get-involved/endorse-nesa-africa/showcase"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md"
        >
          Go to New Showcase
        </Link>
      </div>
    </div>
  );
}