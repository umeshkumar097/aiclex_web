"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  Globe, 
  FileText, 
  ArrowUpRight, 
  Target, 
  CalendarDays,
  TrendingUp,
  Activity
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', leads: 40, revenue: 2400 },
  { name: 'Feb', leads: 30, revenue: 1398 },
  { name: 'Mar', leads: 20, revenue: 9800 },
  { name: 'Apr', leads: 27, revenue: 3908 },
  { name: 'May', leads: 18, revenue: 4800 },
  { name: 'Jun', leads: 23, revenue: 3800 },
  { name: 'Jul', leads: 34, revenue: 4300 },
];

export default function DashboardOverview() {
  const [stats, setStats] = useState({ leads: 0, jobs: 0, posts: 0, links: 0, services: 0 });

  useEffect(() => {
    // In a real app, you'd fetch aggregated stats here. 
    // Using dummy numbers for UI demonstration as requested.
    setStats({
      leads: 142,
      jobs: 5,
      posts: 24,
      links: 18,
      services: 8
    });
  }, []);

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform">
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Leads</p>
                  <h3 className="text-3xl font-black text-[#001341]">{stats.leads}</h3>
                  <p className="text-xs text-green-500 font-bold flex items-center gap-1 mt-2">
                    <TrendingUp size={12} /> +12% this month
                  </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#5271ff] transition-colors">
                  <Users size={20} className="text-[#5271ff] group-hover:text-white" />
              </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform">
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Services</p>
                  <h3 className="text-3xl font-black text-[#001341]">{stats.services}</h3>
                  <p className="text-xs text-gray-400 font-bold mt-2">Agency offerings</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-[#ff914d] transition-colors">
                  <Target size={20} className="text-[#ff914d] group-hover:text-white" />
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform">
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Upcoming Meetings</p>
                  <h3 className="text-3xl font-black text-[#001341]">3</h3>
                  <p className="text-xs text-gray-400 font-bold mt-2">This week</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  <CalendarDays size={20} className="text-purple-500 group-hover:text-white" />
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform">
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Projects</p>
                  <h3 className="text-3xl font-black text-[#001341]">12</h3>
                  <p className="text-xs text-green-500 font-bold flex items-center gap-1 mt-2">
                    <Activity size={12} /> On track
                  </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <Briefcase size={20} className="text-green-500 group-hover:text-white" />
              </div>
          </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 h-96">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[#001341]">Leads & Revenue Trends</h3>
            <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-3 py-1 outline-none text-gray-500">
              <option>Last 7 months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5271ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5271ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#001341' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#5271ff" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QUICK ACTIONS & ACTIVITY */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] border border-gray-100 flex flex-col h-96">
          <h3 className="font-black text-[#001341] mb-6">Quick Actions</h3>
          <div className="space-y-3 flex-1">
            <Link href="/dashboard/crm" className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-bold text-sm transition group">
              <span className="flex items-center gap-2"><Users size={16} className="text-[#5271ff]" /> View New Leads</span>
              <ArrowUpRight size={16} className="text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link href="/dashboard/services" className="flex items-center justify-between p-3 rounded-xl bg-orange-50/50 hover:bg-orange-50 text-orange-700 font-bold text-sm transition group">
              <span className="flex items-center gap-2"><Target size={16} className="text-[#ff914d]" /> Manage Services</span>
              <ArrowUpRight size={16} className="text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link href="/dashboard/blogs" className="flex items-center justify-between p-3 rounded-xl bg-green-50/50 hover:bg-green-50 text-green-700 font-bold text-sm transition group">
              <span className="flex items-center gap-2"><FileText size={16} className="text-green-500" /> Write Blog Post</span>
              <ArrowUpRight size={16} className="text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-auto border-t border-gray-50 pt-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Recent Activity</h4>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-gray-500">U</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">Admin updated service "SEO"</p>
                <p className="text-[10px] text-gray-400">10 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}