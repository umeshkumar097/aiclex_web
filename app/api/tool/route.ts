import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, platform, tone, name, email, whatsapp } = await req.json();

    console.log("AI Tool Request:", { name, email, whatsapp, topic, platform, tone });

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
       return NextResponse.json({ error: "Gemini API key is missing." }, { status: 500 });
    }

    // Try multiple models and endpoints (v1 and v1beta)
    const configs = [
      { model: "gemini-3.1-pro-preview", version: "v1beta" },
      { model: "gemini-1.5-pro", version: "v1" },
      { model: "gemini-1.5-flash", version: "v1" },
      { model: "gemini-2.0-flash-exp", version: "v1beta" },
      { model: "gemini-pro", version: "v1" }
    ];

    let resultText = "";
    let lastError = "";

    for (const config of configs) {
      try {
        console.log(`Trying Gemini ${config.model} (${config.version})...`);
        const url = `https://generativelanguage.googleapis.com/${config.version}/models/${config.model}:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `
                  You are an expert Social Media Marketer for the Indian market, working for a premium agency called "Aiclex".
                  Generate highly engaging ${platform} content for the following topic: ${topic}.
                  The tone should be ${tone}.
                  
                  Target Audience: Indian homeowners, business owners, and youth.
                  
                  Requirements:
                  1. Use a mix of English and simple Hinglish if appropriate.
                  2. Include emojis and 5-10 trending Indian hashtags.
                  3. Structure with a Headline and Post Caption.
                `
              }]
            }]
          })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          resultText = data.candidates[0].content.parts[0].text;
          console.log(`Success with ${config.model} (${config.version})`);
          break;
        } else {
          lastError = data.error?.message || JSON.stringify(data);
          console.warn(`Failed ${config.model}: ${lastError}`);
        }
      } catch (err: any) {
        lastError = err.message;
        console.warn(`Fetch error for ${config.model}: ${err.message}`);
      }
    }

    if (!resultText) {
      return NextResponse.json({ error: "AI failed to generate content.", debug: lastError }, { status: 500 });
    }

    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
