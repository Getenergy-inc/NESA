'use client';

// Define global for browser environment
if (typeof window !== 'undefined' && typeof global === 'undefined') {
  (window as any).global = window;
}

import AdminLoginPage from './page';

export default function AdminLoginWrapper() {
  return <AdminLoginPage />;
}