"use client";

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with proper top padding for fixed navbar */}
      <main className="flex-1 pt-[4rem] lg:pt-[8rem]">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
