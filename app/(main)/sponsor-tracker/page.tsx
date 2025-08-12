import SponsorTracker from '@/components/UI/SponsorDashboard/SponsorTracker';

export default function SponsorTrackerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sponsorship Application Tracker
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track the status of your NESA-Africa 2025 sponsorship application. 
            Enter your application ID to view current status, payment information, and next steps.
          </p>
        </div>
        
        <SponsorTracker />
      </div>
    </div>
  );
}