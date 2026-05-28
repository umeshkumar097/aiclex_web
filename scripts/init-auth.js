const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initAuth() {
  const client = await pool.connect();
  try {
    console.log('Starting auth database initialization...');
    await client.query('BEGIN');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'client',
        reset_token VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created users table');

    // Create email_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_logs (
        id SERIAL PRIMARY KEY,
        recipient VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        error_message TEXT,
        sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created email_logs table');

    // Seed initial admin user
    const adminEmail = 'admin@aiclex.in';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const { rowCount } = await client.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
    if (rowCount === 0) {
      await client.query(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
      `, ['Admin', adminEmail, hashedPassword, 'admin']);
      console.log('Seeded admin user');
    } else {
      // Ensure role is admin
      await client.query(`
        UPDATE users SET role = 'admin' WHERE email = $1
      `, [adminEmail]);
      console.log('Admin user already exists');
    }

    // Seed info admin
    const infoEmail = 'info@aiclex.in';
    const infoPassword = 'Umesh@2003##';
    const hashedInfoPassword = await bcrypt.hash(infoPassword, 10);

    const { rowCount: infoCount } = await client.query('SELECT * FROM users WHERE email = $1', [infoEmail]);
    if (infoCount === 0) {
      await client.query(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
      `, ['Info Admin', infoEmail, hashedInfoPassword, 'admin']);
      console.log('Seeded info admin user');
    }

    await client.query('COMMIT');
    console.log('Auth database initialization completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error initializing auth database:', error);
  } finally {
    client.release();
    pool.end();
  }
}

initAuth();
