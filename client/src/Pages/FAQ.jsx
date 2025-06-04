// src/pages/FAQ.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


const faqs = [
  {
    question: "1. How do I create an account?",
    answer:
      "Simply click on the \"Sign Up\" button on the top right of the homepage. Fill in your details, set a password, and you're ready to explore our bookstore. Once registered, you can access your profile, manage your orders, and create wishlists.",
  },
  {
    question: "2. What payment methods are accepted?",
    answer:
      "We accept major credit and debit cards, UPI, net banking, and wallets such as Paytm and Google Pay. All transactions are securely processed via our encrypted payment gateway.",
  },
  {
    question: "3. Can I cancel or change my order?",
    answer:
      "Yes, you can cancel or change your order within 1 hour of placing it by visiting your Orders section. After this time, the order may already be processed for shipping and changes may not be possible.",
  },
  {
    question: "4. Do you ship internationally?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping charges and delivery times vary depending on the destination. You can check estimated delivery during checkout.",
  },
  {
    question: "5. How do I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email and SMS. You can also view the order status in your profile under the \"Orders\" section.",
  },
  {
    question: "6. What if I receive a damaged or wrong book?",
    answer:
      "We're truly sorry! If you receive a damaged or incorrect book, please contact our support team within 7 days of delivery with photos. We'll process a replacement or refund immediately.",
  },
  {
    question: "7. Is there a return policy?",
    answer:
      "Yes. If you're not satisfied with your purchase, you may return it within 10 days, provided the book is unused and in original condition. Some exclusions may apply to digital content or special editions.",
  },
  {
    question: "8. How do I leave a review?",
    answer:
      "Once you've purchased and received a book, go to the book’s detail page and scroll down to the reviews section. Click \"Leave a Review\", add your rating and comment, and submit.",
  },
  {
    question: "9. Do you offer gift cards or coupons?",
    answer:
      "Yes! We offer digital gift cards as well as seasonal promo codes. Keep an eye on our homepage and newsletter for exclusive deals and discounts.",
  },
  {
    question: "10. How can I contact customer support?",
    answer:
      "You can contact us via the Support page, where you'll find a contact form, email address, and our support hotline. We respond to most queries within 24 hours.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

      <Helmet>
        <title>Frequently Asked Question | E-Bookstore</title>
        <meta
          name="description"
          content={`Purchase " securely online. Add to cart now and get instant access to your favorite ebook.`}
        />
        <meta
          name="keywords"
          content={` ebook, online book purchase, digital ebook store`}
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-24 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
            Frequently Asked Questions
          </h1>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-indigo-200 rounded-xl bg-white shadow-md transition-all duration-300">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-indigo-700 font-semibold focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-indigo-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-indigo-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-700 text-[16px]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-indigo-700 font-medium">
              Still have questions? Visit our{" "}
              <a href="/support" className="underline font-semibold">
                Support Page
              </a>{" "}
              for more help.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
