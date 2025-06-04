import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!ACCESS_KEY) {
        alert('Access key not found! Please set VITE_WEB3FORMS_ACCESS_KEY in your environment variables.');
        setLoading(false);
        return;
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const data = await res.json();
      console.log('Web3Forms response:', data);


      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        const errorData = await res.json();
        console.error('Submission error:', errorData);
        alert('Error submitting form: ' + (errorData.message || 'Please try again.'));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error, please try again later.');
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Customer Support | Help & Assistance | E-Bookstore</title>
        <meta
          name="description"
          content="Get fast and reliable customer support at E-Bookstore. We're here to help you with your ebook purchases, downloads, and account issues."
        />
        <meta
          name="keywords"
          content="customer support, help, assistance, ebookstore support, order help, download issues, account support"
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-50 p-8 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
            Need Help? Contact Support
          </h1>

          <p className="mb-8 text-gray-700 text-center max-w-xl mx-auto">
            Have questions, issues, or feedback about our bookstore? Our support team is here to assist you. Please fill out the form below and we'll get back to you promptly.
          </p>

          {submitted ? (
            <div className="text-center py-12 px-6 bg-green-100 rounded-lg text-green-800 font-semibold">
              Thank you for reaching out! We will respond as soon as possible.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-lg font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief summary"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Describe your issue or question in detail"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                  }`}
              >
                {loading ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
