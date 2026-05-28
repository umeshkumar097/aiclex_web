import pool from '../lib/db';

async function setupDatabase() {
  try {
    console.log("Setting up new Dashboard Database Tables...");

    // 1. Services
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pricing VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'services' table.");

    // 2. Projects
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        assigned_team VARCHAR(255),
        deadline DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'projects' table.");

    // 3. Meetings
    await pool.query(`
      CREATE TABLE IF NOT EXISTS meetings (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        meeting_link VARCHAR(255),
        status VARCHAR(50) DEFAULT 'scheduled',
        notes TEXT,
        meeting_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'meetings' table.");

    // 4. Testimonials
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        rating INTEGER DEFAULT 5,
        review TEXT NOT NULL,
        is_visible BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'testimonials' table.");

    // 5. Portfolio
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        project_name VARCHAR(255) NOT NULL,
        industry VARCHAR(255),
        before_image_url TEXT,
        after_image_url TEXT,
        results TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'portfolio' table.");

    // 6. Newsletters
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletters (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'subscribed',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'newsletters' table.");

    // 7. Enquiries
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        type VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'enquiries' table.");

    // 8. Activity Logs
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        admin_name VARCHAR(255) DEFAULT 'Admin',
        action VARCHAR(255) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created 'activity_logs' table.");

    console.log("✅ All dashboard tables created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database setup failed:", err);
    process.exit(1);
  }
}

setupDatabase();
