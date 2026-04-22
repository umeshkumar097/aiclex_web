"use client";

import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-2 block">Refund</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-4">Refund Policy</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff914d] to-[#5271ff] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Effective Date: April 23, 2026 | Last Updated: April 23, 2026</p>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">1. Overview</h2>
            <p>
              AICLEX™ Technologies, Gaur City Mall, Greater Noida – 201318, India, offers professional technology and marketing services. Due to the custom and digital nature of our work, our refund policy differs by service type. Please read this carefully before making a payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">2. Refund Eligibility by Service</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 p-3 text-left font-bold text-[#001341]">Service</th>
                    <th className="border border-gray-200 p-3 text-left font-bold text-[#001341]">Refundable?</th>
                    <th className="border border-gray-200 p-3 text-left font-bold text-[#001341]">Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-200 p-3 font-bold">Custom SaaS / Web Dev</td><td className="border border-gray-200 p-3">Partial</td><td className="border border-gray-200 p-3">Only before development begins</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Digital Marketing (Ads)</td><td className="border border-gray-200 p-3">No</td><td className="border border-gray-200 p-3">Ad spend is non-recoverable once live</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">AI Voice Agents Setup</td><td className="border border-gray-200 p-3">Partial</td><td className="border border-gray-200 p-3">50% refund if cancelled before deployment</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">AI Workflows</td><td className="border border-gray-200 p-3">Partial</td><td className="border border-gray-200 p-3">Only before automation is built</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Zoom Licenses</td><td className="border border-gray-200 p-3">Limited</td><td className="border border-gray-200 p-3">As per Zoom&apos;s own refund policy</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Branding &amp; UI/UX</td><td className="border border-gray-200 p-3">Partial</td><td className="border border-gray-200 p-3">Only before design work begins</td></tr>
                  <tr><td className="border border-gray-200 p-3 font-bold">Strategy Calls</td><td className="border border-gray-200 p-3">No</td><td className="border border-gray-200 p-3">Non-refundable once completed</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">3. Advance Payments</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Most projects require an advance payment before work begins</li>
              <li>This advance is non-refundable once the project is formally initiated (kickoff call completed or work started)</li>
              <li>If AICLEX cancels the engagement before initiation, full advance is refunded</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">4. Digital Marketing &amp; Ad Spend</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Any amount spent on Google Ads, Meta Ads, or other ad platforms is non-refundable. These are third-party platforms and payments are made on your behalf</li>
              <li>AICLEX&apos;s management fee may be partially refunded on a pro-rata basis if the campaign is cancelled mid-month with valid reason</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">5. Zoom Licenses</h2>
            <p>As an official Zoom reseller:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Annual licenses:</strong> Refund requests within 7 days of purchase may be eligible for a refund, subject to Zoom&apos;s approval</li>
              <li><strong>Monthly licenses:</strong> Non-refundable once activated</li>
              <li>Partial refunds for unused months are not available unless Zoom&apos;s policy specifically permits it</li>
              <li>All Zoom refund requests are forwarded to Zoom Video Communications and subject to their decision</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">6. Refund Process</h2>
            <p>To request a refund:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Email <a href="mailto:info@aiclex.in" className="text-blue-600">info@aiclex.in</a> with subject line: &quot;Refund Request – [Your Name/Project]&quot;</li>
              <li>Include your payment receipt, project details, and reason for refund</li>
              <li>We will acknowledge within 2 business days</li>
              <li>Eligible refunds are processed within 7–10 business days to the original payment method</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">7. Non-Refundable Situations</h2>
            <p>Refunds will not be issued if:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Work has already been delivered or is substantially complete</li>
              <li>The project was delayed due to client&apos;s failure to provide content, feedback, or approvals</li>
              <li>The client changed their mind after work commenced</li>
              <li>Payment was made for a consultation or strategy session that was completed</li>
              <li>The refund request is made after 30 days from the payment date</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">8. Disputes</h2>
            <p>
              If you are unsatisfied with a refund decision, please escalate to <a href="mailto:info@aiclex.in" className="text-blue-600">info@aiclex.in</a> with full details. We will attempt to resolve all disputes within 15 business days. Unresolved disputes are subject to the jurisdiction of courts in Gautam Buddha Nagar, Uttar Pradesh, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">9. Changes to This Policy</h2>
            <p>
              AICLEX reserves the right to modify this policy at any time. Updated policy will be posted on this page with a revised date.
            </p>
          </section>

          <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
            <h2 className="text-2xl font-bold text-[#001341] mb-4">10. Contact</h2>
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
