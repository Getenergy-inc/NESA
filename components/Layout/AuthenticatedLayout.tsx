"use client";

import React from 'react';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean dashboard layout without navbar/footer */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
