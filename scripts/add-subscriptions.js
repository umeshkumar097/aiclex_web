const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(255) UNIQUE NOT NULL,
        subscription_id VARCHAR(255),
        plan_slug VARCHAR(255) NOT NULL,
        plan_name VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        gst_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
        total_amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        customer_gstin VARCHAR(50),
        status VARCHAR(50) DEFAULT 'PENDING',
        payment_session_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Created subscriptions table successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
}

main();
