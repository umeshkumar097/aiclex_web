"use client";
import { useState, useEffect } from "react";
import { Trash2, Loader2, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobapplicationsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/job-applications");
      const json = await res.json();
      setData(Array.isArray(json) ? json : json.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch("/api/job-applications/" + id, { method: "DELETE" });
    fetchData();
    router.refresh();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-[#001341] capitalize">Job Applications</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                    <th className="p-6">Applicant</th>
                    <th className="p-6">Job Applied For</th>
                    <th className="p-6">Resume / Date</th>
                    <th className="p-6 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center">
                                    {item.full_name?.charAt(0) || "A"}
                                </div>
                                <div>
                                    <p className="font-bold text-[#001341] leading-none mb-1">{item.full_name}</p>
                                    <p className="text-xs text-gray-400 truncate max-w-xs">{item.email}</p>
                                </div>
                            </div>
                        </td>
                        <td className="p-6">
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-wide">{item.job_title}</span>
                        </td>
                        <td className="p-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(item.applied_at).toLocaleDateString()}</span>
                                {item.resume_url && (
                                  <a href={`https://pub-cf694bda2bc743cbb8a2fb380596ff1e.r2.dev/${item.resume_url}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 font-bold flex items-center gap-1 hover:underline">
                                      <Download size={12} /> View Resume
                                  </a>
                                )}
                            </div>
                        </td>
                        <td className="p-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(item.id)} className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr><td colSpan={4} className="p-10 text-center text-gray-400">No applications found.</td></tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}