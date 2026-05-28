"use client";

import { useState, useEffect } from "react";
import { Loader2, User, Key, Search, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(data => {
        if (data.users) setUsers(data.users);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImpersonate = (user: any) => {
    // We already have admin_token. We just temporarily override user_info to the target user.
    localStorage.setItem("user_info", JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: 'admin' // Keep admin role so they see the impersonation banner and can bypass checks
    }));
    router.push("/client");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="animate-spin text-[#001341]" size={40} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#001341]">User Management</h1>
          <p className="text-gray-500 text-sm">Manage clients, admins, and impersonate accounts.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Name</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Email</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Role</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Joined</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-[#5271ff] flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-[#001341]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleImpersonate(user)}
                      className="px-3 py-1.5 bg-[#001341] text-white rounded-lg text-xs font-bold hover:bg-[#5271ff] transition-colors"
                    >
                      Login As
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
