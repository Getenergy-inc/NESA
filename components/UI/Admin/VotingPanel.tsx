import { cn } from "@/lib/utils/util";

const VotingPanel = () => (
<div className="p-6 w-full pt-28">
          <h2 className="text-2xl font-semibold mb-6">Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard title="Total votes" count="1,456" change="4.8%" />
           {/* <StatCard title="Accepted votes" count="986" change="4.8%" />
            <StatCard title="Pending votes" count="470" change="4.8%" />  */}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl fofstsat-medium">List of votes</h3>              <div className="flex gap-2">
                <button className="border px-2 py-1 rounded text-sm">Filters</button>
                <button className="border px-2 py-1 rounded text-sm">Sort By</button>
                <button className="bg-black text-white px-3 py-1 rounded text-sm">Export</button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">S/N</th>
                  <th>Name</th>
                  <th>Sub-Category</th>
                  <th>No of votes</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {votes.map((n, i) => (
                  <tr key={i} className="border-b text-sm">
                    <td className="py-2">{i + 1}</td>
                    <td>{n.name}</td>
                    <td>{n.subCategory}</td>
                    <td>{n.count}</td>
      
                    <td>{n.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
);
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
const votes = [
  { name: "Oluwole Bankole Adams", subCategory: "Olivia Rhye", count: 1, status: "Pending", date: "23/04/2024" },
  { name: "MTN Nigeria", subCategory: "Olivia Rhye", count: 23, status: "Accepted", date: "07/05/2016" },
  { name: "Greener Africa Initiative", subCategory: "Olivia Rhye", count: 15, status: "Pending", date: "18/09/2016" },
  { name: "Greener Africa Initiative", subCategory: "Olivia Rhye", count: 89, status: "Accepted", date: "12/06/2020" },
  { name: "Greener Africa Initiative", subCategory: "Olivia Rhye", count: 90, status: "Pending", date: "15/08/2017" },
  { name: "Greener Africa Initiative", subCategory: "Olivia Rhye", count: 123, status: "Pending", date: "16/08/2013" },
  { name: "Greener Africa Initiative", subCategory: "Olivia Rhye", count: 30, status: "Pending", date: "28/10/2012" },
];
export default VotingPanel;

