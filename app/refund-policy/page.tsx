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
          <p className="mt-4 text-gray-500">Last updated: March 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <p className="text-lg">
            At <strong className="text-gray-900">AICLEX TECHNOLOGIES</strong>, we strive to ensure our clients are completely satisfied with our digital services. This Refund Policy outlines our practices regarding refunds for the services we provide.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">1. Digital Services</h2>
            <p>
              Due to the nature of digital services (such as SEO, Digital Marketing, and Website Design), costs are often incurred by AICLEX TECHNOLOGIES well in advance of the final delivery. Therefore, refunds are handled on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">2. Project Cancellation</h2>
            <p>
              If a project is cancelled by the client before work has commenced, a full refund of the deposit will be issued, minus any administrative fees. Once work has begun, the deposit is non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">3. Partial Refunds</h2>
            <p>
              In certain circumstances, at our sole discretion, we may offer a partial refund for services that have not been fully completed. This will be calculated based on the progress of the project and the resources already allocated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">4. No Refunds for Completed Work</h2>
            <p>
              Once a project or milestone has been completed and approved by the client, no refunds will be issued for that portion of the work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">5. Dispute Resolution</h2>
            <p>
              We encourage clients to contact us directly if they are dissatisfied with any aspect of our service. We are committed to working with you to resolve any issues and ensure project success.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about our Refund Policy, please reach out to us:
              <br />
              <strong>Email:</strong> billing@aiclex.in
              <br />
              <strong>Phone:</strong> +91 8449488090
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
