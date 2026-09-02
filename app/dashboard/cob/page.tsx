"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileSpreadsheet, FileText, Search, Filter, RefreshCw, CheckCircle2, Clock,
  Eye, Edit, Trash2, ChevronLeft, ChevronRight, User, Building2,
  Mail, Phone, MapPin, Globe, Sparkles, Download, Layers, ShieldCheck,
  Award, Target, Video, Share2, Briefcase, Lock, MessageSquare,
  AlertTriangle, Save, Check, Printer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminCobPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new_responses: 0,
    this_week: 0,
    this_month: 0,
    completed: 0,
    in_progress: 0,
  });

  // Filters & Search State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [status, setStatus] = useState("");
  const [goal, setGoal] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Selected Checkboxes for Bulk Export
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Active Detail View Modal
  const [activeClient, setActiveClient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(1);
  const [adminNotes, setAdminNotes] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Delete Confirmation Modal
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Fetch Submissions from API
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        ...(search && { search }),
        ...(category && { category }),
        ...(businessType && { business_type: businessType }),
        ...(status && { status }),
        ...(goal && { goal }),
      });

      const res = await fetch(`/api/cob/admin/submissions?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data || []);
        setStats(data.stats || {});
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (e) {
      console.error("Error fetching COB submissions:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [page, category, businessType, status, goal]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSubmissions();
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === submissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(submissions.map((s) => s.submission_id));
    }
  };

  // Excel Export API Handler
  const triggerExcelExport = async (export_type: "all" | "selected" | "single", singleId?: string) => {
    setIsExporting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const idsToExport = export_type === "single" ? [singleId] : selectedIds;

      const res = await fetch("/api/cob/admin/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ export_type, ids: idsToExport }),
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Aiclex_Coach_Onboarding_${export_type}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert("Failed to export Excel file. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Client PDF Generator using jsPDF & autoTable
  const generateClientPdf = (clientData: any) => {
    try {
      const doc = new jsPDF();

      // Header Banner (Aiclex Deep Navy)
      doc.setFillColor(0, 19, 65);
      doc.rect(0, 0, 210, 28, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("AICLEX TECHNOLOGIES", 14, 15);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Coach Social Media Onboarding & Business Discovery Report", 14, 22);

      // Client Overview Card Box
      doc.setTextColor(0, 19, 65);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Client: ${clientData.full_name || "N/A"} (${clientData.business_name || "N/A"})`, 14, 36);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Submission ID: ${clientData.submission_id}`, 14, 42);
      doc.text(`Phone: ${clientData.phone || "N/A"}  |  Email: ${clientData.email || "N/A"}`, 14, 47);
      doc.text(`Category: ${clientData.coaching_category || "N/A"}  |  Status: ${clientData.status || "New"}`, 14, 52);

      // Table Rows
      const payload = clientData.payload || {};
      const tableRows: any[] = [];

      Object.entries(payload).forEach(([key, value]) => {
        const cleanKey = key.replace(/sec\d+_/g, "").replace(/_/g, " ").toUpperCase();
        const cleanVal = Array.isArray(value) ? value.join(", ") : String(value || "N/A");
        tableRows.push([cleanKey, cleanVal]);
      });

      autoTable(doc, {
        startY: 58,
        head: [["Field / Question", "Response / Value"]],
        body: tableRows,
        headStyles: { fillColor: [0, 19, 65], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { top: 58, left: 14, right: 14 },
        styles: { overflow: "linebreak", cellWidth: "wrap", fontSize: 8 },
        columnStyles: { 0: { cellWidth: 60, fontStyle: "bold" }, 1: { cellWidth: 120 } },
      });

      doc.save(`Aiclex_COB_${clientData.submission_id}_${(clientData.full_name || "Client").replace(/\s+/g, "_")}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Failed to generate PDF document.");
    }
  };

  // Status Change API Handler
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const res = await fetch("/api/cob/admin/submissions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) =>
          prev.map((sub) => (sub.id === id || sub.submission_id === id ? { ...sub, status: newStatus } : sub))
        );
        if (activeClient && (activeClient.id === id || activeClient.submission_id === id)) {
          setActiveClient({ ...activeClient, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Admin Notes Save Handler
  const handleSaveNotes = async () => {
    if (!activeClient) return;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      await fetch("/api/cob/admin/submissions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: activeClient.id, admin_notes: adminNotes }),
      });
      alert("Admin notes saved successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Submission API Handler
  const handleDeleteSubmission = async () => {
    if (!deleteTargetId) return;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const res = await fetch(`/api/cob/admin/submissions?id=${deleteTargetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) => prev.filter((s) => s.id !== deleteTargetId && s.submission_id !== deleteTargetId));
        setDeleteTargetId(null);
        if (activeClient && (activeClient.id === deleteTargetId || activeClient.submission_id === deleteTargetId)) {
          setActiveClient(null);
        }
      }
    } catch (e) {
      alert("Failed to delete record.");
    }
  };

  const openClientDetails = async (sub: any) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const res = await fetch(`/api/cob/admin/submissions/${sub.submission_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setActiveClient(data.data);
        setAdminNotes(data.data.admin_notes || "");
        setActiveTab(1);
      } else {
        setActiveClient(sub);
        setAdminNotes(sub.admin_notes || "");
      }
    } catch (e) {
      setActiveClient(sub);
      setAdminNotes(sub.admin_notes || "");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#5271ff] text-xs font-black uppercase tracking-wider">
              Aiclex Technologies COB Portal
            </span>
            <span className="text-xs text-gray-400 font-semibold">• Coach Discovery</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#001341]">
            COB - Coach Onboarding & Social Media Submissions
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Manage, filter, review and download client onboarding profiles in Excel (.xlsx) and PDF format.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerExcelExport("all")}
            disabled={isExporting}
            className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
          >
            <FileSpreadsheet size={16} />
            <span>{isExporting ? "Exporting..." : "Download All Excel (.xlsx)"}</span>
          </button>

          <Link
            href="/cob"
            target="_blank"
            className="py-3 px-5 bg-[#001341] hover:bg-[#5271ff] text-white rounded-2xl font-black text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
          >
            <Eye size={16} />
            <span>Open Public Form</span>
          </Link>
        </div>
      </div>

      {/* OVERVIEW KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "Total Responses", value: stats.total || 0, color: "text-[#001341]", bg: "bg-blue-50 border-blue-100" },
          { label: "New Responses", value: stats.new_responses || 0, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          { label: "This Week", value: stats.this_week || 0, color: "text-blue-600", bg: "bg-indigo-50 border-indigo-100" },
          { label: "This Month", value: stats.this_month || 0, color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
          { label: "In Progress", value: stats.in_progress || 0, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
          { label: "Completed", value: stats.completed || 0, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
        ].map((card, idx) => (
          <div key={idx} className={`p-5 rounded-3xl border ${card.bg} shadow-sm space-y-1`}>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">{card.label}</span>
            <div className={`text-2xl font-black ${card.color}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name, Business, Email, Phone, City, or Submission ID..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold text-[#001341] placeholder-gray-400 focus:outline-none focus:border-[#5271ff]"
            />
          </div>

          <button
            type="submit"
            className="py-3 px-6 bg-[#001341] hover:bg-[#5271ff] text-white rounded-2xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search size={14} /> Search
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#001341]"
          >
            <option value="">All Coaching Categories</option>
            {["Career", "Business", "Fitness", "Life", "Relationship", "Finance", "Education", "Sales", "Marketing", "Leadership", "Other"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#001341]"
          >
            <option value="">All Business Types</option>
            {["Personal Brand", "Coaching Institute", "Online Coaching", "Offline Coaching", "Hybrid", "Other"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#001341]"
          >
            <option value="">All Statuses</option>
            {["New", "Reviewed", "In Progress", "Completed"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#001341]"
          >
            <option value="">All Goals</option>
            {["Generate Leads", "Book Discovery Calls", "Sell Coaching Programs", "Build Personal Brand", "Increase Followers"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-4 text-amber-900">
          <span className="text-xs font-black">
            {selectedIds.length} submission(s) selected
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerExcelExport("selected")}
              disabled={isExporting}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet size={14} /> Download Selected Excel
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs font-bold text-gray-500 hover:text-gray-800"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* SUBMISSIONS TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-bold flex items-center justify-center gap-3">
            <RefreshCw size={20} className="animate-spin text-[#5271ff]" />
            Loading onboarding submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-bold space-y-3">
            <FileText size={48} className="mx-auto text-gray-300" />
            <p>No coach onboarding submissions match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-black uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === submissions.length && submissions.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-[#5271ff] focus:ring-[#5271ff]"
                    />
                  </th>
                  <th className="py-4 px-4">Submission ID</th>
                  <th className="py-4 px-4">Client / Brand</th>
                  <th className="py-4 px-4">Contact Details</th>
                  <th className="py-4 px-4">Category & Type</th>
                  <th className="py-4 px-4">Primary Goal</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Downloads & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {submissions.map((sub) => {
                  const isChecked = selectedIds.includes(sub.submission_id);

                  return (
                    <tr key={sub.id} className="hover:bg-blue-50/30 transition">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(sub.submission_id)}
                          className="rounded border-gray-300 text-[#5271ff] focus:ring-[#5271ff]"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono font-black text-[#5271ff]">{sub.submission_id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-black text-[#001341]">{sub.full_name}</div>
                          <div className="text-[11px] text-gray-500 font-semibold">{sub.business_name}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 space-y-0.5">
                        <div className="text-gray-700 font-semibold">{sub.email}</div>
                        <div className="text-gray-500 text-[11px]">{sub.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#001341]">{sub.coaching_category || "N/A"}</div>
                        <div className="text-[11px] text-gray-400">{sub.business_type || "N/A"}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-700">{sub.primary_goal || "N/A"}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-500 font-medium">
                        {sub.created_at ? new Date(sub.created_at).toLocaleDateString("en-IN") : "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={sub.status || "New"}
                          onChange={(e) => handleUpdateStatus(sub.id, e.target.value)}
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-current cursor-pointer ${
                            sub.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : sub.status === "In Progress"
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : sub.status === "Reviewed"
                              ? "bg-purple-50 text-purple-600 border-purple-200"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => openClientDetails(sub)}
                          className="p-2 rounded-xl bg-blue-50 text-[#5271ff] hover:bg-blue-100 transition cursor-pointer"
                          title="View Complete Profile"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => generateClientPdf(sub)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                          title="Download PDF Report"
                        >
                          <FileText size={14} />
                        </button>
                        <button
                          onClick={() => triggerExcelExport("single", sub.submission_id)}
                          className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition cursor-pointer"
                          title="Download Excel (.xlsx)"
                        >
                          <FileSpreadsheet size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(sub.id)}
                          className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* FULL CLIENT PROFILE MODAL */}
      <AnimatePresence>
        {activeClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6">
            <div
              className="fixed inset-0 bg-[#001341]/40 backdrop-blur-sm"
              onClick={() => setActiveClient(null)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-4xl h-full bg-white rounded-none md:rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden text-[#001341]"
            >
              {/* MODAL HEADER */}
              <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-[#001341] text-white">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                      {activeClient.submission_id}
                    </span>
                    <span className="text-xs text-gray-300">
                      Submitted {new Date(activeClient.created_at).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black">{activeClient.full_name}</h2>
                  <p className="text-xs text-gray-300 font-semibold mt-0.5">
                    {activeClient.business_name} • {activeClient.coaching_category} ({activeClient.business_type})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateClientPdf(activeClient)}
                    className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FileText size={14} /> Download PDF
                  </button>
                  <button
                    onClick={() => triggerExcelExport("single", activeClient.submission_id)}
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FileSpreadsheet size={14} /> Excel
                  </button>
                  <button
                    onClick={() => setActiveClient(null)}
                    className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* MODAL SECTION TABS */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide text-xs font-bold">
                {[
                  "1. Business", "2. Coaching Offer", "3. Audience", "4. Social Media",
                  "5. Content & Brand", "6. Goals", "7. Competitors", "8. Positioning",
                  "9. Sales Process", "10. Marketing & Ads", "11. Testimonials", "12. Assets",
                  "13. Restrictions", "14. Process", "15. Vision & Notes"
                ].map((tName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx + 1)}
                    className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
                      activeTab === idx + 1
                        ? "bg-[#001341] text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tName}
                  </button>
                ))}
              </div>

              {/* MODAL BODY SCROLL CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-[#001341]">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="font-black text-base text-[#001341] border-b pb-2">
                    Section {activeTab} Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(activeClient.payload || {})
                      .filter(([key]) => key.startsWith(`sec${activeTab}_`))
                      .map(([key, val]) => {
                        const label = key
                          .replace(`sec${activeTab}_`, "")
                          .replace(/_/g, " ")
                          .toUpperCase();

                        return (
                          <div key={key} className="bg-white p-3.5 rounded-xl border border-gray-200">
                            <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">
                              {label}
                            </span>
                            <span className="font-semibold text-gray-800 break-words">
                              {Array.isArray(val) ? val.join(", ") : val?.toString() || "N/A"}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* INTERNAL ADMIN NOTES & STATUS BLOCK */}
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-[#001341]">Internal Admin Notes & Status</h4>
                    <button
                      onClick={handleSaveNotes}
                      className="py-1.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black flex items-center gap-1 transition cursor-pointer"
                    >
                      <Save size={14} /> Save Notes
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes about this client's onboarding..."
                    className="w-full bg-white border border-amber-300 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-amber-500 text-gray-800"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#001341]/40 backdrop-blur-sm" onClick={() => setDeleteTargetId(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-black text-[#001341]">Confirm Deletion</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Are you sure you want to permanently delete this onboarding submission?
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubmission}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
