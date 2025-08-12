import React, { useEffect, useState } from "react";
import SkeletonLoader from '@/components/UI/SkeletonLoader';
import Image from 'next/image';
import { getVolunteers, Volunteer } from '@/lib/services/getVolunteers';

const VolunteersPanel = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getVolunteers();
        setVolunteers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch volunteers');
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  return (
    <div className="p-6 w-full pt-28">
      <h2 className="text-2xl font-semibold mb-6">Volunteers</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">List of Volunteers</h3>
        </div>
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : volunteers.length === 0 ? (
          <div className="text-gray-500 py-4 text-center">No volunteers found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">S/N</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Region</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v: Volunteer, i: number) => (
                <tr key={v.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="py-2">{i + 1}</td>
                  <td>
                    {v.image ? (
                      <Image src={v.image} alt={v.fullName} width={40} height={40} className="rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">?</div>
                    )}
                  </td>
                  <td>{v.fullName}</td>
                  <td>{v.email}</td>
                  <td>{v.phoneNumber}</td>
                  <td>{v.stateOrRegion}</td>
                  <td>{v.createdAt ? new Date(v.createdAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteersPanel;
