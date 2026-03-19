"use client";

import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-2 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-4">Terms & Conditions</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff914d] to-[#5271ff] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Last updated: March 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by <strong className="text-gray-900">AICLEX TECHNOLOGIES</strong>, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">2. Services Provided</h2>
            <p>
              AICLEX TECHNOLOGIES specializes in digital solutions including website design, digital marketing, SEO, social media management, and software development. The specific scope of work for any project will be outlined in a separate service agreement or proposal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">3. User Obligations</h2>
            <p>
              Users agree to provide accurate and complete information when engaging with our services. You are responsible for maintaining the confidentiality of any account information and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">4. Intellectual Property</h2>
            <p>
              All content, logos, designs, and materials created by AICLEX TECHNOLOGIES remain the intellectual property of AICLEX TECHNOLOGIES until full payment is received, at which point ownership of the final deliverables is transferred to the client, unless otherwise specified in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">5. Payment Terms</h2>
            <p>
              Payment schedules and terms will be defined in the project proposal. Failure to make payments according to the agreed schedule may result in the suspension of services or a delay in project delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">6. Limitation of Liability</h2>
            <p>
              AICLEX TECHNOLOGIES shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">7. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Greater Noida, Uttar Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">8. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms & Conditions, please contact us at:
              <br />
              <strong>Email:</strong> info@aiclex.in
              <br />
              <strong>Phone:</strong> +91 8449488090
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
