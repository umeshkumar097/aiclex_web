"use client";

import { Printer, CreditCard, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvoiceClientView({ subscription }: { subscription: any }) {
  const router = useRouter();
  
  const isPaid = subscription.status === "ACTIVE";
  const statusLabel = isPaid ? "PAID" : "DUE";
  const statusColor = isPaid ? "text-green-600 border-green-600" : "text-red-600 border-red-600";
  
  const handlePrint = () => {
    window.print();
  };

  const handlePayNow = () => {
    if (subscription.payment_link) {
      window.location.href = subscription.payment_link;
    }
  };

  return (
    <div>
      {/* Top Action Bar - Hidden during print */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-600 hover:text-[#001341] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-bold">Back to Dashboard</span>
        </button>
        
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#001341] rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Printer size={18} />
            Print / Save PDF
          </button>
          
          {!isPaid && subscription.payment_link && (
            <button 
              onClick={handlePayNow}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#001341] text-white rounded-xl font-bold hover:bg-[#5271ff] transition-colors shadow-sm"
            >
              <CreditCard size={18} />
              Pay Now
            </button>
          )}
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="bg-[#001341] text-white p-10 flex justify-between items-start print:bg-[#001341] print:text-white" style={{ WebkitPrintColorAdjust: 'exact', colorAdjust: 'exact' }}>
          <div>
            <h1 className="text-4xl font-black mb-1 text-[#ff914d]">AICLEX</h1>
            <p className="text-xs font-bold opacity-90">Aiclex Solutions Pvt. Ltd.</p>
            <p className="text-sm opacity-70 max-w-xs mt-1">
              Unit No 8125, 8th Floor, Gaur City Mall,<br/>
              Sector 4, Greater Noida – 201318, India<br/>
              GSTIN: 09ABGCA0151N1ZL<br/>
              CIN: U62099UW2026PTC254970<br/>
              Email: info@aiclex.in
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black mb-2 uppercase tracking-wider">Invoice</h2>
            <p className="font-bold text-lg">{subscription.invoice_number || 'PENDING'}</p>
            <p className="opacity-80 text-sm mt-1">
              Date: {new Date(subscription.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 relative">
          
          {/* Watermark/Stamp */}
          <div className={`absolute top-10 right-10 border-4 rounded-xl px-6 py-2 transform rotate-12 opacity-80 ${statusColor}`}>
            <span className="text-4xl font-black tracking-widest uppercase">{statusLabel}</span>
          </div>

          <div className="mb-10">
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-3">Billed To</h3>
            <p className="text-xl font-bold text-[#001341]">{subscription.customer_name}</p>
            <p className="text-gray-600">{subscription.customer_email}</p>
            <p className="text-gray-600">Phone: {subscription.customer_phone}</p>
            {subscription.customer_gstin && (
              <p className="text-gray-600 mt-2 font-bold">GSTIN: {subscription.customer_gstin}</p>
            )}
          </div>

          {/* Table */}
          <table className="w-full mb-10 text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#001341]">
                <th className="py-4 font-bold text-[#001341] uppercase text-sm">Description</th>
                <th className="py-4 font-bold text-[#001341] uppercase text-sm text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-6">
                  <p className="font-bold text-lg text-[#001341]">{subscription.plan_name}</p>
                  <p className="text-gray-500 text-sm mt-1">Subscription for {subscription.plan_name}</p>
                </td>
                <td className="py-6 text-right font-bold text-lg text-gray-800">
                  Rs. {Number(subscription.amount).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="w-full flex justify-end">
            <div className="w-72">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-bold">Subtotal:</span>
                <span className="font-bold">Rs. {Number(subscription.amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-bold">GST (18%):</span>
                <span className="font-bold">Rs. {Number(subscription.gst_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-4 mt-2">
                <span className="text-xl font-black text-[#001341]">Total Amount:</span>
                <span className="text-xl font-black text-[#001341]">Rs. {Number(subscription.total_amount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h4 className="font-bold text-[#001341] mb-2">Company Bank Details</h4>
            <p className="text-gray-600 text-sm">Account Name: AICLEX PRIVATE LIMITED</p>
            <p className="text-gray-600 text-sm">Account Number: 10078183204</p>
            <p className="text-gray-600 text-sm">IFSC Code: IDFB0021311</p>
            <p className="text-gray-600 text-sm">Bank Name: IDFC First Bank</p>
            
            <p className="text-center text-gray-400 text-sm mt-12 italic">
              This is a computer generated invoice and requires no signature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
