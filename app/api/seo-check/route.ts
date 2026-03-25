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

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error("GOOGLE_GEMINI_API_KEY is missing from environment");
      return NextResponse.json({ error: "System configuration error: API Key missing." }, { status: 500 });
    }

    // 1. Fetch the website HTML
    let html = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout
      
      const fetchUrl = url.startsWith('http') ? url : `https://${url}`;
      console.log("Analyzing URL:", fetchUrl);

      const response = await fetch(fetchUrl, { 
        signal: controller.signal,
        redirect: 'follow', // Explicitly follow redirects
        headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
        }
      });
      
      if (!response.ok && response.status !== 404) {
          console.warn(`Fetch non-ok status: ${response.status} for ${fetchUrl}`);
      }

      html = await response.text();
      clearTimeout(timeoutId);
    } catch (fetchErr) {
      console.error("Fetch Error for", url, ":", fetchErr);
      return NextResponse.json({ error: "Could not connect to the website. Please check the URL or try again later." }, { status: 422 });
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

    // Clean JSON from markdown if necessary
    let auditReport;
    try {
      const aiResult = await model.generateContent(prompt);
      const responseText = aiResult.response.text();
      
      // Find the first { and last } to handle any extra text from Gemini
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      auditReport = JSON.parse(jsonMatch[0]);
    } catch (err: any) {
      console.error("Gemini/Audit Error:", err);
      
      // Calculate a dynamic score based on extracted markers
      let dynamicScore = 30;
      if (extractedData.title !== "Missing") dynamicScore += 15;
      if (extractedData.description !== "Missing") dynamicScore += 15;
      if (extractedData.h1s.length === 1) dynamicScore += 20;
      if (extractedData.imagesWithoutAlt === 0) dynamicScore += 20;

      // Fallback report using extracted data
      auditReport = {
        score: Math.min(dynamicScore, 95),
        summary: `Technical analysis for ${url} complete. ${extractedData.title === "Missing" ? "Critical SEO markers are missing." : "Fundamental SEO structure is present but needs refinement."}`,
        detailedAnalysis: {
           title: extractedData.title === "Missing" 
            ? "CRITICAL: Your title tag is missing. Google uses this to determine your page's topic." 
            : `Title tag detected: "${extractedData.title}". ${extractedData.title.length > 60 ? "Warning: Title is too long (over 60 chars)." : "Good length."}`,
           description: extractedData.description === "Missing" 
            ? "MISSING: Meta description is absent. Google may generate its own snippet, which could reduce click-through rates." 
            : `Meta description found (${extractedData.description.length} chars). Ensure it has a strong Call to Action.`,
           headings: `We found ${extractedData.h1s.length} H1 tags. ${extractedData.h1s.length === 1 ? "Excellent structure." : "Warning: SEO best practice is exactly ONE H1 tag per page."}`,
           images: extractedData.totalImages > 0 
            ? `${extractedData.imagesWithoutAlt} out of ${extractedData.totalImages} images are missing 'alt' text. This blocks your site from ranking in Image Search.`
            : "No images found on the homepage to analyze."
        },
        competitors: [
           {name: "Market Leader", strength: "High Domain Authority & Content Depth", link: "#"},
           {name: "Local Competitor", strength: "Optimized for Regional Keywords", link: "#"},
           {name: "Niche Authority", strength: "Clean Technical SEO & Schema Markup", link: "#"}
        ],
        rankingTips: [
           extractedData.title === "Missing" ? "Add a unique <title> tag with your primary keyword at the start." : "Optimize your current title for high-intent 'Buy' or 'Services' keywords.",
           extractedData.h1s.length !== 1 ? "Ensure you have exactly one H1 tag that matches your main page topic." : "Check your H2-H3 hierarchy for logical content flow.",
           "Optimize all image filenames and add meaningful 'alt' text.",
           "Create more high-quality backlinks from reputable industry blogs."
        ],
        pdfMessage: "Technical Audit: Immediate improvements found for metadata and image accessibility."
      };
    }

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
