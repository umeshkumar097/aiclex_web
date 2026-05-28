"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";

export default function ClientDashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) return;

        const res = await fetch("/api/client/subscriptions", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
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
        return <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full"><CheckCircle size={12} /> ACTIVE</span>;
      case "FAILED":
        return <span className="flex items-center gap-1 text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full"><XCircle size={12} /> FAILED</span>;
      default:
        return <span className="flex items-center gap-1 text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"><Clock size={12} /> {status || 'PENDING'}</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-[#001341] mb-6">My Subscriptions & Services</h1>
      
      {subscriptions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-[#5271ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-lg font-bold text-[#001341] mb-2">No active subscriptions yet</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't purchased any services yet.</p>
          <a href="/pricing" className="inline-block bg-[#001341] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#5271ff] transition-colors">
            View Services
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#5271ff]">
                  <ExternalLink size={24} />
                </div>
                {getStatusBadge(sub.status)}
              </div>
              
              <h3 className="font-black text-[#001341] text-lg mb-1">{sub.plan_name}</h3>
              <p className="text-gray-500 text-sm font-medium mb-4">Order: {sub.order_id}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center mb-4">
                <span className="text-2xl font-black text-[#001341]">₹{sub.total_amount}</span>
                <span className="text-xs text-gray-400 font-bold">
                  {new Date(sub.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  const token = localStorage.getItem("admin_token");
                  fetch(`/api/client/download-invoice?order_id=${sub.order_id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                  .then(res => res.blob())
                  .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${sub.invoice_number || 'invoice'}.pdf`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                  })
                  .catch(err => console.error("Download failed", err));
                }}
                className="w-full bg-[#f4f6f9] text-[#001341] py-2 rounded-xl text-sm font-bold border border-gray-200 hover:bg-[#e2e8f0] transition-colors text-center"
              >
                Download Invoice
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
