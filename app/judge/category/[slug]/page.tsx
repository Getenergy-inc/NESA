'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReviewCard from '@/components/UI/judgenomination/JudgeReview';
import { MOCK_CATEGORIES, MOCK_NOMINEES } from '../../data';

export default function CategoryPage() {
  // ✅ Get slug from dynamic route (/judge/category/[slug]) pushed from the dashboard
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  // Find the category object based on slug which capares to the mock data category
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  // Filter nominees that belong to this category using to the nominees category and matching with the category title
const nominees = category
  ? MOCK_NOMINEES.filter((n) => n.category === category.title)
  : [];


  if (!category) {
    return <p className="p-6">Category not found</p>;
  }

  return (
    <div className="p-6 px-10 sm:mt-20 min-h-screen bg-gray-100 pt-20">
      {/* Category Title */}
      <h2 className="text-2xl text-center font-semibold mb-10">
        {category.title}
      </h2>

      {/* Grid of nominees in this category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {nominees.map((n) => (
          // ✅ Each nominee card for review
          <ReviewCard key={n.id} nominee={n} />
        ))}
      </div>
    </div>
  );
}

