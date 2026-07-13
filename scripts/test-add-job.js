require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testAdd() {
  try {
    const title = "Intern Test Job";
    const slug = "intern-test-job";
    const department = "Engineering";
    const location = "Remote";
    const type = "Internship";
    const salary = "₹20k - ₹30k";
    const description = "Test description";
    const requirements = ["React.js", "Node.js"];
    const experience = "Freshers";

    const result = await pool.query(
      `INSERT INTO jobs (title, slug, department, location, type, salary, description, requirements, experience) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [title, slug, department, location, type, salary, description, JSON.stringify(requirements), experience]
    );
    console.log("Success! Created Job:");
    console.log(result.rows[0]);

    // Clean up
    await pool.query("DELETE FROM jobs WHERE id = $1", [result.rows[0].id]);
    console.log("Cleaned up successfully.");

  } catch (error) {
    console.error("Error creating job in DB:", error);
  } finally {
    pool.end();
  }
}

testAdd();
