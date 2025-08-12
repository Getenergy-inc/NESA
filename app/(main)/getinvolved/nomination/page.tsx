import React from 'react';
import EducationAward from '@/components/UI/nomination/header';
import AwardCategory from '@/components/UI/nomination/categories'
import FAQs from "@/components/Common/Others/faq";

const MainPage = () => {
  return (
    <div className="main-page">
      <EducationAward />
      <AwardCategory />
      <div className="container space-y-8 py-12">
          <p className="text-2xl font-medium _under_border">Frequently Asked Questions</p>
          <FAQs />
        </div>
    </div>
  );
};

export default MainPage;