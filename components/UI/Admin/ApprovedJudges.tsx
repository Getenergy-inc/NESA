"use client"
import {useState, useEffect} from 'react'
import { getApprovedJudges } from "@/lib/services/getApprovedJudges";


type Judge = {
  id: string;
  full_name: string;
  experience?: string;
  email?: string;
  upload_document?: string;
  phone_number?: string;
  state_and_region?: string;
  motivation_statement?: string;
  education_background?: string;
  upload_profile_image?: string;
};

const ApprovedJudges = ({ selectApplicant }: any) => {
  const applicants = [
    { name: 'Savannah Nguyen', status: 'Accepted', date: '28/10/2012' },
    { name: 'Jacob Jones', status: 'Pending', date: '18/09/2016' },
    { name: 'Albert Flores', status: 'Denied', date: '18/09/2016' },
  ];
    const [remoteJudges, setRemoteJudges] = useState<Judge[]>([]);
  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const data = await getApprovedJudges();
        setRemoteJudges(data);
        console.log(data)
      } catch (err) {
        console.error("Failed to fetch judges:", err);
      }
    };

    fetchJudges();
  }, []);

  return (
    <div className="p-6 pt-20 mt-4 ">
      <h2 className="text-2xl font-semibold mb-4">Judges</h2>
      <table className="w-full text-left bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">S/N</th>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
            {/* {applicants.map((a, i) => (
            <tr key={i} className="border-t cursor-pointer hover:bg-gray-50" onClick={() => selectApplicant(a)}>
              <td className="p-3">{i + 1}</td>
              <td>{a.name}</td>
              <td>{a.status}</td>
              <td>{a.date}</td>
            </tr>
            ))} */}
            {remoteJudges.map((judge, i) => (
            <tr key={judge.id} className="border-t cursor-pointer hover:bg-gray-50" onClick={() => selectApplicant(judge)}>
              <td className="p-3">{i + 1}</td>
              <td>{judge.full_name}</td>
              <td>-</td>
              <td>-</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedJudges;