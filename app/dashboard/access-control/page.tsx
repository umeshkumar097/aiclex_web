"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, Mail, ShieldAlert, CheckCircle, 
  Trash2, UserCheck, Plus, RefreshCw, Copy, Link as LinkIcon,
  Pencil, Phone, X
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function AccessControlPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Edit / Delete State
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const userInfoStr = localStorage.getItem("user_info");
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        setCurrentUserId(userInfo.id);
      } catch (e) {}
    }
  }, []);

  const handleDeleteMember = async (userId: number, userName: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${userName}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ text: "User deleted successfully!", type: "success" });
        fetchData();
      } else {
        setMessage({ text: "Failed to delete user.", type: "error" });
      }
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  const openEditModal = (member: any) => {
    setEditingMember(member);
    setEditForm({
      name: member.name || "",
      email: member.email || "",
      phone: member.phone || "",
      role: member.role || "viewer"
    });
    setShowEditModal(true);
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingMember.id,
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          role: editForm.role
        })
      });

      if (res.ok) {
        setMessage({ text: "User updated successfully!", type: "success" });
        setShowEditModal(false);
        setEditingMember(null);

        // Sync local storage session if the admin edited their own profile
        const userInfoStr = localStorage.getItem("user_info");
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            if (userInfo.id === editingMember.id) {
              userInfo.name = editForm.name;
              userInfo.email = editForm.email;
              userInfo.role = editForm.role;
              localStorage.setItem("user_info", JSON.stringify(userInfo));
              window.location.reload();
              return;
            }
          } catch (e) {}
        }

        fetchData();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to update user details", type: "error" });
      }
    } catch (error) {
      console.error("Edit user save error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/invitations");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
        setInvitations(data.invitations || []);
      }
    } catch (error) {
      console.error("Failed to load access control details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Invitation sent successfully!", type: "success" });
        setEmail("");
        fetchData();
      } else {
        setMessage({ text: data.error || "Failed to send invitation", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Internal connection error. Please try again.", type: "error" });
    } finally {
      setInviting(false);
    }
  };

  const handleRevoke = async (id: number) => {
    if (!confirm("Are you sure you want to revoke this invitation? The link will no longer work.")) return;

    try {
      const res = await fetch(`/api/admin/invitations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to revoke invitation:", error);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole })
      });
      if (res.ok) {
        setMessage({ text: "Role updated successfully!", type: "success" });
        
        // Sync local storage if the logged-in user changed their own role
        const userInfoStr = localStorage.getItem("user_info");
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            if (userInfo.id === userId) {
              userInfo.role = newRole;
              localStorage.setItem("user_info", JSON.stringify(userInfo));
              window.location.reload();
              return;
            }
          } catch(e) {}
        }
        
        fetchData();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to update role", type: "error" });
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleCopyLink = (token: string, inviteId: number) => {
    const inviteLink = `${window.location.origin}/join-team?token=${token}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedId(inviteId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#001341]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-[#001341]">Access Control & Team</h1>
        <p className="text-gray-500 text-sm mt-1">
          Invite administrators and staff, configure roles, and monitor dashboard login credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* INVITE BOX */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold text-[#001341] mb-4 flex items-center gap-2">
              <Plus size={18} className="text-[#ff914d]" /> Invite Team Member
            </h3>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#001341] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Workspace Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#001341] outline-none cursor-pointer text-gray-700"
                >
                  <option value="admin">Administrator (Full Access)</option>
                  <option value="hr">HR Manager (Careers & Applications)</option>
                  <option value="sales">Sales Agent (CRM & Meetings)</option>
                  <option value="editor">Content Editor (Blogs & Portfolio)</option>
                  <option value="viewer">Viewer (Read-Only Overview)</option>
                </select>
              </div>

              {message.text && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  message.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-100" 
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}>
                  {message.type === "success" ? <CheckCircle size={14} /> : <ShieldAlert size={14} />}
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={inviting}
                className="w-full py-3.5 bg-[#001341] hover:bg-blue-900 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {inviting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending Invite...
                  </>
                ) : (
                  "Send Invitation Email"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* TEAM LISTS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PENDING INVITATIONS */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
              <h3 className="text-lg font-bold text-[#001341] flex items-center gap-2">
                <Mail size={18} className="text-[#ff914d]" /> Pending Invitations
              </h3>
              <button 
                onClick={fetchData} 
                className="p-2 text-gray-400 hover:text-[#001341] rounded-lg transition"
                title="Refresh lists"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-50">
                    <th className="py-2.5">Email</th>
                    <th className="py-2.5">Role</th>
                    <th className="py-2.5">Expires</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {invitations.map((invite) => (
                    <tr key={invite.id} className="hover:bg-gray-50/50">
                      <td className="py-3 font-semibold text-[#001341]">{invite.email}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[9px] font-bold rounded uppercase tracking-wider">
                          {invite.role}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-gray-400">
                        {new Date(invite.expires_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => handleCopyLink(invite.token, invite.id)}
                          className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition inline-flex items-center gap-1 text-xs font-bold"
                          title="Copy direct invite link"
                        >
                          {copiedId === invite.id ? (
                            <span className="text-green-600 text-[10px]">Copied!</span>
                          ) : (
                            <LinkIcon size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleRevoke(invite.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition inline-flex items-center"
                          title="Revoke invitation"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {invitations.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400 text-xs">
                        No pending team invitations.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIVE TEAM DIRECTORY */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#001341] mb-4 border-b border-gray-50 pb-3 flex items-center gap-2">
              <UserCheck size={18} className="text-[#5271ff]" /> Active Team Members
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-50">
                    <th className="py-2.5">Name</th>
                    <th className="py-2.5">Email</th>
                    <th className="py-2.5">Role</th>
                    <th className="py-2.5">Joined Date</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50/50">
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#5271ff] flex items-center justify-center font-black text-xs border border-blue-100 shadow-sm">
                            {member.name.charAt(0)}
                          </div>
                          <span className="font-bold text-[#001341]">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500">{member.email}</td>
                      <td className="py-4">
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          className="px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#001341] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5271ff] transition-all"
                        >
                          <option value="admin">Admin</option>
                          <option value="hr">HR Manager</option>
                          <option value="sales">Sales Agent</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                          <option value="client">Client</option>
                        </select>
                      </td>
                      <td className="py-4 text-xs text-gray-400">
                        {new Date(member.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 bg-gray-50 hover:bg-blue-50 hover:text-[#5271ff] rounded-lg transition inline-flex items-center"
                          title="Edit member details"
                        >
                          <Pencil size={14} />
                        </button>
                        {member.id !== currentUserId && (
                          <button
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition inline-flex items-center"
                            title="Delete user account"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400 text-xs">
                        No team members registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {showEditModal && editingMember && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-[#001341]/20 backdrop-blur-sm z-50"
              onClick={() => {
                setShowEditModal(false);
                setEditingMember(null);
              }}
            />

            {/* Modal Box */}
            <div className="fixed inset-x-4 top-24 max-w-md mx-auto bg-white rounded-3xl border border-gray-150 shadow-2xl z-[60] overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-[#001341] text-lg">Edit Team Member</h3>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMember(null);
                  }}
                  className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-red-500 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSave}>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5271ff] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5271ff] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editForm.phone || ""}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="e.g. +91 84494 88090"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5271ff] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Workspace Role
                    </label>
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5271ff] outline-none cursor-pointer"
                    >
                      <option value="admin">Administrator</option>
                      <option value="hr">HR Manager</option>
                      <option value="sales">Sales Agent</option>
                      <option value="editor">Content Editor</option>
                      <option value="viewer">Viewer</option>
                      <option value="client">Client</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-50 bg-gray-50 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#001341] hover:bg-blue-900 text-white rounded-xl text-sm font-bold shadow transition cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingMember(null);
                    }}
                    className="px-5 py-3 border border-gray-200 text-gray-700 hover:bg-white bg-white rounded-xl text-sm font-bold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
