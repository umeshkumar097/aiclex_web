const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function upgradeSchema() {
  try {
    console.log('Adding remarks column to leads table...');
    await pool.query(`
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS remarks TEXT;
    `);
    console.log('Remarks column added.');
    
    console.log('Adding assigned_to column to leads table...');
    await pool.query(`
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to VARCHAR(255);
    `);
    console.log('Assigned_to column added.');

  } catch (err) {
    console.error('Error upgrading schema:', err.message);
  } finally {
    await pool.end();
  }
}

upgradeSchema();
