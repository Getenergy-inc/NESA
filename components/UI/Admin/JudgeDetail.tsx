import { useEffect, useState } from "react";
import { getJudgeDetail } from "@/lib/services/getJudgeDetail";
import { approveJudge } from "@/lib/services/approveJudge";
import { declineJudge } from "@/lib/services/declineJudge";

const JudgeDetail = ({ applicant: id, goBack }: { applicant: string; goBack: () => void }) => {
  const [judge, setJudge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchJudge = async () => {
      try {
        const data = await getJudgeDetail(id)
        setJudge(data)
        setLoading(false);
        console.log(data);
      } catch (err) {
        alert("Failed to fetch Judge details")
        setError("Failed to fetch Judge details")
        setLoading(false);
      }
    }
    fetchJudge();
  }, [id]);

  const handleApprove = async () => {
    if (!judge?.id) return;
    setActionLoading(true);
    setActionMessage(null);
    try {
      const res = await approveJudge(judge.id);
      setActionMessage(res.message || "Judge approved successfully.");
    } catch (err) {
      setActionMessage("Failed to approve judge.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = async () => {
    if (!judge?.id) return;
    setActionLoading(true);
    setActionMessage(null);
    try {
      const res = await declineJudge(judge.id);
      setActionMessage(res.message || "Judge declined successfully.");
    } catch (err) {
      setActionMessage("Failed to decline judge.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading...
      <div className="text-sm text-gray-600 cursor-pointer" onClick={goBack}>&larr; Back</div>
  </div>;
  if (error) return <div>{error}
      <div className="text-sm text-gray-600 cursor-pointer" onClick={goBack}>&larr; Back</div>
  </div>;
  if (!judge) return <div>No data found. 
      <div className="text-sm text-gray-600 cursor-pointer" onClick={goBack}>&larr; Back</div>
  </div>;

  return (
    <div className="p-0 pt-0 bg-[#FAFAFA] min-h-screen">
      {/* Header */}
      <div className="flex items-center px-8 pt-8 pb-2">
        <span
          className="text-[#222] text-[15px] font-normal cursor-pointer flex items-center"
          onClick={goBack}
        >
          <svg width="20" height="20" fill="none" className="mr-1">
            <path d="M13 16l-4-4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Application Details/
        </span>
        <span className="ml-2 text-[#B0B0B0] text-[15px] font-medium">{judge.fullName}</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-[12px] shadow-md mx-auto mt-6 max-w-3xl px-8 py-8">
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            className="bg-[#F5F5F5] text-[#222] px-6 py-2 rounded-[6px] font-medium border border-[#E5E5E5] hover:bg-[#f0f0f0] transition"
            onClick={handleDecline}
            disabled={actionLoading}
          >
            {actionLoading ? "Processing..." : "Decline Application"}
          </button>
          <button
            className="bg-[#F6B31B] text-white px-6 py-2 rounded-[6px] font-medium hover:bg-[#e2a10a] transition"
            onClick={handleApprove}
            disabled={actionLoading}
          >
            {actionLoading ? "Processing..." : "Approve Application"}
          </button>
        </div>
        {actionMessage && (
          <div className="text-center text-sm mt-2 text-blue-700">{actionMessage}</div>
        )}

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-[#222] text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <div>
              <div className="text-xs text-[#888] mb-1">Full Name</div>
              <div className="text-[15px] text-[#222] font-medium">{judge.fullName}</div>
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">Email</div>
              <div className="text-[15px] text-[#222] font-medium">{judge.email}</div>
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">Phone Number</div>
              <div className="text-[15px] text-[#222] font-medium">{judge.phoneNumber || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">State/Region</div>
              <div className="text-[15px] text-[#222] font-medium">{judge.region || "-"}</div>
            </div>
          </div>
        </div>

        {/* Career Information */}
        <div>
          <h3 className="text-[#222] text-lg font-semibold mb-4">Career Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <div>
              <div className="text-xs text-[#888] mb-1">Educational Background</div>
              <div className="text-[15px] text-[#222] font-medium">{judge.educationBackground || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">Experience</div>
              <div className="text-[15px] text-[#222] font-medium">{judge.experience || "-"}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-[#888] mb-1">Motivational Statement</div>
            <div className="text-[15px] text-[#222] font-normal whitespace-pre-line">
              {judge.motivationStatement || "-"}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-[#888] mb-1">Uploaded CV</div>
            {judge.document ? (
              <div className="flex items-center bg-[#F5F5F5] rounded px-4 py-2 w-fit">
                <svg width="20" height="20" fill="none" className="mr-2">
                  <rect width="20" height="20" rx="4" fill="#E5E5E5"/>
                  <path d="M7 8V6a2 2 0 012-2h2a2 2 0 012 2v2" stroke="#888" strokeWidth="1.2"/>
                  <rect x="5" y="8" width="10" height="8" rx="2" stroke="#888" strokeWidth="1.2"/>
                </svg>
                <a
                  href={judge.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#222] text-[15px] font-medium underline"
                >
                  {judge.document.split("/").pop()}
                </a>
                {/* Remove button (not functional, just for UI) */}
                <button className="ml-2">
                  <svg width="18" height="18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#B0B0B0" strokeWidth="1"/>
                    <path d="M6 6l6 6M12 6l-6 6" stroke="#B0B0B0" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-[#B0B0B0] text-[15px]">No CV uploaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;