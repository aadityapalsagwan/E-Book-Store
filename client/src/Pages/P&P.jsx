// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';


export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Your Data Protection & Security | E-Bookstore</title>
        <meta
          name="description"
          content="Read E-Bookstore's Privacy Policy to understand how we protect your personal information, ensure data security, and respect your privacy while you enjoy our ebooks."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, user privacy, ebookstore privacy, personal information security, online bookstore privacy"
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-6 lg:px-24 text-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Effective as of June 1, 2025</p>
          </div>

          {/* Section Block Component */}
          {[
            {
              title: "1. Introduction",
              content: "Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our bookstore website.",
            },
            {
              title: "2. Information We Collect",
              content: [
                "We collect personal information that you voluntarily provide when registering, placing orders, or contacting us, including your name, email address, billing and shipping details.",
                "We also automatically collect certain information about your device and browsing activity through cookies and similar technologies.",
              ],
            },
            {
              title: "3. How We Use Your Information",
              list: [
                "To process and fulfill your orders.",
                "To communicate order updates and customer support.",
                "To improve and personalize your shopping experience.",
                "To send promotional emails if you have opted-in.",
                "To comply with legal obligations.",
              ],
            },
            {
              title: "4. Cookies and Tracking Technologies",
              content: "We use cookies and similar tracking technologies to enhance site functionality and analyze usage. You can control cookie preferences through your browser settings.",
            },
            {
              title: "5. Data Security",
              content: "We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, or destruction.",
            },
            {
              title: "6. Sharing Your Information",
              content: [
                "We do not sell or rent your personal data. We may share information with trusted third-party service providers to operate our business, such as payment processors and shipping companies.",
                "We may also disclose information if required by law or to protect our rights.",
              ],
            },
            {
              title: "7. Your Rights",
              content: "Depending on your jurisdiction, you may have rights to access, update, or delete your personal information. You can contact us to exercise these rights.",
            },
            {
              title: "8. Changes to This Policy",
              content: "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.",
            },
          ].map((section, index) => (
            <section
              key={index}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-8 transition-transform hover:scale-[1.01]"
            >
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">{section.title}</h2>
              {section.content && Array.isArray(section.content) ? (
                section.content.map((para, i) => (
                  <p key={i} className="text-lg leading-relaxed text-gray-700 mb-2">
                    {para}
                  </p>
                ))
              ) : section.content ? (
                <p className="text-lg leading-relaxed text-gray-700">{section.content}</p>
              ) : null}
              {section.list && (
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <footer className="text-center text-indigo-700 font-medium mt-10">
            <p>Thank you for trusting our bookstore with your information.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
