import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const AdminLoginClient = dynamic(() => import('./client-wrapper'), {
  ssr: false,
});

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}