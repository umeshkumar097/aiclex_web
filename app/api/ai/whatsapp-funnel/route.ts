import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { niche, product, audience } = await req.json();

    if (!niche || !product) {
      return NextResponse.json({ error: "Missing niche or product" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      You are a world-class WhatsApp Marketing & Funnel Specialist for the Indian market.
      Your goal is to generate a high-converting 5-message WhatsApp Funnel sequence for a business in the following niche.
      
      Niche: ${niche}
      Product: ${product}
      Target Audience: ${audience || "General Business Owners/Consumers"}
      
      Requirements:
      1. Use a mix of English and occasional Hindi (Hinglish) where it adds a personal "Indian" touch to the sale.
      2. Keep it professional yet conversational.
      3. Each message should include emojis and a clear purpose.
      4. Avoid being too salesy; focus on building trust and solving a pain point.
      
      Return the response in STICKY JSON format (valid JSON) with the following structure:
      {
        "strategyName": "The [Niche] Profit Funnel",
        "messages": [
          { "day": "Day 1 (The Hook)", "text": "...", "objective": "Introduction & Value" },
          { "day": "Day 2 (The Problem)", "text": "...", "objective": "Pain Point Agitation" },
          { "day": "Day 3 (The Proof)", "text": "...", "objective": "Social Proof/Success Story" },
          { "day": "Day 4 (The Offer)", "text": "...", "objective": "Main Pitch & Urgency" },
          { "day": "Day 5 (Final CTA)", "text": "...", "objective": "Last Call for Action" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    const funnel = JSON.parse(jsonMatch[0]);

    return NextResponse.json(funnel);
  } catch (error: any) {
    console.error("WhatsApp Funnel Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate funnel. Please try again." }, { status: 500 });
  }
}
