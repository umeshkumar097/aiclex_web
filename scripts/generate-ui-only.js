const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'blog', singular: 'blog', fields: ['title', 'category'] },
  { name: 'team', singular: 'team', fields: ['name', 'role'] },
  { name: 'jobs', singular: 'job', fields: ['title', 'department', 'location'] },
  { name: 'job-applications', singular: 'application', fields: ['name', 'email', 'phone', 'role'] },
  { name: 'short-links', singular: 'link', fields: ['original_url', 'short_id'] }
];

const pageTemplate = (m) => `"use client";
import { useState, useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";

export default function ${m.name.charAt(0).toUpperCase() + m.name.slice(1).replace(/-/g, '')}Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/${m.name}");
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
    await fetch("/api/${m.name}/" + id, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-[#001341] capitalize">${m.name.replace(/-/g, ' ')} Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              ${m.fields.map(f => '<th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">' + f.replace(/_/g, " ") + '</th>').join("")}
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={${m.fields.length + 2}} className="p-10 text-center text-gray-400">No data found.</td></tr>
            ) : (
              data.map((item: any) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-bold text-gray-900">#{item.id}</td>
                  ${m.fields.map(f => '<td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{String(item.' + f + ' || "-")}</td>').join("")}
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
}`;

modules.forEach(m => {
  // Fix folder names for some specific modules to match sidebar links
  const folderName = m.name === 'job-applications' ? 'applications' : (m.name === 'short-links' ? 'links' : (m.name === 'blog' ? 'blogs' : m.name));
  
  const pageDir = path.join(__dirname, '..', 'app', 'dashboard', folderName);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageTemplate(m));

  console.log("Generated UI for " + folderName);
});
