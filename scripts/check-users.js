require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkUsers() {
  try {
    const { rows } = await pool.query('SELECT id, name, email, role FROM users ORDER BY id ASC');
    console.log('Registered Users:');
    console.log(rows);
  } catch (error) {
    console.error("DB Query Error:", error);
  } finally {
    pool.end();
  }
}

checkUsers();
