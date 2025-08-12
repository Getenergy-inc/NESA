import { useEffect, useState } from "react";
import { getNomineeDetail } from "@/lib/services/getNomineeDetail";

const NomineeDetail = ({ applicant: id, goBack }: { applicant: string; goBack: () => void }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchNominee = async () => {
      try {
    const data = await getNomineeDetail(id)
      setData(data);
      setLoading(false);
      console.log(data)
   } catch (err) {
        alert("Failed to fetch nominee details")
        setError("Failed to fetch nominee details")
        setLoading(false);
      }
    }
    fetchNominee();
  }, []);

  if (loading) return <div className="p-6 pt-20">Loading...</div>;
  if (error) return <div className="p-6 pt-20 text-red-500">
      <div className="text-sm text-gray-600 cursor-pointer" onClick={goBack}>&larr; Back</div>
    <div>{error}</div>;
    </div>
  if (!data) return <div className="p-6 pt-20">No data found.</div>;

  return (
    <div className="p-6 pt-20 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl">
        <button
          className="mb-6 flex items-center text-sm text-blue-600 hover:underline"
          onClick={goBack}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mr-4">
              {data.name?.trim().split(" ").map((n: string) => n[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{data.name?.trim() || "-"}</h2>
              <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium mt-1 ${
                data.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : data.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {data.status || "Unknown"}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <div className="text-gray-800 font-medium">{data.email || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <div className="text-gray-800">{data.category || "-"}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Subcategory</label>
                <div className="text-gray-800">{data.subCategory || "-"}</div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Achievements</label>
              <div className="text-gray-800">{data.achievements || "-"}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Document</label>
              {data.document ? (
                <a
                  href={data.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              ) : (
                <span className="text-gray-400">No document uploaded</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Created At</label>
                <div className="text-gray-800">{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "-"}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Last Updated</label>
                <div className="text-gray-800">{data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineeDetail;