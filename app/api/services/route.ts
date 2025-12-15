import { NextResponse } from "next/server";
import { servicesData } from "@/lib/servicesData";

export async function GET() {
  // In a real app, you would fetch from Neon DB here.
  // For now, we return the static array as JSON.
  return NextResponse.json(servicesData);
}