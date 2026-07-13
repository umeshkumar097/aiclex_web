require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function describeTable() {
  try {
    // Check columns
    const columnsRes = await pool.query(`
      SELECT column_name, data_type, column_default, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'jobs'
    `);
    console.log('Columns:');
    console.log(columnsRes.rows);

    // Check constraints
    const constraintsRes = await pool.query(`
      SELECT conname, pg_get_constraintdef(c.oid) 
      FROM pg_constraint c 
      JOIN pg_namespace n ON n.oid = c.connamespace 
      WHERE c.conrelid = 'jobs'::regclass
    `);
    console.log('\nConstraints:');
    console.log(constraintsRes.rows);

    // Check if there are any jobs in the table
    const jobsRes = await pool.query("SELECT id, title, slug, type, is_active FROM jobs LIMIT 5");
    console.log('\nSample Jobs:');
    console.log(jobsRes.rows);

  } catch (error) {
    console.error("Error describing table:", error);
  } finally {
    pool.end();
  }
}

describeTable();
