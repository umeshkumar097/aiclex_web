import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for most cloud Postgres providers like Neon
  }
});

// Self-healing database auto-migration for UTM and routing context tracking columns
pool.query(`
  ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS city VARCHAR(255),
  ADD COLUMN IF NOT EXISTS service VARCHAR(255),
  ADD COLUMN IF NOT EXISTS source_page TEXT,
  ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
  ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
  ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255)
`).then(() => {
  console.log("✅ leads table auto-migration verified: city, service, source_page, and UTM parameters are ready.");
}).catch((err) => {
  console.error("⚠️ leads table auto-migration error:", err.message);
});

export default pool;