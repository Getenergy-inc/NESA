import React from 'react';
import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  );
};

export default DashboardLayout;
