import Link from "next/link";

export const CTA = () => (
  <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border border-amber-200 overflow-hidden p-8 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Have someone to nominate?</h2>
    <p className="text-lg text-amber-800 max-w-2xl mx-auto mb-6">
      Submit your nomination for next year's awards and help recognize outstanding achievements in our community.
    </p>
    <Link href="/member/createnominee">
      <button
        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition"
      >
        Submit a Nomination
      </button>
    </Link>
  </div>
);