// src/pages/TermsConditions.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';


export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | User Agreement | E-Bookstore</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of E-Bookstore to understand the rules, user obligations, and policies for using our ebook services securely and transparently."
        />
        <meta
          name="keywords"
          content="terms and conditions, user agreement, ebookstore policies, legal terms, user obligations, online bookstore terms"
        />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 px-6 py-16 text-gray-800">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 lg:p-16 transition-all duration-300">
          <h1 className="text-4xl lg:text-5xl font-bold text-indigo-700 mb-10 text-center">Terms & Conditions</h1>

          <div className="space-y-12">
            {/* Section Template */}
            {[
              {
                title: "1. Introduction",
                text: "Welcome to our online bookstore. These Terms & Conditions govern your use of our website and services. By accessing or using the site, you agree to comply with these terms. Please read them carefully."
              },
              {
                title: "2. Account Registration",
                text: "To use certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and keep your login credentials secure. You are responsible for all activity under your account and must notify us immediately of any unauthorized use."
              },
              {
                title: "3. Orders and Payment",
                text: "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion. Prices are displayed in USD and are subject to change without notice. Payment must be made through our secure payment methods. By submitting your payment information, you authorize us to charge the applicable fees."
              },
              {
                title: "4. Shipping and Delivery",
                text: "We ship orders to selected countries. Shipping times and costs vary depending on destination and shipping method chosen. Delivery dates are estimates only and not guaranteed."
              },
              {
                title: "5. Returns and Refunds",
                text: "We accept returns within 10 days of delivery for eligible products in original condition. Refunds are processed within 5-7 business days after we receive the returned item. Some exclusions apply such as digital content and clearance items."
              },
              {
                title: "6. Intellectual Property",
                text: "All content on this website including text, images, logos, and graphics are our property or used with permission. Unauthorized use is prohibited."
              },
              {
                title: "7. Limitation of Liability",
                text: "We are not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our website or services."
              },
              {
                title: "8. Governing Law",
                text: "These Terms & Conditions are governed by the laws of the jurisdiction where our company is registered."
              },
              {
                title: "9. Changes to Terms",
                text: "We reserve the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with an updated effective date."
              }
            ].map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-semibold text-indigo-600 mb-3">{section.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{section.text}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 text-center text-indigo-700 font-medium text-lg">
            <p>Thank you for choosing our bookstore. <span className="italic">Happy reading!</span></p>
          </div>
        </div>
      </div>
    </>
  );
}
