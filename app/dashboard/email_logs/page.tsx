"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, CheckCircle, XCircle } from "lucide-react";

export default function EmailLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/email_logs")
      .then(res => res.json())
      .then(data => {
        if (data.logs) setLogs(data.logs);
      })
      .finally(() => setLoading(false));
  }, []);

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
          <h1 className="text-2xl font-black text-[#001341]">Email Logs</h1>
          <p className="text-gray-500 text-sm">Monitor outgoing automated emails and delivery status.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Status</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Recipient</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Subject</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm">Sent At</th>
                <th className="px-6 py-4 font-bold text-[#001341] text-sm text-right">Error</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {log.status === "SUCCESS" ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                        <CheckCircle size={14} /> Delivered
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full w-fit">
                        <XCircle size={14} /> Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#001341]">{log.recipient}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">{log.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(log.sent_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-red-500 max-w-[150px] truncate">
                    {log.error_message || "-"}
                  </td>
                </tr>
              ))}
              
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No email logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
