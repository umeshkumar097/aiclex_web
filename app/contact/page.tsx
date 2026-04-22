"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ArrowRight,
  CheckCircle2,
  ChevronDown, // Imported from Lucide
  Loader2      // Imported from Lucide
} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset after showing success message
    setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="w-full bg-gray-50 overflow-hidden relative">
      
      {/* --- Decorative Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
        <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-orange-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#5271ff] font-bold tracking-wider uppercase text-xs mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#001341] mb-6 leading-tight">
            Let's Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-[#ff914d]">
                Conversation
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hi? We'd love to hear from you. Let's create something amazing together.
          </p>
        </div>
      </section>

      {/* ==================== CONTENT GRID ==================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* --- LEFT COLUMN: Image & Contact Cards --- */}
          <div className="space-y-12">
            
            {/* Image Section */}
            <div className="relative group perspective">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5271ff] to-[#ff914d] opacity-20 blur-2xl rounded-[3rem] transform scale-110 -rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white transform transition-transform duration-500 group-hover:-translate-y-2">
                    <img 
                        src="/contact.webp" 
                        alt="Contact our team" 
                        className="w-full h-[350px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001341]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">Ready to scale?</h3>
                        <p className="text-white/90">Our team of experts is just one click away.</p>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-5 relative z-20">
              
              {/* 1. Phone Card */}
              <a href="tel:+918449488090" className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-[#5271ff] group-hover:from-[#5271ff] group-hover:to-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#001341] text-lg group-hover:text-[#5271ff] transition-colors">Call Us Directly</h4>
                  <p className="text-gray-600 font-semibold text-sm">+91 8449488090</p>
                </div>
                <ArrowRight className="ml-auto text-gray-300 group-hover:text-[#5271ff] group-hover:translate-x-1 transition-all" size={20}/>
              </a>

              {/* 2. Email Card */}
              <a href="mailto:info@aiclex.in" className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-[#ff914d] group-hover:from-[#ff914d] group-hover:to-orange-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#001341] text-lg group-hover:text-[#ff914d] transition-colors">Send a Message</h4>
                  <p className="text-gray-600 font-semibold text-sm">info@aiclex.in</p>
                </div>
                <ArrowRight className="ml-auto text-gray-300 group-hover:text-[#ff914d] group-hover:translate-x-1 transition-all" size={20}/>
              </a>

              {/* 3. NEW: Visit Us Card */}
              <a href="https://maps.google.com/?q=Gaur+City+Mall+Greater+Noida+201318+Uttar+Pradesh" target="_blank" rel="noreferrer" className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#001341] text-lg group-hover:text-purple-600 transition-colors">Visit Our Office</h4>
                  <p className="text-gray-600 font-semibold text-sm">Gaur City Mall, Greater Noida</p>
                </div>
                <ArrowRight className="ml-auto text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" size={20}/>
              </a>

            </div>
          </div>

          {/* --- RIGHT: Enhanced Form --- */}
          <div className="relative lg:mt-12">
            <div className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white relative overflow-hidden">
              
              {/* Success Overlay */}
              {isSubmitted && (
                 <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-pulse">
                    <CheckCircle2 size={64} className="text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-[#001341] mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll be in touch shortly.</p>
                 </div>
              )}

              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5271ff] via-[#ff914d] to-[#5271ff]"></div>

              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#001341] mb-2">Send us a Message</h3>
                <p className="text-gray-600">Fill in the form below and we'll get back to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-[#001341] ml-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      placeholder="name"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#5271ff] focus:bg-white focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-300 placeholder:text-gray-400"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-[#001341] ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      placeholder="+91 00000 00000"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#5271ff] focus:bg-white focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-300 placeholder:text-gray-400"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-[#001341] ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    placeholder="you@company.com"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#5271ff] focus:bg-white focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-300 placeholder:text-gray-400"
                    onChange={handleChange}
                  />
                </div>

                {/* Subject Selection */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold text-[#001341] ml-1">What are you looking for?</label>
                  <div className="relative">
                    <select 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#5271ff] focus:bg-white focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-300 appearance-none cursor-pointer text-gray-700"
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a Service</option>
                      <option value="Digital Marketing">Digital Marketing & SEO</option>
                      <option value="Web/App Dev">Website or App Development</option>
                      <option value="Paid Ads">Google or Meta Ads</option>
                      <option value="Branding">Brand Development</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                    <div className="absolute top-1/2 right-5 transform -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-[#001341] ml-1">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    required
                    value={formData.message}
                    placeholder="Tell us a bit about your project, timeline, and goals..."
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#5271ff] focus:bg-white focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-300 resize-none placeholder:text-gray-400"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#001341] to-[#5271ff] text-white font-bold text-lg tracking-wide hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                   {/* Shimmer effect on hover */}
                   <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  
                  {isSubmitting ? (
                     <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-5 w-5 text-white" />
                        Sending...
                     </span>
                  ) : (
                    <>
                     <span>Send Message</span>
                     <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== MAP SECTION ==================== */}
      <section className="w-full h-[450px] relative mt-10 group overflow-hidden border-t border-white">
           <iframe 
             width="100%" 
             height="100%" 
             frameBorder="0" 
             title="map" marginHeight={0} marginWidth={0} scrolling="no" 
             src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Gaur%20City%20Mall,%20Greater%20Noida,%20Uttar%20Pradesh,%20India&ie=UTF8&t=&z=14&iwloc=B&output=embed"
             className="filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
      </section>

    </div>
  );
}