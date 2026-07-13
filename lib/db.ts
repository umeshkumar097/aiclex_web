import { Pool } from 'pg';

const isProd = process.env.NODE_ENV === 'production';
const ssl = isProd || process.env.DATABASE_URL?.includes('sslmode=require') 
  ? { rejectUnauthorized: false } 
  : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl
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

// Self-healing database auto-migration for invitations table
pool.query(`
  CREATE TABLE IF NOT EXISTS invitations (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    token VARCHAR(255) UNIQUE NOT NULL,
    is_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days'
  )
`).then(() => {
  console.log("✅ invitations table auto-migration verified.");
}).catch((err) => {
  console.error("⚠️ invitations table auto-migration error:", err.message);
});

export default pool;