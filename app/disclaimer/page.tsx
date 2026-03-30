"use client";

import React from 'react';

export default function Disclaimer() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-2 block">Disclaimer</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-4">Disclaimer</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff914d] to-[#5271ff] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Last updated: March 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <p className="text-lg">
            The information provided by <strong className="text-gray-900">AICLEX TECHNOLOGIES</strong> on www.aiclex.in is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">1. Professional Disclaimer</h2>
            <p>
              The site cannot and does not contain professional advice. The digital marketing, design, and technical information is provided for general informational and educational purposes only and is not a substitute for professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">2. External Links Disclaimer</h2>
            <p>
              The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">3. Results Disclaimer</h2>
            <p>
              While we strive to provide the best digital marketing and SEO results for our clients, we cannot guarantee specific rankings, traffic, or revenue outcomes, as these are subject to third-party algorithms and market conditions beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">4. "Use at Your Own Risk"</h2>
            <p>
              Your use of the site and your reliance on any information on the site is solely at your own risk. AICLEX TECHNOLOGIES will not be liable for any losses or damages in connection with the use of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">5. Contact Us</h2>
            <p>
              Should you have any feedback, comments, requests for technical support or other inquiries, please contact us by email: <strong>info@aiclex.in</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
