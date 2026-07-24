require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkServices() {
  try {
    const res = await pool.query("SELECT * FROM services");
    console.log("Services list in DB:");
    console.log(res.rows);
  } catch (error) {
    console.error("Database query failed:", error);
  } finally {
    pool.end();
  }
}

checkServices();
