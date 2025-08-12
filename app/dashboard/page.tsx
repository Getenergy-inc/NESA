"use client";

import React from 'react';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import DashboardRouter from '@/components/UI/Dashboard/DashboardRouter';

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute requireAuth={true}>
      <DashboardRouter />
    </ProtectedRoute>
  );
};

export default DashboardPage;
