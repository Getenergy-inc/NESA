import NRCDashboard from '@/components/UI/nrc/NRCDashboard';
import NRCProtectedRoute from '@/components/Common/NRCProtectedRoute';

export default function Page() {
  return (
    <NRCProtectedRoute>
      <NRCDashboard />
    </NRCProtectedRoute>
  );
}

export const metadata = {
  title: 'NRC Dashboard - NESA Africa',
  description: 'NRC Volunteer Dashboard for managing nominee research and tracking progress.',
  keywords: 'NRC dashboard, volunteer dashboard, nominee research, NESA research corps',
};
