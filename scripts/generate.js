const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'projects', singular: 'project', fields: ['name', 'status', 'assigned_team', 'deadline', 'notes'] },
  { name: 'meetings', singular: 'meeting', fields: ['client_name', 'email', 'meeting_link', 'status', 'notes', 'meeting_date'] },
  { name: 'testimonials', singular: 'testimonial', fields: ['client_name', 'rating', 'review', 'is_visible'] },
  { name: 'portfolio', singular: 'portfolio', fields: ['project_name', 'industry', 'before_image_url', 'after_image_url', 'results'] },
  { name: 'newsletters', singular: 'newsletter', fields: ['email', 'status'] },
  { name: 'enquiries', singular: 'enquiry', fields: ['name', 'email', 'phone', 'type', 'message', 'status'] },
  { name: 'activity_logs', singular: 'activity_log', fields: ['admin_name', 'action', 'details'] }
];

const apiTemplate = (m) => `import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM ${m.name} ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ${m.name}" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cols = Object.keys(data).join(", ");
    const vals = Object.values(data);
    const placeholders = vals.map((_, i) => "$" + (i + 1)).join(", ");
    
    const { rows } = await pool.query(
      "INSERT INTO ${m.name} (" + cols + ") VALUES (" + placeholders + ") RETURNING *",
      vals
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ${m.singular}" }, { status: 500 });
  }
}`;

const apiIdTemplate = (m) => `import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const setClause = Object.keys(data).map((k, i) => k + " = $" + (i + 1)).join(", ");
    const vals = [...Object.values(data), id];
    
    const { rows } = await pool.query(
      "UPDATE ${m.name} SET " + setClause + " WHERE id = $" + vals.length + " RETURNING *",
      vals
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update ${m.singular}" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await pool.query("DELETE FROM ${m.name} WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete ${m.singular}" }, { status: 500 });
  }
}`;

const pageTemplate = (m) => `"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";

export default function ${m.name.charAt(0).toUpperCase() + m.name.slice(1)}Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/${m.name}");
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
    await fetch("/api/${m.name}/" + id, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="animate-fade-in p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-[#001341] capitalize">${m.name} Management</h2>
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
  const apiDir = path.join(__dirname, '..', 'app', 'api', m.name);
  if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir, { recursive: true });
  fs.writeFileSync(path.join(apiDir, 'route.ts'), apiTemplate(m));

  const apiIdDir = path.join(apiDir, '[id]');
  if (!fs.existsSync(apiIdDir)) fs.mkdirSync(apiIdDir, { recursive: true });
  fs.writeFileSync(path.join(apiIdDir, 'route.ts'), apiIdTemplate(m));

  const pageDir = path.join(__dirname, '..', 'app', 'dashboard', m.name);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageTemplate(m));

  console.log("Generated " + m.name + " module.");
});
