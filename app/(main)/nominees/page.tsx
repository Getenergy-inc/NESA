"use client";

import { useSearchParams } from 'next/navigation';
import SeeAll from "@/components/UI/SeeAll/seeall";

const NomineesPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category')?? "";
  const subcategory = searchParams?.get('subcategory')?? "";

  return (
    <div>
      <SeeAll initialCategory={category} initialSubCategory={subcategory} />
    </div>
  );
};

export default NomineesPage;