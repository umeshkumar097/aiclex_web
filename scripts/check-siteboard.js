require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkSiteboard() {
  try {
    const res = await pool.query("SELECT * FROM subscriptions WHERE plan_slug LIKE '%siteboard%' OR plan_name LIKE '%Siteboard%'");
    console.log("Subscriptions with Siteboard:");
    console.log(res.rows);

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("\nTables list:");
    console.log(tables.rows);
  } catch (error) {
    console.error("Database query failed:", error);
  } finally {
    pool.end();
  }
}

checkSiteboard();
