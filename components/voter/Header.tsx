import { Award } from "lucide-react";

export const Header = () => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full px-6 py-2 mb-4">
      <Award className="w-5 h-5 mr-2" />
      <span className="font-medium">2025 NESA Excellence Awards</span>
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Voting Center</h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      Review this year's nominees and cast your votes for outstanding achievements
    </p>
  </div>
);