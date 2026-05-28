require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkSub() {
  try {
    const { rows } = await pool.query('SELECT * FROM subscriptions WHERE customer_email = $1', ['umeshkumarceo@gmail.com']);
    console.log('Subscriptions for umeshkumarceo@gmail.com:');
    console.log(rows);
  } catch (error) {
    console.error("DB Select Error:", error);
  } finally {
    pool.end();
  }
}

checkSub();
