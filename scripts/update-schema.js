const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function updateSchema() {
  const client = await pool.connect();
  try {
    console.log('Updating database schema...');
    
    await client.query(`
      ALTER TABLE subscriptions 
      ADD COLUMN IF NOT EXISTS invoice_number VARCHAR(100),
      ADD COLUMN IF NOT EXISTS payment_link TEXT
    `);
    
    console.log('Schema updated successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
  } finally {
    client.release();
    pool.end();
  }
}

updateSchema();
