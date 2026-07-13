"use client";

import { useState, useEffect } from "react";
import { 
  Users, MessageSquare, Phone, CheckCircle, Filter, 
  Download, Globe, Calendar as CalendarIcon, Pencil, 
  AlertTriangle, Search, Plus, Bell, ChevronRight, X, 
  Trash2, Mail, PhoneCall, Calendar, Tag, ShieldCheck, 
  MessageCircle, BarChart3, TrendingUp, DollarSign, Award,
  Clock, Activity, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, Cell, FunnelChart, Funnel
} from "recharts";

// Modern SaaS Color Palette Definitions
const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  new: { bg: "bg-blue-50/75 border-blue-100", text: "text-blue-700", dot: "bg-blue-600" },
  contacted: { bg: "bg-amber-50/75 border-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  qualified: { bg: "bg-purple-50/75 border-purple-100", text: "text-purple-700", dot: "bg-purple-600" },
  proposal: { bg: "bg-indigo-50/75 border-indigo-100", text: "text-indigo-700", dot: "bg-indigo-600" },
  negotiation: { bg: "bg-sky-50/75 border-sky-100", text: "text-sky-700", dot: "bg-sky-500" },
  won: { bg: "bg-emerald-50/75 border-emerald-100", text: "text-emerald-700", dot: "bg-emerald-600" },
  lost: { bg: "bg-rose-50/75 border-rose-100", text: "text-rose-700", dot: "bg-rose-600" },
  followup: { bg: "bg-teal-50/75 border-teal-100", text: "text-teal-700", dot: "bg-teal-600" },
  no_response: { bg: "bg-slate-100 border-slate-200", text: "text-slate-600", dot: "bg-slate-500" }
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-red-500 bg-red-50 border-red-100",
  medium: "text-amber-500 bg-amber-50 border-amber-100",
  low: "text-blue-500 bg-blue-50 border-blue-100"
};

export default function CrmPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // Modals / Drawers states
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Filters State
  const [crmFilters, setCrmFilters] = useState({ 
    name: "", phone: "", date: "", source: "", city: "", service: "", status: "" 
  });

  // Quick Add Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: "", email: "", whatsapp: "", requirement: "", service: "", city: "", expected_value: "50000", priority: "medium"
  });

  useEffect(() => {
    fetchLeads();
  }, [crmFilters]);

  const fetchLeads = async () => {
    try {
      const { name, phone, date, source, city, service, status } = crmFilters;
      const params = new URLSearchParams({ name, phone, date, source, city, service, status });
      const res = await fetch(`/api/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) { 
      console.error("Failed to fetch leads"); 
    } finally {
      setLoading(false);
    }
  };

  const handleLeadUpdate = async (id: number, data: Partial<any>) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      fetchLeads();
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev: any) => ({ ...prev, ...data }));
      }
    }
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLeadForm,
          source: "direct_admin",
          status: "new"
        })
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewLeadForm({
          name: "", email: "", whatsapp: "", requirement: "", service: "", city: "", expected_value: "50000", priority: "medium"
        });
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to add lead", error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'WhatsApp', 'Email', 'Requirement', 'Source', 'City', 'Service', 'Status', 'Remarks', 'Source Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.name || ''}"`,
        `"${lead.whatsapp || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.requirement || ''}"`,
        `"${lead.source || ''}"`,
        `"${lead.city || ''}"`,
        `"${lead.service || ''}"`,
        `"${lead.status || 'new'}"`,
        `"${lead.remarks || ''}"`,
        `"${lead.source_page || ''}"`,
        `"${lead.utm_source || ''}"`,
        `"${lead.utm_medium || ''}"`,
        `"${lead.utm_campaign || ''}"`,
        `"${new Date(lead.created_at).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `aiclex_leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Mock charts data based on dynamic lead arrays
  const funnelData = [
    { value: leads.length, name: 'New Leads', fill: '#2563EB' },
    { value: leads.filter(l => l.status !== 'new' && l.status !== 'junk').length, name: 'Contacted', fill: '#3B82F6' },
    { value: leads.filter(l => ['qualified', 'proposal', 'negotiation', 'won'].includes(l.status)).length, name: 'Qualified', fill: '#6366F1' },
    { value: leads.filter(l => l.status === 'won' || l.status === 'closed').length, name: 'Won', fill: '#22C55E' },
  ];

  const sourceChartData = [
    { name: 'Ad campaigns', value: leads.filter(l => l.utm_source).length },
    { name: 'Website Tools', value: leads.filter(l => !l.utm_source && l.source !== 'direct_admin').length },
    { name: 'Direct Admin', value: leads.filter(l => l.source === 'direct_admin').length },
  ];

  const revenueTrendData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 72000 },
    { month: 'Mar', revenue: 95000 },
    { month: 'Apr', revenue: 120000 },
    { month: 'May', revenue: leads.filter(l => l.status === 'won').reduce((sum, item) => sum + parseInt(item.expected_value || 50000), 0) + 140000 }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#111827] pb-16 font-sans antialiased">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#E5E7EB] pb-6 bg-[#FFFFFF] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
            CRM Workspace <span className="text-xs px-2 py-0.5 bg-[#2563EB]/10 text-[#2563EB] font-semibold rounded-full">v2.0</span>
          </h1>
          <p className="text-[#6B7280] text-sm mt-0.5">Manage pipeline, qualification criteria, and client communications.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Export button */}
          <button 
            onClick={exportToCSV}
            className="px-4 py-2.5 border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer bg-white"
          >
            <Download size={14} />
            Export CSV
          </button>

          {/* Quick Add Button */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            Add Lead
          </button>
        </div>
      </div>

      {/* 2. KPI METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {[
          { name: "Total Leads", value: leads.length, change: "+12.5%", icon: Users, color: "text-[#2563EB] bg-blue-50" },
          { name: "New Leads", value: leads.filter(l => l.status === 'new' || !l.status).length, change: "Active", icon: Clock, color: "text-[#3B82F6] bg-sky-50" },
          { name: "In Progress", value: leads.filter(l => ['contacted', 'proposal', 'negotiation'].includes(l.status)).length, change: "+8%", icon: Activity, color: "text-[#F59E0B] bg-amber-50" },
          { name: "Qualified", value: leads.filter(l => l.status === 'qualified').length, change: "Qualifying", icon: Award, color: "text-purple-600 bg-purple-50" },
          { name: "Won / Converted", value: leads.filter(l => l.status === 'won' || l.status === 'closed').length, change: "100%", icon: CheckCircle, color: "text-[#22C55E] bg-green-50" },
          { name: "Lost", value: leads.filter(l => l.status === 'lost' || l.status === 'junk').length, change: "-2%", icon: AlertTriangle, color: "text-[#EF4444] bg-rose-50" },
          { name: "Conversion Rate", value: leads.length ? `${Math.round((leads.filter(l => l.status === 'won' || l.status === 'closed').length / leads.length) * 100)}%` : "0%", change: "+3.2%", icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
          { name: "Expected Revenue", value: `₹${(leads.reduce((sum, item) => sum + parseInt(item.expected_value || 50000), 0) / 100000).toFixed(1)}L`, change: "Pipeline", icon: DollarSign, color: "text-[#0F172A] bg-slate-100" }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E5E7EB] hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider truncate">{kpi.name}</span>
                <div className={`p-1.5 rounded-lg ${kpi.color}`}>
                  <Icon size={14} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight">{kpi.value}</span>
                <span className={`text-[10px] font-bold ${
                  kpi.change.startsWith("+") ? "text-[#22C55E]" : 
                  kpi.change.startsWith("-") ? "text-[#EF4444]" : "text-[#6B7280]"
                }`}>{kpi.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pipeline Funnel */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col h-[280px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">Pipeline Sales Funnel</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col h-[280px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">Pipeline Deal Value Trend</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col h-[280px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">Lead Source Attribution</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceChartData} layout="vertical">
                <XAxis type="number" stroke="#6B7280" fontSize={10} hide />
                <YAxis dataKey="name" type="category" stroke="#6B7280" fontSize={10} width={90} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 8, 8, 0]}>
                  {sourceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#2563EB" : index === 1 ? "#6366F1" : "#0F172A"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. MAIN LAYOUT GRID (30% FILTER PANEL / 70% LEAD LIST) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FILTERS PANEL (30%) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                <Filter size={16} className="text-[#2563EB]" /> Filter Configuration
              </h3>
              <button 
                onClick={() => setCrmFilters({name: "", phone: "", date: "", source: "", city: "", service: "", status: ""})}
                className="text-xs text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Reset
              </button>
            </div>

            <div className="space-y-4">
              {/* Search by Name */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Lead Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={14} />
                  <input
                    type="text"
                    value={crmFilters.name}
                    onChange={(e) => setCrmFilters({ ...crmFilters, name: e.target.value })}
                    placeholder="Search name..."
                    className="w-full pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-xs focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Pipeline Status</label>
                <select
                  value={crmFilters.status}
                  onChange={(e) => setCrmFilters({ ...crmFilters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs outline-none text-[#111827] bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal Sent</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="won">Won / Converted</option>
                  <option value="lost">Lost</option>
                  <option value="followup">Follow-up</option>
                  <option value="no_response">No Response</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">WhatsApp/Phone</label>
                <input
                  type="text"
                  value={crmFilters.phone}
                  onChange={(e) => setCrmFilters({ ...crmFilters, phone: e.target.value })}
                  placeholder="Enter phone number..."
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Created Date</label>
                <input
                  type="date"
                  value={crmFilters.date}
                  onChange={(e) => setCrmFilters({ ...crmFilters, date: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs focus:ring-2 focus:ring-[#2563EB] outline-none text-[#6B7280]"
                />
              </div>

              {/* Tool Source */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Attribution Channel</label>
                <select
                  value={crmFilters.source}
                  onChange={(e) => setCrmFilters({ ...crmFilters, source: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs outline-none text-[#111827] bg-white"
                >
                  <option value="">All Channels</option>
                  <option value="zoom_reseller">Zoom Reseller Package</option>
                  <option value="ai-seo-checker">AI Website Auditor</option>
                  <option value="ads-roi-calculator">Paid Ads ROI Calc</option>
                  <option value="lead-cost-calculator">Lead Cost Benchmarker</option>
                  <option value="HomeLeadForm">Strategy Call Form</option>
                  <option value="direct_admin">Direct Admin Created</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Geographic City</label>
                <input
                  type="text"
                  value={crmFilters.city}
                  onChange={(e) => setCrmFilters({ ...crmFilters, city: e.target.value })}
                  placeholder="e.g. Noida, Kota..."
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>

              {/* Service */}
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Required Service</label>
                <input
                  type="text"
                  value={crmFilters.service}
                  onChange={(e) => setCrmFilters({ ...crmFilters, service: e.target.value })}
                  placeholder="e.g. CRM, ERP, SEO..."
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>

            </div>
          </div>
        </div>

        {/* PIPELINE & LEAD CARDS (70%) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#6B7280] font-bold uppercase tracking-wider">
              Leads Pipeline ({leads.length} results)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-[10px] text-[#6B7280] font-semibold">Updated live</span>
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              // Skeletal Loading
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="space-y-2">
                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                        <div className="w-20 h-3 bg-gray-150 rounded"></div>
                      </div>
                    </div>
                    <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-10 bg-gray-100 rounded-xl"></div>
                </div>
              ))
            ) : leads.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-16 text-center shadow-sm">
                <Users size={36} className="text-[#6B7280] mx-auto mb-4 opacity-50" />
                <h4 className="font-bold text-[#0F172A] text-lg">No leads found</h4>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mt-1">
                  Adjust your search or filter configuration to discover registered lead items.
                </p>
              </div>
            ) : (
              leads.map((lead) => {
                const status = lead.status || "new";
                const badge = STATUS_COLORS[status] || STATUS_COLORS.new;
                return (
                  <motion.div
                    key={lead.id}
                    layoutId={`lead-card-${lead.id}`}
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.05)" }}
                    onClick={() => {
                      setSelectedLead(lead);
                      setIsPanelOpen(true);
                    }}
                    className={`bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5E7EB] transition-all cursor-pointer flex flex-col gap-4 relative overflow-hidden group ${
                      selectedLead?.id === lead.id ? "ring-2 ring-[#2563EB]/40 border-transparent" : ""
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-[#2563EB] font-black text-sm uppercase flex items-center justify-center shadow-inner">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-base leading-tight flex items-center gap-1.5">
                            {lead.name}
                            {lead.priority === "high" && (
                              <Star size={14} className="fill-amber-400 text-amber-500" />
                            )}
                          </h4>
                          <span className="text-[10px] text-[#6B7280] font-medium tracking-normal block mt-0.5">
                            Attribution: <span className="text-gray-900 font-semibold">{lead.source?.replace(/-/g, ' ') || 'Direct'}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Badge */}
                        <div className="relative">
                          <select 
                            value={status} 
                            onClick={(e) => e.stopPropagation()} // Stop opening panel
                            onChange={(e) => handleLeadUpdate(lead.id, { status: e.target.value })}
                            className={`appearance-none pl-6 pr-7 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border outline-none cursor-pointer transition-all ${badge.bg} ${badge.text}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="proposal">Proposal</option>
                            <option value="negotiation">Negotiation</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                            <option value="followup">Follow-up</option>
                            <option value="no_response">No Response</option>
                          </select>
                          <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        </div>

                        {/* Priority Badge */}
                        <span className={`px-2 py-0.5 border rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          PRIORITY_COLORS[lead.priority || "medium"]
                        }`}>
                          {lead.priority || "medium"}
                        </span>
                      </div>
                    </div>

                    {/* Metadata indicators */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-xs">
                      <div>
                        <span className="text-[9px] text-[#6B7280] uppercase tracking-wider block">Expected Value</span>
                        <span className="font-semibold text-[#0F172A]">₹{parseInt(lead.expected_value || 50000).toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#6B7280] uppercase tracking-wider block">Service Category</span>
                        <span className="font-semibold text-purple-600 truncate block">{lead.service || 'General SEO'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#6B7280] uppercase tracking-wider block">Target City</span>
                        <span className="font-semibold text-amber-600 truncate block">{lead.city || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#6B7280] uppercase tracking-wider block">Created Date</span>
                        <span className="font-medium text-[#6B7280]">
                          {new Date(lead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                    </div>

                    {/* Notes preview */}
                    {lead.remarks ? (
                      <p className="text-xs text-gray-500 italic bg-[#F8FAFC] p-3 rounded-lg border border-gray-150 line-clamp-1">
                        "{lead.remarks}"
                      </p>
                    ) : (
                      <p className="text-xs text-gray-300 italic">No notes added. Click card to update details.</p>
                    )}

                    {/* Action shortcuts */}
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                      <div className="flex gap-2">
                        {lead.email && (
                          <a 
                            href={`mailto:${lead.email}`} 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 border border-[#E5E7EB] hover:border-blue-500 hover:text-blue-500 rounded-lg text-[#6B7280] transition-all bg-white"
                          >
                            <Mail size={12} />
                          </a>
                        )}
                        <a 
                          href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border border-[#E5E7EB] hover:border-green-500 hover:text-green-600 rounded-lg text-[#6B7280] transition-all bg-white"
                        >
                          <MessageCircle size={12} />
                        </a>
                        <a 
                          href={`tel:${lead.whatsapp}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border border-[#E5E7EB] hover:border-[#2563EB] hover:text-[#2563EB] rounded-lg text-[#6B7280] transition-all bg-white"
                        >
                          <PhoneCall size={12} />
                        </a>
                      </div>

                      <span className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Open Timeline <ChevronRight size={10} />
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* 5. FLOATING DETAILS SIDEBAR (DRAWER) */}
      <AnimatePresence>
        {isPanelOpen && selectedLead && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-[#0F172A] z-40"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white border-l border-[#E5E7EB] shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg">{selectedLead.name}</h3>
                  <span className="text-xs text-[#6B7280]">{selectedLead.email || "No Email Provided"}</span>
                </div>
                <button 
                  onClick={() => setIsPanelOpen(false)}
                  className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Details list */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Lead Specification</h4>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">WhatsApp</span>
                      <span className="font-semibold text-gray-900 block mt-0.5">{selectedLead.whatsapp}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">Priority Status</span>
                      <select
                        value={selectedLead.priority || "medium"}
                        onChange={(e) => handleLeadUpdate(selectedLead.id, { priority: e.target.value })}
                        className="font-semibold text-gray-900 bg-transparent border-none outline-none mt-0.5 cursor-pointer block"
                      >
                        <option value="high">🔺 High</option>
                        <option value="medium">🔸 Medium</option>
                        <option value="low">🔹 Low</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">Expected Value</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-gray-500">₹</span>
                        <input
                          type="number"
                          value={selectedLead.expected_value || 50000}
                          onChange={(e) => handleLeadUpdate(selectedLead.id, { expected_value: e.target.value })}
                          className="font-semibold text-gray-900 bg-transparent border-none outline-none w-20"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">Target City</span>
                      <input
                        type="text"
                        value={selectedLead.city || ""}
                        onChange={(e) => handleLeadUpdate(selectedLead.id, { city: e.target.value })}
                        className="font-semibold text-gray-900 bg-transparent border-none outline-none w-full"
                        placeholder="Noida"
                      />
                    </div>
                  </div>
                </div>

                {/* Requirement */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">User Requirements</h4>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-150 text-sm text-[#0F172A] leading-relaxed">
                    "{selectedLead.requirement || "No detailed requirement provided."}"
                  </div>
                </div>

                {/* Notes Textarea */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Internal Admin Remarks</h4>
                  <textarea
                    rows={4}
                    defaultValue={selectedLead.remarks || ""}
                    onBlur={(e) => handleLeadUpdate(selectedLead.id, { remarks: e.target.value })}
                    placeholder="Enter sales summary, meeting logs, notes. Saves automatically on blur..."
                    className="w-full p-4 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB] bg-white resize-none"
                  />
                </div>

                {/* Communication timeline */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Activity Feed & Communication Logs</h4>
                  
                  <div className="relative border-l border-gray-100 pl-5 ml-2.5 space-y-4 text-xs">
                    {/* Log item 1 */}
                    <div className="relative">
                      <div className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-800">Lead Created</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(selectedLead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-500 mt-1">Lead initialized in CRM system via tool form.</p>
                    </div>

                    {/* Log item 2 (Mock) */}
                    <div className="relative">
                      <div className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-800">WhatsApp Follow-up</span>
                        <span className="text-[10px] text-gray-400">Pending</span>
                      </div>
                      <p className="text-gray-500 mt-1">Ready to start initial qualification call.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-[#E5E7EB] bg-gray-50 flex gap-3">
                <a
                  href={`https://wa.me/${selectedLead.whatsapp?.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 py-3 bg-[#22C55E] hover:bg-green-600 text-white rounded-xl text-center text-xs font-bold transition shadow-sm"
                >
                  WhatsApp Call
                </a>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="px-5 py-3 border border-[#E5E7EB] hover:bg-white text-gray-700 bg-white rounded-xl text-xs font-bold transition"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6. QUICK ADD LEAD MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-[#0F172A] z-50"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-20 max-w-md mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl z-[60] overflow-hidden"
            >
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <h3 className="font-bold text-[#0F172A] text-lg">Add New Sales Lead</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-red-500 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleQuickAdd}>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newLeadForm.name}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">WhatsApp / Phone</label>
                      <input
                        type="text"
                        required
                        value={newLeadForm.whatsapp}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, whatsapp: e.target.value })}
                        placeholder="+91..."
                        className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Email</label>
                      <input
                        type="email"
                        value={newLeadForm.email}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Target Service</label>
                      <input
                        type="text"
                        value={newLeadForm.service}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                        placeholder="e.g. JioHotstar Ads"
                        className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">City</label>
                      <input
                        type="text"
                        value={newLeadForm.city}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                        placeholder="e.g. Noida"
                        className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Expected Value (₹)</label>
                      <input
                        type="number"
                        value={newLeadForm.expected_value}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, expected_value: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Priority</label>
                      <select
                        value={newLeadForm.priority}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-xl text-xs outline-none bg-white text-gray-700"
                      >
                        <option value="high">🔺 High</option>
                        <option value="medium">🔸 Medium</option>
                        <option value="low">🔹 Low</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">Requirement Overview</label>
                    <textarea
                      rows={3}
                      value={newLeadForm.requirement}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, requirement: e.target.value })}
                      placeholder="Add specific details or customer needs..."
                      className="w-full p-3.5 border border-[#E5E7EB] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-[#E5E7EB] bg-gray-50 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
                  >
                    Publish Lead to CRM
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-3 border border-[#E5E7EB] text-gray-700 hover:bg-white bg-white rounded-xl text-xs font-bold transition"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
