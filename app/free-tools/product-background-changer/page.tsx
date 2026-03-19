"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  CheckCircle, 
  Download, 
  Loader2, 
  RefreshCcw, 
  Sparkles,
  User,
  Mail,
  Phone,
  ArrowRight,
  Palette
} from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import Navbar from "@/components/Navbar";

const BACKGROUND_COLORS = [
  { name: "Transparent", value: "transparent" },
  { name: "White", value: "#ffffff" },
  { name: "Soft Gray", value: "#f3f4f6" },
  { name: "Business Blue", value: "#001341" },
  { name: "Aiclex Orange", value: "#ff914d" },
  { name: "Cyan", value: "#06b6d4" }
];

export default function BackgroundChangerPage() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Processing, 3: Lead Capture, 4: Editor
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("transparent");
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", whatsapp: "" });
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        processImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (file: File) => {
    setStep(2);
    setLoading(true);
    try {
      const blob = await removeBackground(file, {
        progress: (status, progress) => {
          console.log(`Processing: ${status} (${Math.round(progress * 100)}%)`);
        }
      });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      setLoading(false);
      setStep(3); // Go to lead capture
    } catch (err) {
      console.error(err);
      setError("Failed to remove background. Please try a different image.");
      setStep(1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadData.name && leadData.email && leadData.whatsapp) {
       console.log("New Background Changer Lead:", leadData);
       setStep(4); // Show editor
    } else {
       setError("Please fill in all details to download your image.");
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "aiclex-product-bg-removed.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    if (processedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = processedImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw background
        if (bgColor === "transparent") {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Draw product
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [processedImage, bgColor]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-10">
      
      {/* --- HERO --- */}
      <section className="py-16 px-6 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold shadow-sm mb-6"
          >
            <Sparkles size={14} /> FREE PRODUCT PHOTO TOOL
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-[#001341] tracking-tight mb-4">
             AI Product <span className="text-[#ff914d]">Background Changer</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
             Remove backgrounds from your product photos instantly using AI. High quality, professional results for your E-commerce store.
          </p>
      </section>

      {/* --- TOOL AREA --- */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
             
             <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: UPLOAD */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-8"
                    >
                      <label 
                        className="block w-full max-w-md mx-auto aspect-video border-4 border-dashed border-gray-100 rounded-[2rem] hover:border-[#ff914d] hover:bg-orange-50/50 transition-all cursor-pointer group"
                      >
                         <div className="h-full flex flex-col items-center justify-center space-y-4">
                            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#ff914d] group-hover:text-white transition-all text-gray-400">
                               <Upload size={32} />
                            </div>
                            <div>
                               <p className="font-bold text-gray-700">Drop image or Click to Upload</p>
                               <p className="text-xs text-gray-400">Supports PNG, JPG (Clean product shots work best)</p>
                            </div>
                         </div>
                         <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                      </label>
                      
                      <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                         <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Professional Grade</span>
                         <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Free Forever</span>
                         <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Quick & Easy</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PROCESSING */}
                  {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="relative w-32 h-32 mx-auto">
                           <Loader2 className="w-full h-full text-[#ff914d] animate-spin-slow" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles className="text-blue-500 animate-pulse" />
                           </div>
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-[#001341]">Removing Background...</h2>
                           <p className="text-gray-500 text-sm italic">Our AI is analyzing your product pixels</p>
                        </div>
                    </motion.div>
                  )}

                  {/* STEP 3: LEAD CAPTURE */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-md mx-auto space-y-8"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 text-[#ff914d] rounded-full flex items-center justify-center mx-auto mb-4">
                               <ImageIcon size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-[#001341]">Processing Complete!</h2>
                            <p className="text-gray-500 text-sm">Where should we send your professional product photo?</p>
                        </div>

                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-[#ff914d] transition-all">
                                 <User size={18} className="text-gray-400" />
                                 <input 
                                   required 
                                   type="text" 
                                   placeholder="Full Name" 
                                   className="bg-transparent outline-none w-full text-sm font-medium"
                                   value={leadData.name}
                                   onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-[#ff914d] transition-all">
                                 <Mail size={18} className="text-gray-400" />
                                 <input 
                                   required 
                                   type="email" 
                                   placeholder="Email Address" 
                                   className="bg-transparent outline-none w-full text-sm font-medium"
                                   value={leadData.email}
                                   onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-[#ff914d] transition-all">
                                 <Phone size={18} className="text-gray-400" />
                                 <input 
                                   required 
                                   type="tel" 
                                   placeholder="WhatsApp Number" 
                                   className="bg-transparent outline-none w-full text-sm font-medium"
                                   value={leadData.whatsapp}
                                   onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                                 />
                              </div>
                           </div>

                           <button
                             type="submit"
                             className="w-full py-4 bg-[#001341] text-white font-black text-xl rounded-2xl shadow-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2"
                           >
                             DOWNLOAD FREE <Download size={20} />
                           </button>
                        </form>
                    </motion.div>
                  )}

                  {/* STEP 4: EDITOR */}
                  {step === 4 && (
                    <motion.div
                       key="step4"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    >
                       {/* Left: Preview */}
                       <div className="space-y-4">
                          <div 
                            className="aspect-square bg-gray-100 rounded-[2rem] border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-inner"
                            style={{ backgroundColor: bgColor === "transparent" ? "#f3f4f6" : bgColor }}
                          >
                             {bgColor === "transparent" && (
                               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#001341 1px, transparent 1px)", backgroundSize: "10px 10px" }}></div>
                             )}
                             <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex gap-2">
                             <button 
                               onClick={() => setStep(1)}
                               className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                             >
                                <RefreshCcw size={16} /> RE-UPLOAD
                             </button>
                             <button 
                               onClick={downloadImage}
                               className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg"
                             >
                                <Download size={16} /> DOWNLOAD
                             </button>
                          </div>
                       </div>

                       {/* Right: Controls */}
                       <div className="space-y-8">
                          <div className="space-y-4">
                             <div className="flex items-center gap-2 text-[#001341] font-black uppercase text-xs tracking-widest">
                                <Palette size={16} /> Choose Background
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                                {BACKGROUND_COLORS.map(c => (
                                  <button
                                    key={c.value}
                                    onClick={() => setBgColor(c.value)}
                                    className={`p-3 rounded-xl border-2 text-[10px] font-bold transition-all ${
                                      bgColor === c.value 
                                        ? "border-[#ff914d] bg-white shadow-md text-[#ff914d]" 
                                        : "border-gray-50 bg-gray-50 text-gray-400 hover:border-blue-100"
                                    }`}
                                  >
                                    <div className="w-full h-8 rounded-lg mb-2 shadow-sm border border-black/5" style={{ backgroundColor: c.value === 'transparent' ? '#f3f4f6' : c.value }}></div>
                                    {c.name}
                                  </button>
                                ))}
                             </div>
                          </div>

                          <div className="p-6 bg-blue-50 rounded-3xl space-y-4 border border-blue-100 shadow-sm">
                             <h3 className="text-[#001341] font-black text-lg">Want professional editing?</h3>
                             <p className="text-blue-900/60 text-xs font-medium leading-relaxed">
                                AI is great, but human touch is premium. Get your full catalog edited by Aiclex experts with custom shadows and professional retouching.
                             </p>
                             <a 
                               href="https://wa.me/918449488090" 
                               target="_blank"
                               className="block w-full py-3 bg-[#001341] text-white text-center rounded-xl font-bold text-xs hover:bg-blue-900 transition-all flex items-center justify-center gap-2"
                             >
                                BOOK FREE AUDIT <ArrowRight size={14} />
                             </a>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

          </div>
        </div>
      </section>

    </main>
  );
}
