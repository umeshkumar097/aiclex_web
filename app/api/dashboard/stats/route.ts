import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // We run parallel count queries
    const [leadsRes, projectsRes, servicesRes, meetingsRes] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM leads"),
      pool.query("SELECT COUNT(*) FROM projects"),
      pool.query("SELECT COUNT(*) FROM services"),
      pool.query("SELECT COUNT(*) FROM meetings")
    ]);

    const stats = {
      leads: parseInt(leadsRes.rows[0].count),
      projects: parseInt(projectsRes.rows[0].count),
      services: parseInt(servicesRes.rows[0].count),
      meetings: parseInt(meetingsRes.rows[0].count),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
