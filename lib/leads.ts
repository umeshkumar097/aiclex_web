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
  status = 'new',
  city = null,
  service = null,
  source_page = null,
  utm_source = null,
  utm_medium = null,
  utm_campaign = null
}: {
  name: string;
  email?: string;
  whatsapp: string;
  requirement: string;
  source: string;
  status?: string;
  city?: string | null;
  service?: string | null;
  source_page?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}) {
  try {
    const result = await pool.query(
      `INSERT INTO leads (
        name, email, whatsapp, requirement, status, source, 
        city, service, source_page, utm_source, utm_medium, utm_campaign
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
      [
        name, 
        email || null, 
        whatsapp, 
        requirement, 
        status, 
        source,
        city || null,
        service || null,
        source_page || null,
        utm_source || null,
        utm_medium || null,
        utm_campaign || null
      ]
    );
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error("Lead Saving Error:", error);
    return { success: false, error: "Failed to save lead" };
  }
}
