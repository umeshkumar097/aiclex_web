import { Pool } from "pg";
import { notFound } from "next/navigation";
import InvoiceClientView from "./InvoiceClientView";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function WebInvoicePage({ params }: { params: { order_id: string } }) {
  const { order_id } = params;

  let subscription;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM subscriptions WHERE order_id = $1`,
      [order_id]
    );
    
    if (rows.length === 0) {
      return notFound();
    }
    
    subscription = rows[0];
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load invoice details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 print:py-0 print:bg-white">
      <div className="max-w-4xl mx-auto">
        <InvoiceClientView subscription={subscription} />
      </div>
    </div>
  );
}
