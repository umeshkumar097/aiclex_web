import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { niche, goal } = await req.json();

    if (!niche || !goal) {
      return NextResponse.json({ error: "Missing niche or goal" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      You are a world-class Copywriter and Viral Marketing Expert specializing in the Indian market.
      Generate 10 high-converting, "scroll-stopping" headlines and hooks for the following.
      
      Niche: ${niche}
      Goal: ${goal}
      
      Requirements:
      1. Use a mix of "Power Headlines" for Ads and "Wait, What?" hooks for Reels/Shorts.
      2. Use simple English with high-intensity emotional triggers (Curiosity, Fear of Missing Out, Professional Authority).
      3. Tailor it specifically to an Indian audience (mentioning specific pain points found in India if relevant).
      
      Return the response in valid JSON format with the following structure:
      {
        "niche": "${niche}",
        "headlines": [
          { "type": "Meta Ad Headline", "text": "...", "psychology": "Why it works" },
          { "type": "Reel Hook (First 3 Sec)", "text": "...", "psychology": "..." },
          { "type": "Google Search Header", "text": "...", "psychology": "..." },
          ... (total 10 items)
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Headline API Error:", error);
    return NextResponse.json({ error: "Failed to generate headlines" }, { status: 500 });
  }
}
