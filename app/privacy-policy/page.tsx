"use client";

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#5271ff] font-bold tracking-wider uppercase text-sm mb-2 block">Privacy</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-4">Privacy Policy</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#5271ff] to-[#ff914d] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Last updated: March 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <p className="text-lg">
            At <strong className="text-gray-900">AICLEX TECHNOLOGIES</strong>, accessible from www.aiclex.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AICLEX TECHNOLOGIES and how we use it.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or engage our services. This may include your name, email address, phone number, and business details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our website and services.</li>
              <li>To improve, personalize, and expand our website.</li>
              <li>To understand and analyze how you use our website.</li>
              <li>To develop new products, services, features, and functionality.</li>
              <li>To communicate with you, either directly or through one of our partners.</li>
              <li>To send you emails regarding updates and marketing information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">3. Log Files</h2>
            <p>
              AICLEX TECHNOLOGIES follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, AICLEX TECHNOLOGIES uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">5. Third Party Privacy Policies</h2>
            <p>
              AICLEX TECHNOLOGIES's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#001341] mb-4">6. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
