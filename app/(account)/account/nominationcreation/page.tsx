"use client";

import React from 'react';
import NominationAccountForm from '@/components/UI/Account/nominationcreation/page';

const NominationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <NominationAccountForm />
      </main>
    </div>
  );
};

export default NominationPage;