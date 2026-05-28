"use client";

import { useState, useEffect } from "react";
import { CreditCard, Search, Loader2, CheckCircle2, Clock, XCircle } from "lucide-react";

type Subscription = {
  id: number;
  order_id: string;
  plan_name: string;
  total_amount: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_gstin: string | null;
  status: string;
  created_at: string;
};

export default function SubscriptionsDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch("/api/admin/subscriptions");
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = subscriptions.filter(sub => 
    sub.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.order_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#001341] flex items-center gap-3">
            <CreditCard size={28} className="text-[#5271ff]" />
            Payments & Subscriptions
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage all client payments, active subscriptions, and invoices.</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by name, email or order id..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#5271ff] transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Order ID / Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Client Info</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Plan Name</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Total Paid (Inc GST)</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">GSTIN</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Loader2 size={24} className="animate-spin mx-auto text-[#5271ff] mb-2" />
                    Loading subscriptions...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#001341]">{sub.order_id}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(sub.created_at).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#001341]">{sub.customer_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{sub.customer_email}</p>
                      <p className="text-xs text-gray-400">{sub.customer_phone}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {sub.plan_name}
                    </td>
                    <td className="px-6 py-4 font-black text-[#5271ff]">
                      ₹{parseFloat(sub.total_amount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      {sub.customer_gstin ? (
                        <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100 uppercase">
                          {sub.customer_gstin}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {sub.status === 'ACTIVE' ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full w-max border border-green-100">
                          <CheckCircle2 size={12} /> ACTIVE
                        </span>
                      ) : sub.status === 'FAILED' ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full w-max border border-red-100">
                          <XCircle size={12} /> FAILED
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full w-max border border-orange-100">
                          <Clock size={12} /> PENDING
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
