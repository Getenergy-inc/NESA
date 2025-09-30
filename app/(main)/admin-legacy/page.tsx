'use client';

import { useState } from 'react';
import Sidebar from '@/components/UI/Admin/Sidebar';
import NominationPanel from '@/components/UI/Admin/NominationPanel';
import VotingPanel from '@/components/UI/Admin/VotingPanel';
import JudgesApplications from '@/components/UI/Admin/JudgesApplication';
import JudgeDetail from '@/components/UI/Admin/JudgeDetail';
import ApprovedJudges from '@/components/UI/Admin/ApprovedJudges';
import { useEffect } from 'react';
import NomineeDetail from '@/components/UI/Admin/nomineeDetail';
import VolunteersPanel from '@/components/UI/Admin/VolunteersPanel';
import { useAuth } from '@/lib/hooks/useAuth';
export default function AdminDashboard() {
  const { user } = useAuth();
    console.log(user)

  const [selected, setSelected] = useState(() => {
      if (typeof window !== 'undefined') {
  return localStorage.getItem('admin_selected_panel') || 'Nomination';
      }
});
  const [applicant, setApplicant] = useState<string | null>(null);
    useEffect(() => {
      if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_selected_panel');
      if (saved) setSelected(saved);
      }

    }, []);
    // Persist selected panel in localStorage
    useEffect(() => {
      if (typeof window !== 'undefined') {
      localStorage.setItem('admin_selected_panel', selected || 'Nomination');
      }
    }, [selected]);
  // Handle content switching
  const renderContent = () => {
    switch (selected) {
      case 'Nomination':
        return applicant ? (
          <NomineeDetail applicant={applicant} goBack={() => setApplicant(null)} />
        ) : (
         <NominationPanel selectApplicant={setApplicant}/>
        );
      case 'Judges/Judges':
        return <ApprovedJudges selectApplicant={setApplicant} />;                 
      case 'Judges/Applications':
        return applicant ? (
          <JudgeDetail applicant={applicant} goBack={() => setApplicant(null)} />
        ) : (
          <JudgesApplications selectApplicant={setApplicant} />
        );
      case 'Voting':
        return <VotingPanel />;
      case 'Volunteers':
        return <VolunteersPanel />;
      default:
        return (
          <div className="p-6 pt-20 text-xl font-medium">
            {selected} content coming soon, hold...
          </div>
        );
    }
  };

  // Restrict access to Admins only
  if (!user || user.role !== "Admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600 font-semibold">
          Unauthorized: Admin access only.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar selected={selected} setSelected={setSelected} />
      <main className="flex-1 pt-20 overflow-y-auto bg-gray-50">{renderContent()}</main>
    </div>
  );
}







