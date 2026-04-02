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

    // 5. Premium Metrics Table
    autoTable(doc, {
      startY: 110,
      head: [["Metric", "Aiclex™ AI Prediction", "Status"]],
      body: [
        ["Domain Authority (DA)", `${auditReport.premiumMetrics?.estimatedDA || "N/A"}/100`, auditReport.premiumMetrics?.estimatedDA > 50 ? "Healthy" : "Needs Growth"],
        ["Linking Domains", auditReport.premiumMetrics?.linkingDomains || "0", "Analysis Complete"],
        ["Spam Risk Score", `${auditReport.premiumMetrics?.spamScore || "1"}%`, auditReport.premiumMetrics?.spamScore < 10 ? "Safe" : "High Risk"],
        ["Ranking Keywords", auditReport.premiumMetrics?.rankingKeywords?.length || "0", "Top 50 Results"],
      ],
      headStyles: { fillColor: [0, 19, 65] },
      styles: { fontSize: 9, cellPadding: 5 }
    });

    // 6. Analysis Table
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["Category", "Expert Auditor Feedback"]],
      body: [
        ["Technical SEO", auditReport.detailedAnalysis.technical],
        ["On-Page SEO", auditReport.detailedAnalysis.onPage],
        ["Content Quality", auditReport.detailedAnalysis.content],
        ["Image Optimization", auditReport.detailedAnalysis.images],
        ["Social Signals", auditReport.detailedAnalysis.social],
      ],
      headStyles: { fillColor: [82, 113, 255] },
      styles: { fontSize: 9, cellPadding: 5 }
    });

    // 6. Critical Issues (New Page or Section)
    const issuesY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 38); // Red for critical
    doc.text("Critical Issues Found (Fix Immediately)", 20, issuesY);
    
    doc.setFontSize(9);
    doc.setTextColor(80);
    auditReport.criticalIssues.forEach((issue: string, i: number) => {
       doc.text(`[!] ${issue}`, 25, issuesY + 10 + (i * 7));
    });

    // 7. Competitors
    doc.addPage();
    doc.setTextColor(0, 19, 65);
    doc.setFontSize(18);
    doc.text("Strategic Competitor Insights", 20, 30);
    
    autoTable(doc, {
      startY: 40,
      head: [["Competitor", "Their Ranking Strength"]],
      body: auditReport.competitors.map((c: any) => [c.name, c.strength]),
      theme: 'grid',
      headStyles: { fillColor: [0, 19, 65] }
    });

    // 8. Ranking Plan
    const planY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(16);
    doc.text("Rank Top 10 Action Plan", 20, planY);
    
    doc.setFontSize(10);
    auditReport.rankingTips.forEach((tip: string, i: number) => {
       doc.text(`${i + 1}. ${tip}`, 20, planY + 10 + (i * 8));
    });

    // 9. CTA Section in PDF
    const ctaY = pageHeight - 60;
    doc.setFillColor(248, 250, 255);
    doc.roundedRect(20, ctaY, pageWidth - 40, 40, 5, 5, "F");
    doc.setTextColor(82, 113, 255);
    doc.setFontSize(14);
    doc.text(auditReport.aiclexCTA.title, pageWidth / 2, ctaY + 15, { align: "center" });
    doc.setFontSize(9);
    doc.setTextColor(100);
    const ctaText = doc.splitTextToSize(auditReport.aiclexCTA.description, pageWidth - 60);
    doc.text(ctaText, pageWidth / 2, ctaY + 25, { align: "center" });
    doc.setFontSize(10);
    doc.setTextColor(0, 19, 65);
    doc.text("Connect with us: info@aiclex.in | +91 9773725175", pageWidth / 2, ctaY + 35, { align: "center" });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Report by AICLEX Technologies - Proprietary AI Analysis", pageWidth / 2, pageHeight - 10, { align: "center" });

    try {
      doc.save(`aiclex-seo-report-${url.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    } catch (pdfErr) {
      console.error("PDF Generation Error:", pdfErr);
      const blob = doc.output("blob");
      const urlBlob = URL.createObjectURL(blob);
      window.open(urlBlob);
    }
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
      <section className="max-w-5xl mx-auto px-6 relative overflow-visible">
         
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
                    className="space-y-10"
                >
                    {/* Urgency Alert Hook */}
                    {auditReport.score < 70 && (
                      <div className="bg-orange-50 border-2 border-orange-100 p-6 rounded-2xl flex items-center gap-4 animate-pulse">
                        <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                          <AlertCircle size={28} />
                        </div>
                        <div>
                          <h4 className="text-orange-900 font-black text-lg">Your website is losing customers ⚠️</h4>
                          <p className="text-orange-700 text-sm font-medium">Critical technical gaps are preventing potential clients from finding you on Google.</p>
                        </div>
                      </div>
                    )}

                    {/* Moz-Style Premium Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Domain Authority</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-4xl font-black text-[#001341]">{auditReport.premiumMetrics?.estimatedDA || "N/A"}</h3>
                                <span className="text-[10px] font-bold text-gray-400 mb-1.5 italic">Aiclex™ Prediction</span>
                            </div>
                            <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${auditReport.premiumMetrics?.estimatedDA}%` }} className="h-full bg-blue-600" />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Linking Domains</p>
                            <h3 className="text-4xl font-black text-[#001341]">{auditReport.premiumMetrics?.linkingDomains || "0"}</h3>
                            <p className="text-[10px] font-bold text-green-600 mt-2 flex items-center gap-1"><TrendingUp size={12} /> High growth potential</p>
                        </div>
                        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ranking Keywords</p>
                            <h3 className="text-4xl font-black text-[#001341]">{auditReport.premiumMetrics?.rankingKeywords?.length || "0"}</h3>
                            <p className="text-[10px] font-bold text-gray-400 mt-2">Identified in top 50 Results</p>
                        </div>
                        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Spam Risk Score</p>
                            <h3 className={`text-4xl font-black ${auditReport.premiumMetrics?.spamScore > 20 ? "text-red-500" : "text-green-500"}`}>
                                {auditReport.premiumMetrics?.spamScore || "1"}%
                            </h3>
                            <p className="text-[10px] font-bold text-gray-400 mt-2">Backlink profile health</p>
                        </div>
                    </div>

                    {/* Visibility Chart & Score Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 bg-[#001341] p-10 rounded-[2.5rem] text-white flex flex-col justify-center text-center md:text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                              <Zap size={120} />
                            </div>
                            <h3 className="text-6xl font-black mb-2">{auditReport.score}/100</h3>
                            <p className="text-blue-300 font-black uppercase tracking-widest text-xs mb-6">Aggregate SEO Score</p>
                            <p className="text-lg font-bold leading-relaxed mb-8">"{auditReport.summary}"</p>
                            <button onClick={generatePDF} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-95">
                                <Download size={20} /> Get Full Report Tool
                            </button>
                        </div>

                        <div className="lg:col-span-8 bg-white border border-gray-100 p-10 rounded-[2.5rem] space-y-6">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-black text-[#001341] flex items-center gap-2">
                                  <BarChart3 className="text-blue-600" /> Potential Visibility Trend
                                </h4>
                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">Optimized Growth</span>
                            </div>
                            <div className="h-48 w-full bg-gray-50 rounded-3xl relative p-6 flex items-end justify-between overflow-hidden">
                                {auditReport.premiumMetrics?.visibilityTrend?.map((val: number, i: number) => (
                                  <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-[12%] bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-xl relative group"
                                  >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#001341] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                      {val}%
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                                <span>Month 1</span>
                                <span>Month 3</span>
                                <span>Month 6 (Projected)</span>
                            </div>
                        </div>
                    </div>

                    {/* Critical Issues & Competitors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-red-50 border-2 border-red-100 p-10 rounded-[2.5rem] space-y-6">
                            <h4 className="text-red-700 font-black flex items-center gap-2 uppercase text-xs tracking-widest">
                                <AlertCircle size={20} /> Losing Revenue: Critical Fixes
                            </h4>
                            <div className="space-y-4">
                                {auditReport.criticalIssues?.slice(0, 5).map((issue: string, i: number) => (
                                    <div key={i} className="flex gap-4 items-start bg-white/50 p-4 rounded-xl border border-red-50">
                                        <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <p className="text-red-900/80 font-bold text-sm leading-relaxed">{issue}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border-2 border-gray-100 p-10 rounded-[2.5rem] space-y-6">
                            <h4 className="text-[#001341] font-black flex items-center gap-2 uppercase text-xs tracking-widest">
                                <Users size={20} className="text-blue-500" /> Regional Competitors
                            </h4>
                            <div className="space-y-4">
                                {auditReport.competitors?.map((comp: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl group hover:bg-[#001341] hover:text-white transition-all cursor-pointer border border-transparent hover:border-blue-500">
                                        <div className="space-y-1">
                                            <p className="font-black text-sm">{comp.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 group-hover:text-blue-200 uppercase">{comp.strength}</p>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-400 text-center font-bold italic pt-2">Competitors identified based on shared technical keywords</p>
                        </div>
                    </div>

                    {/* Detailed Analysis Grill */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-8 bg-gray-50 rounded-[2rem] space-y-3 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-50">
                            <div className="flex items-center gap-2 text-blue-700 font-black uppercase text-[10px] tracking-widest">
                                <Zap size={14} /> Technical SEO
                            </div>
                            <p className="text-gray-600 font-medium text-sm leading-relaxed">{auditReport.detailedAnalysis.technical}</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-[2rem] space-y-3 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-indigo-50">
                            <div className="flex items-center gap-2 text-indigo-700 font-black uppercase text-[10px] tracking-widest">
                                <TrendingUp size={14} /> On-Page Hierarchy
                            </div>
                            <p className="text-gray-700 font-medium text-sm leading-relaxed">{auditReport.detailedAnalysis.onPage}</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-[2rem] space-y-3 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-emerald-50">
                            <div className="flex items-center gap-2 text-emerald-700 font-black uppercase text-[10px] tracking-widest">
                                <Sparkles size={14} /> Content Gap
                            </div>
                            <p className="text-gray-600 font-medium text-sm leading-relaxed">{auditReport.detailedAnalysis.content}</p>
                        </div>
                    </div>

                    {/* Expert Intervention CTA */}
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-12 rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 p-12 opacity-10">
                          <CheckCircle2 size={180} />
                        </div>
                        <div className="max-w-2xl relative z-10">
                            <div className="inline-flex px-4 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase mb-4 tracking-widest">Expert Ranking Intervention</div>
                            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                {auditReport.aiclexCTA.title}
                            </h3>
                            <p className="text-blue-100 text-lg font-medium leading-relaxed mb-10">
                                {auditReport.aiclexCTA.description}
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <a 
                                href={`https://wa.me/918449488090?text=Hi Aiclex Team, My SEO Score for ${url} is ${auditReport.score}. I want to fix my 'losing customers' issues.`} 
                                target="_blank"
                                className="px-10 py-5 bg-white text-blue-700 rounded-2xl font-black text-center shadow-2xl hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
                            >
                                {auditReport.aiclexCTA.action} <ArrowRight size={22} />
                            </a>
                            <button onClick={generatePDF} className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-center hover:bg-white/20 transition-all">
                                View Full Strategy Roadmap
                            </button>
                        </div>
                    </div>

                    <button onClick={() => setStep(1)} className="w-full text-center text-gray-400 font-bold hover:text-[#001341] transition-colors uppercase text-[10px] tracking-[0.2em] pt-8">
                        ← Analyze Another Property
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
