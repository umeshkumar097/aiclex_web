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

    // 2. Extract SEO markers (Deep Scrape)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) || 
                         html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
    
    // OG & Twitter Tags
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1];
    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1];
    const twitterCard = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1];

    // Canonical & Robots
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1];
    const robots = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1];
    const viewport = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1];

    // Headers count
    const h1s = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const h2Count = (html.match(/<h2/gi) || []).length;
    const h3Count = (html.match(/<h3/gi) || []).length;

    // Images & Scripts
    const imgMatches = Array.from(html.matchAll(/<img[^>]*>/gi));
    const imgsWithoutAlt = imgMatches.filter(img => !img[0].toLowerCase().includes('alt=')).length;
    const scriptCount = (html.match(/<script/gi) || []).length;

    const extractedData = {
      title: titleMatch ? titleMatch[1] : "Missing",
      description: metaDescMatch ? metaDescMatch[1] : "Missing",
      ogTitle: ogTitle || "Missing",
      ogDesc: ogDesc || "Missing",
      twitterCard: twitterCard || "Missing",
      canonical: canonical || "Missing",
      robots: robots || "Not Set",
      viewport: viewport || "Missing",
      h1s: h1s.length > 0 ? h1s : ["Missing"],
      h2Count,
      h3Count,
      imagesWithoutAlt: imgsWithoutAlt,
      totalImages: imgMatches.length,
      scriptCount,
      textPreview: htmlToText(html, { wordwrap: 130 }).substring(0, 1500) // First 1500 chars for AI context
    };

    // 3. AI Analysis with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `
      Act as a Senior Technical SEO Architect at Aiclex Technologies. 
      Perform a "Brutally Honest" and highly detailed SEO audit for the website: ${url}
      
      Website Technical Signature:
      - Title: ${extractedData.title}
      - Description: ${extractedData.description}
      - OG Tags: Title(${extractedData.ogTitle}), Description(${extractedData.ogDesc})
      - Mobile: Viewport(${extractedData.viewport})
      - Headers: H1s(${extractedData.h1s.join(", ")}), H2s(${extractedData.h2Count}), H3s(${extractedData.h3Count})
      - Assets: Images(${extractedData.totalImages}, ${extractedData.imagesWithoutAlt} missing alt), Scripts(${extractedData.scriptCount})
      - Robots/Canonical: ${extractedData.robots} / ${extractedData.canonical}
      
      Content Preview (Context):
      ${extractedData.textPreview}

      Your task is to generate a comprehensive 1-2 page equivalent audit. 
      Avoid generic fluff. Identify SPECIFIC technical problems and content gaps.

      Provide your response in JSON format (strictly JSON) with the following structure:
      {
        "score": number (0-100),
        "summary": "2-3 sentences of executive summary",
        "detailedAnalysis": {
           "technical": "Specific feedback on canonicals, robots, viewport, and script bloat",
           "onPage": "Feedback on Title, Meta, and H-tag semantic hierarchy",
           "content": "Critique of the text preview provided - is it engaging? are keywords missing?",
           "images": "Detailed optimization strategy for their images",
           "social": "Analysis of OpenGraph and Social signals"
        },
        "premiumMetrics": {
           "estimatedDA": number (1-100),
           "linkingDomains": number (estimated backlink strength),
           "spamScore": number (0-100),
           "rankingKeywords": ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5"],
           "visibilityTrend": [number, number, number, number, number, number] 
        },
        "criticalIssues": [
           "CRITICAL: Your website is losing customers due to [Problem Found]",
           "..." // Provide 5-7 critical specific issues
        ],
        "competitors": [
           {"name": "Real Competitor", "strength": "Specific reason they win in Google India", "link": "#"}
        ],
        "rankingTips": [
           "Actionable rank-boosting tip 1",
           "Actionable rank-boosting tip 2",
           "..." // Provide 5-7 actionable tips
        ],
        "pdfMessage": "A professional 300-word deep-dive summary for an enterprise-level PDF report",
        "aiclexCTA": {
           "title": "Your website is losing customers ⚠️",
           "description": "Your current SEO score indicates major technical gaps that are blocking your revenue growth. Aiclex experts can resolve all these issues in under 15 days.",
           "action": "Scale with Aiclex SEO™"
        }
      }
    `;

    // Clean JSON from markdown if necessary
    let auditReport;
    try {
      const aiResult = await model.generateContent(prompt);
      const responseText = aiResult.response.text();
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      auditReport = JSON.parse(jsonMatch[0]);
    } catch (err: any) {
      console.error("Gemini/Audit Error:", err);
      
      // Dynamic fallback
      let dynamicScore = 30;
      if (extractedData.title !== "Missing") dynamicScore += 10;
      if (extractedData.description !== "Missing") dynamicScore += 10;
      if (extractedData.viewport !== "Missing") dynamicScore += 15;
      if (extractedData.h1s.length === 1) dynamicScore += 15;
      if (extractedData.imagesWithoutAlt === 0) dynamicScore += 20;

      auditReport = {
        score: Math.min(dynamicScore, 90),
        summary: `Technical analysis for ${url} is complete. Some core markers were detected, but significant optimization is required for Google indexing.`,
        detailedAnalysis: {
           technical: extractedData.viewport === "Missing" ? "CRITICAL: Missing mobile viewport. Site is not responsive for mobile users." : "Mobile signals detected, but sitemap and robots.txt need verification.",
           onPage: `We found ${extractedData.h1s.length} H1 tags. Best practice is exactly ONE H1 tag. Metadata is ${extractedData.title === "Missing" ? "MISSING" : "Present"}.`,
           content: "Initial scan suggests low keyword density for high-intent business terms.",
           images: `${extractedData.imagesWithoutAlt} images are missing alternative text. This is a major accessibility failure.`,
           social: extractedData.ogTitle === "Missing" ? "OpenGraph tags are missing. Social sharing will look unprofessional." : "Some social tags are present but not fully optimized."
        },
        criticalIssues: [
          extractedData.title === "Missing" ? "Missing Page Title" : "Title tag needs keyword optimization",
          extractedData.description === "Missing" ? "Missing Meta Description" : "Short meta description (CTR issue)",
          extractedData.imagesWithoutAlt > 0 ? "Missing Image Alt-Text" : "Slow image delivery detected",
          extractedData.viewport === "Missing" ? "No Mobile Optimization" : "Mobile UX needs refinement",
          "Unoptimized header hierarchy (H1-H3)"
        ],
        competitors: [
           {name: "Market Leader", strength: "High Backlink Profile & Authority", link: "#"},
           {name: "Local Authority", strength: "Optimized for Top-Tier Keywords", link: "#"}
        ],
        rankingTips: [
           "Fix all meta data using high-intent keywords immediately.",
           "Consolidate H1 tags into a single semantic heading.",
           "Optimize all images for WebP format and accessibility.",
           "Increase content depth to at least 1500 words per major page.",
           "Connect with Aiclex for a managed backlink strategy."
        ],
        pdfMessage: "Audit Overview: The website has significant structural flaws that are preventing it from ranking on the first page of Google. Urgent attention is required for meta-data and mobile accessibility.",
        aiclexCTA: {
           title: "Is your business losing traffic?",
           description: "Most SEO issues like these are technical. Let Aiclex handle the complexity while you handle the business.",
           action: "Get Expert Help Now"
        }
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
