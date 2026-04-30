const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const res = await pool.query("SELECT * FROM services LIMIT 1");
    console.log(res.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

test();
