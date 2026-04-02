import pool from './db';

/**
 * Unified Lead Saving Utility
 * Saves leads from various free tools with appropriate sources
 */
export async function saveLead({
  name,
  email,
  whatsapp,
  requirement,
  source,
  status = 'new'
}: {
  name: string;
  email?: string;
  whatsapp: string;
  requirement: string;
  source: string;
  status?: string;
}) {
  try {
    const result = await pool.query(
      "INSERT INTO leads (name, email, whatsapp, requirement, status, source) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [name, email || null, whatsapp, requirement, status, source]
    );
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error("Lead Saving Error:", error);
    return { success: false, error: "Failed to save lead" };
  }
}
