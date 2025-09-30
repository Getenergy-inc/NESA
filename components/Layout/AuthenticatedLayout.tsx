"use client";
 
import React from 'react';
import Navbar from './Navbar'

 
interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}
 
const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Added flex flex-col for layout */}
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with proper top padding for fixed navbar */}
      <main className="flex-1 pt-[4rem] lg:pt-[8rem]"> {/* Adjusted padding */}
        {children}
      </main>
      
    </div>
  );
};
 
export default AuthenticatedLayout;
