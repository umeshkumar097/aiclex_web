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

// Self-healing database auto-migration for cob_submissions table
pool.query(`
  CREATE TABLE IF NOT EXISTS cob_submissions (
    id SERIAL PRIMARY KEY,
    submission_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    state VARCHAR(255),
    website VARCHAR(255),
    business_start_year INTEGER,
    business_type VARCHAR(100),
    coaching_category VARCHAR(100),
    primary_audience TEXT,
    primary_goal VARCHAR(255),
    monthly_lead_target INTEGER,
    monthly_sales_target INTEGER,
    status VARCHAR(50) DEFAULT 'New',
    admin_notes TEXT,
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log("✅ cob_submissions table auto-migration verified.");
}).catch((err) => {
  console.error("⚠️ cob_submissions table auto-migration error:", err.message);
});

export default pool;