"use client"
import {useState, useEffect} from 'react'
import { getjudgesapplicants } from "@/lib/services/getjugdesApplicants";
import { cn } from "@/lib/utils/util";



type Judge = {
  id: string; 
  fullName: string;
  email: string;
  phoneNumber: string;
  region: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicationCount: string;
  latestCreatedAt: string;
};

type GetJudgesResponse = {
  totalApplications: number;
  totalApproved: number;
  totalPending: number;
  totalDenied: number;
  applicants: Judge[];
};

const JudgesApplications = ({ selectApplicant }: any) => {
  const applicants = [
    { name: 'Savannah Nguyen', status: 'Accepted', date: '28/10/2012' },
    { name: 'Jacob Jones', status: 'Pending', date: '18/09/2016' },
    { name: 'Albert Flores', status: 'Denied', date: '18/09/2016' },
  ];
    const [remoteJudges, setRemoteJudges] = useState<GetJudgesResponse | null>(null);
  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const data = await getjudgesapplicants();
        setRemoteJudges(data);
        console.log(data)
      } catch (err) {
        alert("Failed to fetch judges: " + err);
        console.error("Failed to fetch judges:", err);
      }
    };

    fetchJudges();
  }, []);

  return (
    <div className="p-6 pt-20 mt-4 ">
      <h2 className="font-poppins font-medium text-[24px] leading-[36px] tracking-normal mb-4">Judges Applicants Overview</h2>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <StatCard
                      title="Total Applications"
                      count={remoteJudges ? remoteJudges.totalApplications : 0}
                      change="100%"
                    />
                    <StatCard
                      title="Accepted"
                      count={remoteJudges ? remoteJudges.totalApproved : 0}
                      change={
                        remoteJudges && remoteJudges.totalApplications > 0
                          ? `${((remoteJudges.totalApproved / remoteJudges.totalApplications) * 100).toFixed(1)}%`
                          : "0%"
                      }
                    />
                    <StatCard
                      title="Pending"
                      count={remoteJudges ? remoteJudges.totalPending : 0}
                      change={
                        remoteJudges && remoteJudges.totalApplications > 0
                          ? `${((remoteJudges.totalPending / remoteJudges.totalApplications) * 100).toFixed(1)}%`
                          : "0%"
                      }
                    />
                    <StatCard
                      title="Denied"
                      count={remoteJudges ? remoteJudges.totalDenied : 0}
                      change={
                        remoteJudges && remoteJudges.totalApplications > 0
                          ? `${((remoteJudges.totalDenied / remoteJudges.totalApplications) * 100).toFixed(1)}%`
                          : "0%"
                      }
                    />
                  </div>


      <table className="w-full text-left bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>

            {remoteJudges &&
              Array.isArray(remoteJudges.applicants) && remoteJudges.applicants.length > 0 ? (
                remoteJudges.applicants.map((judge, judgeIdx) => (
                  <tr
                    key={judgeIdx}
                    className="border-t cursor-pointer hover:bg-gray-50"
                    onClick={() => selectApplicant(judge.id)}
                  >
                    <td className="p-3">{judgeIdx + 1}</td>
                    <td>{judge.fullName}</td>
                    <td>{judge.email}</td>
                    <td>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          judge.status === "Accepted"
                            ? "bg-[#00B215] text-[#00B215]"
                            : "bg-yellow-100 text-yellow-600"
                        )}
                      >
                        {judge.status}
                      </span>
                    </td>
                    <td>{judge.createdAt}</td>
                  </tr>
                ))
              ) : null}
        </tbody>
      </table>
    </div>
  );
};

type StatCardProps = {
  title: string;
  count: string | number;
  change: string;
};

function StatCard({ title, count, change }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-green-500 text-sm">▲ {change}</div>
    </div>
  );
}


export default JudgesApplications;