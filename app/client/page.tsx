"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, Clock, XCircle, ExternalLink, Receipt, FileText, AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'upcoming' | 'due' | 'paid'>('subscriptions');
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) return;

        const userInfoRaw = localStorage.getItem("user_info");
        const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
        
        const headers: Record<string, string> = {
          "Authorization": `Bearer ${token}`
        };

        if (userInfo && userInfo.role === 'admin' && userInfo.email) {
          headers["x-impersonate-email"] = userInfo.email;
        }

        const res = await fetch("/api/client/subscriptions", {
          headers
        });
        const data = await res.json();
        
        if (data.subscriptions) {
          setSubscriptions(data.subscriptions);
        }
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#5271ff]" size={40} />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full"><CheckCircle size={12} /> PAID & ACTIVE</span>;
      case "FAILED":
        return <span className="flex items-center gap-1 text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full"><XCircle size={12} /> FAILED</span>;
      default:
        return <span className="flex items-center gap-1 text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"><Clock size={12} /> DUE</span>;
    }
  };

  // Group Failed/Pending by plan to count attempts
  const dueItems = subscriptions.filter(sub => sub.status !== 'ACTIVE');
  const groupedDueItems = Object.values(dueItems.reduce((acc, curr) => {
    if (!acc[curr.plan_slug]) {
      acc[curr.plan_slug] = { ...curr, attempts: 1 };
    } else {
      // Keep the latest one based on created_at
      acc[curr.plan_slug].attempts += 1;
      if (new Date(curr.created_at) > new Date(acc[curr.plan_slug].created_at)) {
        acc[curr.plan_slug] = { ...curr, attempts: acc[curr.plan_slug].attempts };
      }
    }
    return acc;
  }, {} as Record<string, any>));

  const paidItems = subscriptions.filter(sub => sub.status === 'ACTIVE');

  const renderEmptyState = (title: string, desc: string, icon: any) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 bg-blue-50 text-[#5271ff] rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-[#001341] mb-2">{title}</h2>
      <p className="text-gray-500 mb-6">{desc}</p>
      <a href="/pricing" className="inline-block bg-[#001341] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#5271ff] transition-colors">
        View Services
      </a>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-black text-[#001341] mb-6">Client Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
        <button 
          onClick={() => setActiveTab('subscriptions')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors ${activeTab === 'subscriptions' ? 'bg-[#001341] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          My Subscriptions
        </button>
        <button 
          onClick={() => setActiveTab('paid')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === 'paid' ? 'bg-[#001341] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Receipt size={16} />
          Paid Invoices
        </button>
        <button 
          onClick={() => setActiveTab('due')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === 'due' ? 'bg-[#001341] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <AlertCircle size={16} />
          Due Invoices
          {groupedDueItems.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-1">{groupedDueItems.length}</span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === 'upcoming' ? 'bg-[#001341] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <RefreshCcw size={16} />
          Upcoming
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'subscriptions' && (
        <div>
          {paidItems.length === 0 ? renderEmptyState("No active subscriptions yet", "Looks like you haven't purchased any services yet.", <CheckCircle size={32} />) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidItems.map((sub) => (
                <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-green-200 p-6 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#5271ff]">
                      <CheckCircle size={24} />
                    </div>
                    {getStatusBadge(sub.status)}
                  </div>
                  
                  <h3 className="font-black text-[#001341] text-lg mb-1">{sub.plan_name}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-4">Active Plan</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-2xl font-black text-[#001341]">Rs. {sub.total_amount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'paid' && (
        <div>
          {paidItems.length === 0 ? renderEmptyState("No paid invoices", "You have no invoice history.", <Receipt size={32} />) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidItems.map((sub) => (
                <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <FileText size={24} />
                    </div>
                    {getStatusBadge(sub.status)}
                  </div>
                  
                  <h3 className="font-black text-[#001341] text-lg mb-1">{sub.plan_name}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-4">Invoice: {sub.invoice_number}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-[#001341]">Rs. {sub.total_amount}</span>
                    <span className="text-xs text-gray-400 font-bold">
                      {new Date(sub.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => router.push(`/invoice/${sub.order_id}`)}
                    className="w-full bg-[#f4f6f9] text-[#001341] py-2 rounded-xl text-sm font-bold border border-gray-200 hover:bg-[#e2e8f0] transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} /> View Invoice
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'due' && (
        <div>
          {groupedDueItems.length === 0 ? renderEmptyState("All caught up!", "You have no due invoices or pending payments.", <CheckCircle size={32} />) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedDueItems.map((sub: any) => (
                <div key={sub.id} className="bg-white rounded-2xl shadow-md border border-red-200 p-6 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                      <AlertCircle size={24} />
                    </div>
                    {getStatusBadge(sub.status)}
                  </div>
                  
                  <h3 className="font-black text-[#001341] text-lg mb-1">{sub.plan_name}</h3>
                  <p className="text-red-500 text-sm font-bold mb-4 bg-red-50 inline-block px-3 py-1 rounded-full">
                    Payment Attempts: {sub.attempts}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-[#001341]">Rs. {sub.total_amount}</span>
                    <span className="text-xs text-gray-400 font-bold">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => router.push(`/invoice/${sub.order_id}`)}
                    className="w-full bg-[#001341] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#5271ff] transition-colors text-center shadow-md flex items-center justify-center gap-2"
                  >
                    View & Pay Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div>
          {renderEmptyState("No upcoming renewals", "You don't have any upcoming subscription renewals scheduled right now.", <RefreshCcw size={32} />)}
        </div>
      )}

    </div>
  );
}
