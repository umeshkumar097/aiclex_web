"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch("/api/projects/" + id, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-[#001341] capitalize">projects Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">name</th><th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">status</th><th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">assigned team</th><th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">deadline</th><th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">notes</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={7} className="p-10 text-center text-gray-400">No data found.</td></tr>
            ) : (
              data.map((item: any) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-bold text-gray-900">#{item.id}</td>
                  <td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{String(item.name || "-")}</td><td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{String(item.status || "-")}</td><td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{String(item.assigned_team || "-")}</td><td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{String(item.deadline || "-")}</td><td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{String(item.notes || "-")}</td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}