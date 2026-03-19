import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const prompt = `
      You are an AI Sales Agent for a company named "Aiclex". 
      Aiclex provides AI-driven business automation solutions like AI Calling Agents, Marketing Assistants, and Custom AI Tools.
      
      Generate a short, professional, and welcoming introduction script (max 40 words) that an AI agent would say when a potential client calls.
      The tone should be helpful, professional, and have a slight Indian business etiquette feel (e.g., Namaste or Hello).
      
      Output ONLY the script text, no other formatting or explanation.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 100,
          },
        }),
      }
    );

    const data = await response.json();
    const script = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
      "Namaste! I am your Aiclex AI assistant. We help businesses scale with intelligent automation and AI-powered solutions. How can I assist you today?";

    return NextResponse.json({ script });
  } catch (error) {
    console.error("Agent Script Error:", error);
    return NextResponse.json({ 
        script: "Hello! I am from Aiclex. We provide cutting-edge AI automation for businesses. Our AI agents can handle your calls, marketing, and sales 24/7. How can we help you scale today?" 
    });
  }
}
