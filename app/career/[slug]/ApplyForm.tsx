"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, Loader2, X } from "lucide-react";

interface ApplyFormProps {
  jobId: number;
  jobTitle: string;
}

export default function ApplyForm({ jobId, jobTitle }: ApplyFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Instant R2 Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g. max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Instant Upload to R2 via generic /api/upload
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      setFileUrl(data.url); // Save the R2 URL
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) {
      alert("Please wait for your resume to upload.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit JSON payload with the instantly uploaded file URL
      const res = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          full_name: fullName,
          email,
          message,
          resume_url: fileUrl,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || "Failed to submit application"}`);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 rounded-3xl p-10 text-center border border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Application Received!</h3>
        <p className="text-green-800/80 mb-0">
          Thank you for applying for <strong>{jobTitle}</strong>. Our team will review your profile and get in touch with you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,19,65,0.05)] rounded-3xl p-8 md:p-10 mt-12" id="apply-form">
      <h3 className="text-3xl font-extrabold text-[#001341] mb-8">Apply for this Role</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#ff914d] focus:border-transparent outline-none transition-all font-medium text-[#001341]" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#ff914d] focus:border-transparent outline-none transition-all font-medium text-[#001341]" placeholder="john@example.com" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Resume/CV (Instant Upload)</label>
          <div 
            onClick={() => !isUploading && document.getElementById('resume-upload')?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${fileUrl ? 'border-green-500 bg-green-50 cursor-default' : isUploading ? 'border-blue-300 bg-blue-50 cursor-wait' : 'border-gray-200 hover:border-[#ff914d] hover:bg-orange-50 cursor-pointer group'}`}
          >
            {isUploading ? (
               <Loader2 className="mx-auto h-8 w-8 text-[#1967d2] animate-spin mb-2" />
            ) : fileUrl ? (
               <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 mb-2" />
            ) : (
               <UploadCloud className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#ff914d] transition-colors mb-2" />
            )}
            
            <span className={`text-sm font-bold ${fileUrl ? 'text-green-700' : isUploading ? 'text-blue-700' : 'text-[#001341]'}`}>
              {isUploading ? "Uploading instantly to secure storage..." : fileUrl ? "Resume Uploaded Successfully!" : "Click to select resume"}
            </span>
            {!fileUrl && !isUploading && <span className="text-xs text-gray-500 block mt-1 font-medium">PDF or DOCX (Max 5MB)</span>}
            
            <input 
              id="resume-upload"
              type="file" 
              className="hidden" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileUpload}
              disabled={isUploading || !!fileUrl}
            />
          </div>
          {fileUrl && (
            <div className="flex justify-end">
              <button type="button" onClick={() => setFileUrl(null)} className="text-xs text-red-500 hover:underline font-bold mt-1">Remove file</button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Cover Letter / Message (Optional)</label>
          <textarea 
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#ff914d] focus:border-transparent outline-none transition-all font-medium text-[#001341]"
            placeholder="Briefly explain why you're a perfect fit for this role..."
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !fileUrl || isUploading} 
          className="w-full py-4 rounded-xl bg-[#001341] text-white font-bold text-lg hover:bg-[#ff914d] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Submitting Application...</> : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
