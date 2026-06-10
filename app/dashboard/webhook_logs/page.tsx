"use client";

import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, Eye, X } from "lucide-react";

type WebhookLog = {
  id: number;
  order_id: string;
  customer_email: string;
  plan_slug: string;
  payload: any;
  status: string;
  created_at: string;
};

export default function WebhookLogsPage() {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPayload, setSelectedPayload] = useState<any>(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/admin/webhook_logs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#001341] mb-2">Pabbly Webhook Logs</h1>
          <p className="text-gray-500 font-medium">Track all successful Zoom payment data sent to your Pabbly automation.</p>
        </div>
        <button 
          onClick={fetchLogs}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:text-[#5271ff] hover:border-[#5271ff] transition-all"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 font-semibold">
          {error}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-500">Order ID</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-500">Email</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-500">Plan</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-500 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                    Loading logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No webhook logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#001341]">{log.order_id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">{log.customer_email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-[#5271ff] text-xs font-bold rounded-lg uppercase tracking-wide">
                        {log.plan_slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wide ${
                        log.status === 'SUCCESS' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedPayload(log.payload)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Modal */}
      {selectedPayload && (
        <div className="fixed inset-0 bg-[#001341]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-black text-[#001341]">JSON Payload Sent</h3>
              <button 
                onClick={() => setSelectedPayload(null)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto bg-[#0d1117]">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {JSON.stringify(selectedPayload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
