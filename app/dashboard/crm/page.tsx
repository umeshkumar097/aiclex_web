"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  MessageSquare, 
  Phone, 
  CheckCircle, 
  Filter, 
  Download, 
  Globe, 
  Calendar as CalendarIcon, 
  Pencil, 
  AlertTriangle 
} from "lucide-react";

export default function CrmPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [crmFilters, setCrmFilters] = useState({ name: "", phone: "", date: "", source: "", city: "", service: "" });

  useEffect(() => {
    fetchLeads();
  }, [crmFilters]);

  const fetchLeads = async () => {
    try {
      const { name, phone, date, source, city, service } = crmFilters;
      const params = new URLSearchParams({ name, phone, date, source, city, service });
      const res = await fetch(`/api/leads?${params.toString()}`);
      if(res.ok) setLeads(await res.json());
    } catch (error) { console.error("Failed to fetch leads"); }
  };

  const handleLeadUpdate = async (id: number, data: Partial<any>) => {
    await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchLeads();
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
    ].join('\\n');

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

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CRM STATS */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#001341] to-[#0a1f5e] p-6 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                      <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Total Leads</p>
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Users size={14} className="text-blue-300"/></div>
                      </div>
                      <p className="text-4xl font-black text-white">{leads.length}</p>
                  </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-[#5271ff] p-6 rounded-3xl shadow-2xl border border-blue-400/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                      <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">New Leads</p>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><MessageSquare size={14} className="text-white"/></div>
                      </div>
                      <p className="text-4xl font-black text-white">{leads.filter(l => l.status === 'new' || !l.status).length}</p>
                  </div>
              </div>
              <div className="bg-gradient-to-br from-[#ff914d] to-orange-600 p-6 rounded-3xl shadow-2xl border border-orange-400/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                      <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-orange-100 uppercase tracking-widest">In Progress</p>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Phone size={14} className="text-white"/></div>
                      </div>
                      <p className="text-4xl font-black text-white">{leads.filter(l => l.status === 'contacted' || l.status === 'qualified').length}</p>
                  </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-3xl shadow-2xl border border-green-400/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                      <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-green-100 uppercase tracking-widest">Converted</p>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle size={14} className="text-white"/></div>
                      </div>
                      <p className="text-4xl font-black text-white">{leads.filter(l => l.status === 'closed').length}</p>
                  </div>
              </div>
          </div>

          {/* FILTERS */}
          <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,19,65,0.05)] border border-gray-100/50 p-8 sticky top-24 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                      <h3 className="font-black text-[#001341] text-base flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-blue-50 text-[#5271ff] flex items-center justify-center">
                              <Filter size={14} />
                          </span>
                          Filter Leads
                      </h3>
                      <button 
                          onClick={exportToCSV}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-[#5271ff] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 group cursor-pointer"
                          title="Export to CSV"
                      >
                          <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                          Export
                      </button>
                  </div>
                  
                  <div className="space-y-5 relative z-10">
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Search Name</label>
                          <input 
                              type="text" 
                              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                              placeholder="Type name..."
                              value={crmFilters.name}
                              onChange={(e) => setCrmFilters({...crmFilters, name: e.target.value})}
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Phone Number</label>
                          <input 
                              type="text" 
                              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                              placeholder="84494..."
                              value={crmFilters.phone}
                              onChange={(e) => setCrmFilters({...crmFilters, phone: e.target.value})}
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Registration Date</label>
                          <input 
                              type="date" 
                              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all text-gray-600"
                              value={crmFilters.date}
                              onChange={(e) => setCrmFilters({...crmFilters, date: e.target.value})}
                          />
                      </div>
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Tool Source</label>
                          <select 
                              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all text-gray-600 cursor-pointer appearance-none"
                              value={crmFilters.source}
                              onChange={(e) => setCrmFilters({...crmFilters, source: e.target.value})}
                          >
                              <option value="">All Tools / Channels</option>
                              <option value="zoom_reseller">Zoom Reseller Package</option>
                              <option value="ai-seo-checker">AI Website Auditor</option>
                              <option value="ads-roi-calculator">Paid Ads ROI Calc</option>
                              <option value="lead-cost-calculator">Lead Cost Benchmarker</option>
                              <option value="webinar-profit-calculator">Webinar Profit Predictor</option>
                              <option value="headline-generator">Viral Headline Gen</option>
                              <option value="whatsapp-funnel-generator">WhatsApp Funnel Architect</option>
                              <option value="funnel-builder-quiz">Funnel Strategy Quiz</option>
                              <option value="product-background-changer">AI Product Photo Edit</option>
                              <option value="ai-marketing-assistant">AI Marketing Assistant</option>
                              <option value="HomeLeadForm">Strategy Call Form</option>
                          </select>
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Filter by City</label>
                          <input 
                              type="text" 
                              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                              placeholder="e.g. Noida, Kota..."
                              value={crmFilters.city}
                              onChange={(e) => setCrmFilters({...crmFilters, city: e.target.value})}
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Filter by Service</label>
                          <input 
                              type="text" 
                              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 outline-none text-sm font-medium transition-all"
                              placeholder="e.g. ERP, SEO..."
                              value={crmFilters.service}
                              onChange={(e) => setCrmFilters({...crmFilters, service: e.target.value})}
                          />
                      </div>
                      <button onClick={() => setCrmFilters({name: "", phone: "", date: "", source: "", city: "", service: ""})} className="w-full py-4 mt-2 text-gray-400 font-bold text-xs uppercase hover:text-[#001341] transition cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-xl border border-transparent hover:border-gray-200">
                          Clear All Filters
                      </button>
                  </div>
              </div>
          </div>
          
          {/* LEADS LIST */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,19,65,0.05)] border border-gray-100/50 flex flex-col h-full max-h-[900px] overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <div className="relative z-10">
                      <h3 className="font-black text-[#001341] text-lg">Lead Management</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time submission pipeline</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5271ff]"></span>
                      </span>
                      <span className="px-4 py-2 bg-[#001341] text-white text-[10px] font-black rounded-xl uppercase tracking-wider shadow-lg shadow-blue-900/20">{leads.length} Active Leads</span>
                  </div>
              </div>
              
              <div className="divide-y divide-gray-50 overflow-y-auto flex-1 bg-gray-50/10">
                  {leads.length === 0 ? (
                      <div className="p-20 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/5 flex items-center justify-center mb-6 relative group">
                              <div className="absolute inset-0 bg-blue-50 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
                              <Users className="text-gray-300 group-hover:text-[#5271ff] transition-colors relative z-10" size={40} />
                          </div>
                          <h4 className="text-xl font-black text-[#001341] mb-2">No Leads Found</h4>
                          <p className="text-gray-400 font-medium text-sm max-w-xs mx-auto">Adjust your filters or wait for new leads to enter the pipeline.</p>
                      </div>
                  ) : leads.map((lead) => (
                      <div key={lead.id} className="p-8 hover:bg-white transition-all group border-l-4 border-transparent hover:border-l-[#5271ff] hover:shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] relative">
                          <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-6">
                              <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center text-[#001341] font-black text-sm uppercase shadow-sm border border-white">
                                          {lead.name.charAt(0)}
                                      </div>
                                      <p className="font-black text-[#001341] text-xl leading-tight">{lead.name}</p>
                                      <div className="relative ml-2">
                                          <select 
                                              value={lead.status || 'new'} 
                                              onChange={(e) => handleLeadUpdate(lead.id, { status: e.target.value })}
                                              className={`appearance-none pl-4 pr-8 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none outline-none cursor-pointer shadow-sm transition-colors ${
                                                  lead.status === 'closed' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                                  lead.status === 'qualified' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                                                  lead.status === 'contacted' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                                                  'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                              }`}
                                          >
                                              <option value="new">🆕 New</option>
                                              <option value="contacted">📞 Contacted</option>
                                              <option value="qualified">⭐ Qualified</option>
                                              <option value="closed">✅ Closed / Converted</option>
                                              <option value="junk">🚫 Junk / Spam</option>
                                          </select>
                                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-50">
                                              <svg width="8" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3">
                                      {lead.email && (
                                          <a href={`mailto:${lead.email}`} className="text-xs text-gray-500 hover:text-[#5271ff] flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                              <Globe size={12} className="text-gray-400" /> {lead.email}
                                          </a>
                                      )}
                                      <a href={`https://wa.me/${lead.whatsapp?.replace(/\\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 hover:text-white hover:bg-green-500 flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md font-bold">
                                          <Phone size={12} /> {lead.whatsapp}
                                      </a>
                                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 ml-2">
                                          <CalendarIcon size={12} />
                                          {new Date(lead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                      </span>
                                  </div>
                              </div>
                               <div className="flex flex-wrap xl:flex-col items-end gap-2 shrink-0 w-full xl:w-auto mt-4 xl:mt-0">
                                  <span className="px-3 py-1.5 bg-white text-[#5271ff] text-[9px] font-black rounded-lg border border-gray-100 shadow-sm uppercase tracking-widest flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#5271ff]"></span>
                                      {lead.source?.replace(/-/g, ' ') || 'Direct'}
                                  </span>
                                  {lead.service && (
                                      <span className="px-3 py-1.5 bg-white text-purple-600 text-[9px] font-black rounded-lg border border-gray-100 shadow-sm uppercase tracking-widest flex items-center gap-1.5">
                                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                          Service: {lead.service}
                                      </span>
                                  )}
                                  {lead.city && (
                                      <span className="px-3 py-1.5 bg-white text-amber-600 text-[9px] font-black rounded-lg border border-gray-100 shadow-sm uppercase tracking-widest flex items-center gap-1.5">
                                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                          City: {lead.city}
                                      </span>
                                  )}
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100/50 group-hover:bg-white group-hover:border-gray-100 transition-colors">
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                      <MessageSquare size={12} className="text-[#5271ff]" />
                                      User Requirement
                                  </p>
                                  <p className="text-xs text-gray-700 leading-relaxed font-medium italic">"{lead.requirement || 'No detailed requirement provided.'}"</p>
                              </div>
                              
                              <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100/30 group-hover:bg-blue-50 group-hover:border-blue-100/50 transition-colors focus-within:bg-blue-50 focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-100">
                                  <p className="text-[10px] font-black text-[#5271ff] uppercase tracking-widest mb-2 flex items-center gap-2">
                                      <Pencil size={12} />
                                      Internal Remarks
                                  </p>
                                  <textarea 
                                      className="w-full bg-transparent border-none outline-none text-xs text-gray-700 font-medium placeholder:text-gray-400 resize-none min-h-[40px]"
                                      placeholder="Add internal notes about this lead... (Auto-saves on blur)"
                                      defaultValue={lead.remarks || ''}
                                      onBlur={(e) => handleLeadUpdate(lead.id, { remarks: e.target.value })}
                                  />
                              </div>
                          </div>
                          
                          {(lead.source_page || lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 pt-5 border-t border-gray-100 border-dashed">
                                  {lead.source_page && (
                                      <div className="flex items-center gap-2">
                                          <Globe size={10} className="text-gray-400" />
                                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">Captured At:</p>
                                          <a href={lead.source_page} target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#5271ff] font-mono bg-blue-50/50 px-2.5 py-1 rounded-md border border-blue-100/50 truncate max-w-[200px] sm:max-w-[300px] hover:bg-blue-100 hover:border-blue-200 transition" title={lead.source_page}>{lead.source_page}</a>
                                      </div>
                                  )}
                                  {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                                      <div className="flex flex-wrap items-center gap-2">
                                          <AlertTriangle size={10} className="text-gray-400" />
                                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">UTM Data:</span>
                                          {lead.utm_source && (
                                              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-bold rounded-md border border-rose-100 shadow-sm">
                                                  src: {lead.utm_source}
                                              </span>
                                          )}
                                          {lead.utm_medium && (
                                              <span className="px-2 py-0.5 bg-teal-50 text-teal-600 text-[9px] font-bold rounded-md border border-teal-100 shadow-sm">
                                                  med: {lead.utm_medium}
                                              </span>
                                          )}
                                          {lead.utm_campaign && (
                                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-md border border-indigo-100 shadow-sm">
                                                  cmp: {lead.utm_campaign}
                                              </span>
                                          )}
                                      </div>
                                  )}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>                 
      </div>
    </div>
  );
}
