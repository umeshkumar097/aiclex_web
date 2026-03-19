import pool from '../lib/db';

async function setupDatabase() {
  try {
    console.log("Creating team_members table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT,
        linkedin VARCHAR(255),
        twitter VARCHAR(255),
        email VARCHAR(255),
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Table created successfully.");

    // Seed data
    const seedData = [
      {
        name: "Umesh Kumar",
        role: "Founder & CEO",
        bio: "Visionary leader with 10+ years of experience in digital transformation and AI strategy.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "info@aiclex.in",
        image_url: "/assets/about/hero.png" // Temporary placeholder
      },
      {
        name: "Neha Sharma",
        role: "Head of Digital Marketing",
        bio: "Expert in Google Ads and Meta Ads with a track record of scaling direct-to-consumer brands.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "neha@aiclex.in",
        image_url: ""
      }
    ];

    console.log("Seeding initial data...");
    for (const member of seedData) {
      await pool.query(`
        INSERT INTO team_members (name, role, bio, linkedin, twitter, email, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
      `, [member.name, member.role, member.bio, member.linkedin, member.twitter, member.email, member.image_url]);
    }
    console.log("Database setup complete.");
    process.exit(0);
  } catch (err) {
    console.error("Database setup failed:", err);
    process.exit(1);
  }
}

setupDatabase();
