import '@/lib/polyfills/globals'; // Must be the first import
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled to prevent global reference errors during static generation
const SignupFlow = dynamic(
  () => import('@/components/UI/Account/signup/SignupFlow'),
  { ssr: false }
);

export default function ComprehensiveSignupPage() {
  return (
    <main>
      <SignupFlow />
    </main>
  );
}

export const metadata = {
  title: 'Sign Up - NESA Africa',
  description: 'Join the NESA-Africa community. Create your account to participate in voting, nominations, and educational initiatives across Africa.',
  keywords: 'NESA Africa signup, education awards, African education, student nominations, voting platform',
};
