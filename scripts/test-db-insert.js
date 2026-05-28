require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testInsert() {
  try {
    const orderId = `ORDER_${Date.now()}`;
    const basePrice = 100;
    const gstAmount = 18;
    const totalAmount = 118;
    
    console.log("Inserting subscription...");
    const { rows: insertedSub } = await pool.query(
      `INSERT INTO subscriptions 
      (order_id, plan_slug, plan_name, amount, gst_amount, total_amount, customer_name, customer_email, customer_phone, customer_gstin, payment_session_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [orderId, 'test-slug', 'Test Plan', basePrice, gstAmount, totalAmount, 'Test User', 'test@example.com', '9999999999', null, 'sess_test']
    );

    const subId = insertedSub[0].id;
    console.log("Inserted Sub ID:", subId);
    
    // Cleanup
    await pool.query('DELETE FROM subscriptions WHERE id = $1', [subId]);
    console.log("Cleanup done.");

  } catch (error) {
    console.error("DB Insert Error:", error);
  } finally {
    pool.end();
  }
}

testInsert();
