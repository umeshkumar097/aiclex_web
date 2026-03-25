"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Loader2, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Globe,
  Zap,
  BarChart3,
  Users
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AiSeoChecker() {
  const [step, setStep] = useState(1); // 1: URL, 2: Lead, 3: Result
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [leadData, setLeadData] = useState({ name: "", email: "", whatsapp: "" });
  const [auditReport, setAuditReport] = useState<any>(null);
  const [error, setError] = useState("");

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return setError("Please enter a valid website URL");
    setError("");
    setStep(2);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, ...leadData }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAuditReport(data.result);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "Failed to analyze website. Please check the URL.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    if (!auditReport) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 1. Watermark
    doc.setTextColor(240, 240, 240);
    doc.setFontSize(60);
    doc.setFont("helvetica", "bold");
    doc.text("AICLEX TECHNOLOGIES", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });

    // 2. Header
    doc.setTextColor(0, 19, 65);
    doc.setFontSize(22);
    doc.text("AICLEX AI SEO Audit Report", 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Website: ${url}`, 20, 40);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 47);

    // 3. Score
    doc.setFillColor(82, 113, 255);
    doc.roundedRect(20, 55, pageWidth - 40, 20, 3, 3, "F");
    doc.setTextColor(255);
    doc.setFontSize(16);
    doc.text(`SEO Health Score: ${auditReport.score}/100`, pageWidth / 2, 68, { align: "center" });

    // 4. Summary
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text("Executive Summary", 20, 85);
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(auditReport.summary, pageWidth - 40);
    doc.text(summaryLines, 20, 92);

    // 5. Analysis Table
    autoTable(doc, {
      startY: 110,
      head: [["Area", "AI Feedback"]],
      body: [
        ["Title Tag", auditReport.detailedAnalysis.title],
        ["Meta Description", auditReport.detailedAnalysis.description],
        ["Headings Structure", auditReport.detailedAnalysis.headings],
        ["Image Optimization", auditReport.detailedAnalysis.images],
      ],
      headStyles: { fillColor: [82, 113, 255] },
    });

    // 6. Competitors
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text("Top 10 Competitors & Strategies", 20, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      head: [["Competitor", "Ranking Strength"]],
      body: auditReport.competitors.map((c: any) => [c.name, c.strength]),
      theme: 'grid'
    });

    // 7. Tips
    const tipsY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text("Ranking Action Plan (Top 10 Strategy)", 20, tipsY);
    doc.setFontSize(10);
    auditReport.rankingTips.forEach((tip: string, i: number) => {
       doc.text(`• ${tip}`, 20, tipsY + 8 + (i * 6));
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Copyright © AICLEX Technologies | info@aiclex.in", pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save(`aiclex-seo-report-${url.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF] pt-32 pb-24 font-sans">
      
      {/* --- SEO HEADER SEC --- */}
      <section className="max-w-6xl mx-auto px-6 mb-16 text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold shadow-sm">
                <Sparkles size={16} /> Free AI SEO Audit Tool
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-[#001341] tracking-tight leading-[1.1]">
              Analyze Your Website <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Like a Pro.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto">
              Get an instant AI-powered SEO report, identify your top competitors, and learn how to fix ranking issues to dominate the first page of Google.
            </p>
         </motion.div>
      </section>

      {/* --- TOOL CONTAINER --- */}
      <section className="max-w-4xl mx-auto px-6 relative overflow-visible">
         
         <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
            
            {/* PROGRESS BAR */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-50">
                <motion.div 
                   animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                   className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                />
            </div>

            <div className="p-8 md:p-16 flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 1: URL INPUT */}
                    {step === 1 && (
                        <motion.form 
                            key="step1" 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleUrlSubmit}
                            className="space-y-10"
                        >
                            <div className="text-center space-y-4">
                                <Search size={64} className="mx-auto text-blue-500 bg-blue-50 p-4 rounded-3xl" />
                                <h2 className="text-3xl font-black text-gray-900">Enter Website URL</h2>
                                <p className="text-gray-500">Provide the website link you want to audit for SEO performance.</p>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="e.g. yourwebsite.com"
                                    className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl text-xl font-medium focus:border-blue-500 focus:bg-white transition-all outline-none pl-14"
                                />
                                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={24} />
                            </div>

                            {error && <p className="text-red-500 text-center font-bold">{error}</p>}

                            <button type="submit" className="w-full py-5 bg-[#001341] text-white rounded-2xl font-black text-xl hover:bg-blue-900 shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95">
                                Start Free Analysis <ArrowRight size={20} />
                            </button>
                        </motion.form>
                    )}

                    {/* STEP 2: LEAD CAPTURE */}
                    {step === 2 && (
                        <motion.form 
                            key="step2" 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleLeadSubmit}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <ShieldCheck size={64} className="mx-auto text-green-500 bg-green-50 p-4 rounded-3xl" />
                                <h2 className="text-3xl font-black text-gray-900">Get Your Report</h2>
                                <p className="text-gray-500">Your audit is ready! Enter your details to view the insights and download the PDF.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input 
                                    required 
                                    className="p-5 bg-gray-50 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Full Name" 
                                    value={leadData.name} 
                                    onChange={(e)=>setLeadData({...leadData, name: e.target.value})}
                                />
                                <input 
                                    required 
                                    className="p-5 bg-gray-50 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Business Email" 
                                    type="email" 
                                    value={leadData.email} 
                                    onChange={(e)=>setLeadData({...leadData, email: e.target.value})}
                                />
                            </div>
                            <input 
                                required 
                                className="w-full p-5 bg-gray-50 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="WhatsApp Number (for report)" 
                                type="tel" 
                                value={leadData.whatsapp} 
                                onChange={(e)=>setLeadData({...leadData, whatsapp: e.target.value})}
                            />

                            <button disabled={loading} type="submit" className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transition-all">
                                {loading ? <Loader2 className="animate-spin" /> : <Zap size={24} />}
                                {loading ? "Analyzing SEO Data..." : "VIEW REPORT NOW"}
                            </button>
                        </motion.form>
                    )}

                    {/* STEP 3: RESULT DASHBOARD */}
                    {step === 3 && auditReport && (
                        <motion.div 
                            key="step3" 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            {/* Score Card */}
                            <div className="flex flex-col md:flex-row items-center gap-8 justify-between bg-blue-600 p-8 rounded-[2rem] text-white">
                                <div className="text-center md:text-left">
                                    <h3 className="text-4xl font-black">{auditReport.score}/100</h3>
                                    <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Aiclex SEO Health Score</p>
                                </div>
                                <div className="text-center md:text-right max-w-md">
                                    <p className="font-medium text-lg italic opacity-90">"{auditReport.summary}"</p>
                                </div>
                                <button onClick={generatePDF} className="p-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                                    <Download size={20} /> PDF REPORT
                                </button>
                            </div>

                            {/* Detailed Drilldown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
                                    <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs">
                                        <TrendingUp size={16} /> Title Tag Audit
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{auditReport.detailedAnalysis.title}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
                                    <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs">
                                        <BarChart3 size={16} /> Meta Description
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{auditReport.detailedAnalysis.description}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
                                    <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs">
                                        <CheckCircle2 size={16} /> Header Structure
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{auditReport.detailedAnalysis.headings}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
                                    <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs">
                                        <Users size={16} /> Competitor Strategy
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">AI detected {auditReport.competitors.length} key competitors ranking for your keywords.</p>
                                </div>
                            </div>

                            {/* Ranking Plan */}
                            <div className="p-8 bg-[#001341] text-white rounded-[2rem] space-y-6">
                                <h3 className="text-2xl font-black flex items-center gap-3">
                                    <Zap className="text-yellow-400" /> Rank Top 10 Action Plan
                                </h3>
                                <div className="grid gap-4">
                                   {auditReport.rankingTips.map((tip: string, i: number) => (
                                       <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10">
                                          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">{i+1}</div>
                                          <p className="text-white/80 font-medium text-sm leading-relaxed">{tip}</p>
                                       </div>
                                   ))}
                                </div>
                            </div>

                            <button onClick={() => setStep(1)} className="w-full text-center text-blue-600 font-black hover:underline">
                                Run Another SEO Check
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Bottom Branding */}
            <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img src="/logo.svg" alt="Aiclex Logo" width={100} className="opacity-70" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l pl-4 border-gray-200">Built with Gemini 1.5 Pro</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <AlertCircle size={14} />
                    <span className="text-[11px] font-bold uppercase">All audits are confidential & secure</span>
                </div>
            </div>
         </div>
      </section>

      {/* --- SEO CONTENT SEC FOR INDEXING --- */}
      <section className="max-w-4xl mx-auto px-6 mt-24 space-y-12">
          <div className="prose prose-lg max-w-none text-gray-600">
             <h2 className="text-3xl font-black text-[#001341]">Why Use AICLEX AI SEO Checker?</h2>
             <p>
                In today's digital landscape, ranking on the first page of Google is not just about keywords; it's about providing the best experience and most relevant content. Our **AI SEO Audit Tool** uses advanced machine learning models (Gemini 1.5 Pro) to analyze your website's fundamental SEO structure across Title Tags, Meta Descriptions, Heading Hierarchies, and Image Accessibility.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 font-bold">
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0">1</div>
                   <p>Comprehensive On-Page Analysis: Track missing meta data and broken heading structures instantly.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0">2</div>
                   <p>Deep Competitor Insights: Understand why top 10 competitors are outranking you for niche keywords.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0">3</div>
                   <p>Actionable Reports: Download a detailed PDF report with clear instructions on how to rank higher.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0">4</div>
                   <p>Official AICLEX Support: Get human expert review of your AI-generated report for enterprise growth.</p>
                </div>
             </div>
             <p className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 text-blue-900 font-medium">
                <strong>Pro Tip:</strong> Most Indian businesses fail to index because Google cannot understand their site's internal structure. Use our SEO Checker weekly to ensure your updates are crawl-friendly.
             </p>
          </div>
      </section>
      
    </main>
  );
}
