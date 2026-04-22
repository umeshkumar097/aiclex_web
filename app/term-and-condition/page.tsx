"use client";

import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-2 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-4">Terms of Service</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff914d] to-[#5271ff] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Effective Date: April 23, 2026 | Last Updated: April 23, 2026</p>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing <a href="https://aiclex.in" className="text-blue-600 font-bold">aiclex.in</a> or engaging AICLEX™ Technologies for any service, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
            <p>
              These Terms apply to all visitors, clients, and anyone who submits a form, makes a payment, or enters into a service agreement with us.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-bold text-[#001341]">AICLEX™ Technologies</p>
                <p>Gaur City Mall, Greater Noida – 201318, India</p>
                <p>📧 info@aiclex.in | 📞 +91 84494 88090</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">2. Services Offered</h2>
            <p>AICLEX Technologies provides the following services:</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 p-3 text-left font-bold text-[#001341]">Service</th>
                    <th className="border border-gray-200 p-3 text-left font-bold text-[#001341]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-200 p-3 font-bold">AI Voice Agents</td><td className="border border-gray-200 p-3">Automated human-like calling agents for sales &amp; support</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Custom SaaS Development</td><td className="border border-gray-200 p-3">Web &amp; mobile product development</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Digital Marketing</td><td className="border border-gray-200 p-3">Google Ads, Meta Ads, performance campaigns</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">AI Workflows</td><td className="border border-gray-200 p-3">Custom LLM-based process automation</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Zoom Licenses (Reseller)</td><td className="border border-gray-200 p-3">Official Zoom licensing with India-based billing</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Branding &amp; UI/UX</td><td className="border border-gray-200 p-3">Brand identity and design services</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 italic">Specific deliverables, timelines, and pricing for each engagement are defined in a separate Project Agreement or Proposal sent to the client.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">3. Client Obligations</h2>
            <p>As a client or user of our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide accurate and complete information in all forms and communications</li>
              <li>Respond to our team in a timely manner to avoid project delays</li>
              <li>Not use our services for any unlawful, fraudulent, or harmful purpose</li>
              <li>Not reverse-engineer, copy, or resell any deliverable, tool, or AI system built by AICLEX without written permission</li>
              <li>Ensure that content, data, or materials you provide to us do not violate any third-party rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">4. Payments &amp; Billing</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>All prices are quoted in Indian Rupees (INR) unless otherwise agreed in writing</li>
              <li>Payment is due as per the schedule outlined in your project proposal</li>
              <li>We typically require advance payment before commencing work</li>
              <li>For Zoom Licenses, payment is due before license activation; renewal fees apply as per Zoom&apos;s pricing</li>
              <li>Late payments may result in a pause or termination of services</li>
              <li>All payments are processed through our secure payment page at <a href="https://aiclex.in/payment" className="text-blue-600">aiclex.in/payment</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">5. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>All work delivered by AICLEX (code, design, content, AI models) remains the property of AICLEX until full payment is received</li>
              <li>Upon full payment, intellectual property for custom deliverables transfers to the client, unless otherwise stated in the project agreement</li>
              <li>AICLEX retains the right to showcase completed work in our portfolio, case studies, and marketing materials unless the client requests confidentiality in writing</li>
              <li>Our brand assets, logo, name, &quot;AICLEX™&quot;, &quot;AI Tools Suite™&quot;, are proprietary and may not be used without written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">6. AI Services - Specific Terms</h2>
            <p>Given the nature of our AI Voice Agents and AI Workflow services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>AI outputs are not guaranteed to be error-free and should be reviewed by a human before critical business decisions</li>
              <li>AICLEX is not liable for any decisions made based on AI-generated outputs</li>
              <li>Performance metrics (e.g., call success rate, conversion rate) are estimates based on historical data and may vary</li>
              <li>Client is responsible for ensuring their use of AI calling agents complies with applicable TRAI regulations and telemarketing laws in their jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">7. Zoom Reseller Terms</h2>
            <p>As an official Zoom reseller in India:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Zoom licenses are provided subject to Zoom&apos;s End User License Agreement (EULA)</li>
              <li>AICLEX is the billing and support point of contact, not Zoom directly</li>
              <li>License cancellations and refunds are subject to our Refund Policy and Zoom&apos;s own policies</li>
              <li>AICLEX is not liable for any downtime, outage, or service disruption caused by Zoom&apos;s platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable Indian law:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>AICLEX&apos;s total liability to any client shall not exceed the amount paid by that client in the 3 months preceding the claim</li>
              <li>We are not liable for any indirect, incidental, or consequential damages, including loss of revenue, data, or business opportunities, arising from use of our services</li>
              <li>We do not guarantee specific outcomes such as lead volumes, ad ROI, or sales conversions. All performance claims on our website are based on past results and are not a promise of future performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">9. Confidentiality</h2>
            <p>Both parties agree to keep confidential any proprietary business information shared during the course of the engagement. This includes client data, project details, pricing, and internal processes. This obligation survives termination of the agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">10. Termination</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Either party may terminate a service engagement with 15 days written notice via email</li>
              <li>AICLEX reserves the right to immediately terminate services if the client breaches these Terms, engages in abusive behaviour, or fails to make payment</li>
              <li>Upon termination, any outstanding payments for work completed remain due</li>
              <li>Zoom license terminations are subject to separate notice periods per Zoom&apos;s policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">11. Dispute Resolution</h2>
            <p>We prefer to resolve disputes amicably. In case of a dispute:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Step 1: Direct Resolution:</strong> Contact us at info@aiclex.in within 30 days of the issue arising</li>
              <li><strong>Step 2: Mediation:</strong> If unresolved, both parties agree to attempt mediation before pursuing legal action</li>
              <li><strong>Step 3: Legal Action:</strong> Any legal proceedings shall be subject to the exclusive jurisdiction of courts in Gautam Buddha Nagar (Greater Noida), Uttar Pradesh, India</li>
            </ul>
            <p className="mt-4">These Terms are governed by the laws of the Republic of India.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">12. Disclaimer of Warranties</h2>
            <p>Our services are provided &quot;as is&quot; and &quot;as available&quot;. AICLEX makes no warranties, express or implied, regarding fitness for a particular purpose, uninterrupted service, or specific business outcomes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">13. Third-Party Links &amp; Tools</h2>
            <p>Our website and services may integrate with or link to third-party platforms (HubSpot, Zoom, Calendly, Google, Meta). We are not responsible for the content, privacy practices, or terms of these platforms.</p>
          </section>

          <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <h2 className="text-2xl font-bold text-[#001341] mb-4">14. Contact</h2>
            <p className="font-bold text-gray-900">AICLEX™ Technologies</p>
            <p>Gaur City Mall, Greater Noida – 201318, India</p>
            <div className="mt-4 space-y-2">
              <p>📧 <strong>Email:</strong> <a href="mailto:info@aiclex.in" className="text-blue-600">info@aiclex.in</a></p>
              <p>📞 <strong>Phone:</strong> <a href="tel:+918449488090" className="text-blue-600">+91 84494 88090</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
