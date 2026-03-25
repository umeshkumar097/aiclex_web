import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pool from "@/lib/db";
import { htmlToText } from "html-to-text";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { url, name, email, whatsapp } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Fetch the website HTML
    let html = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const response = await fetch(url.startsWith('http') ? url : `https://${url}`, { 
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AiclexBot/1.0; +https://aiclex.in)' }
      });
      html = await response.text();
      clearTimeout(timeoutId);
    } catch (fetchErr) {
      console.error("Fetch Error:", fetchErr);
      return NextResponse.json({ error: "Could not fetch the website. Please check the URL." }, { status: 422 });
    }

    // 2. Extract SEO markers (Basic Scrape)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) || 
                         html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
    
    // Extract H1s (up to 3)
    const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map(m => m[1].replace(/<[^>]*>/g, '').trim()).slice(0, 3);
    
    // Count images without alt
    const imgMatches = Array.from(html.matchAll(/<img[^>]*>/gi));
    const imgsWithoutAlt = imgMatches.filter(img => !img[0].toLowerCase().includes('alt=')).length;

    const extractedData = {
      title: titleMatch ? titleMatch[1] : "Missing",
      description: metaDescMatch ? metaDescMatch[1] : "Missing",
      h1s: h1Matches.length > 0 ? h1Matches : ["Missing"],
      imagesWithoutAlt: imgsWithoutAlt,
      totalImages: imgMatches.length
    };

    // 3. AI Analysis with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `
      Perform a professional SEO audit for the website: ${url}
      Based on this extracted data:
      Title: ${extractedData.title}
      Meta Description: ${extractedData.description}
      H1 Tags: ${extractedData.h1s.join(", ")}
      Images without alt: ${extractedData.imagesWithoutAlt} out of ${extractedData.totalImages}

      Provide your response in JSON format (strictly JSON) with the following structure:
      {
        "score": number (0-100),
        "summary": "short professional overview of the site's SEO health",
        "detailedAnalysis": {
           "title": "feedback on title tag",
           "description": "feedback on meta description",
           "headings": "feedback on H-tags structure",
           "images": "feedback on image optimization"
        },
        "competitors": [
           {"name": "Competitor Name", "strength": "reason they are ranking well", "link": "simulated URL"}
        ], // Provide 5 top competitors in India for this niche
        "rankingTips": [
           "Actionable tip 1 to reach top 10",
           "Actionable tip 2...",
           "..." 
        ],
        "pdfMessage": "A professional summary for a PDF report"
      }
    `;

    const aiResult = await model.generateContent(prompt);
    const responseText = aiResult.response.text();
    
    // Clean JSON from markdown if necessary
    const jsonString = responseText.replace(/```json|```/g, "").trim();
    const auditReport = JSON.parse(jsonString);

    // 4. Save Lead to DB
    try {
      await pool.query(
        "INSERT INTO leads (name, email, whatsapp, requirement, status) VALUES ($1, $2, $3, $4, $5)",
        [name, email, whatsapp, `SEO Audit for ${url} (Score: ${auditReport.score})`, 'new']
      );
    } catch (dbErr) {
      console.error("DB Error (silent):", dbErr);
    }

    return NextResponse.json({ result: auditReport });

  } catch (error: any) {
    console.error("SEO Check API Error:", error);
    return NextResponse.json({ error: "Failed to perform SEO check. Please try again." }, { status: 500 });
  }
}
