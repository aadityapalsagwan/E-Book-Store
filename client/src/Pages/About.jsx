import React from 'react';
import { FaBook, FaGlobe, FaUsers, FaLeaf, FaRocket } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | E-Bookstore | By Aaditya Pal, Rohit KUmar</title>
        <meta name="description" content="Learn more about E-Bookstore and our mission to deliver quality digital books." />
        <meta name="keywords" content="about ebookstore, digital books, our mission, ebooks india" />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-6 lg:px-24 text-gray-800">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">About E-Books Store</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the story behind your favorite book destination.
            </p>
          </div>

          {/* Introduction Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-lg leading-relaxed">
              Welcome to <strong>E-Books Store</strong> — your ultimate online destination for literary treasures.
              Founded by book lovers, for book lovers, Infinity Books brings together a rich collection of titles from
              diverse genres and authors. Our platform isn't just about buying books — it's about experiencing them.
            </p>
          </section>

          {/* Mission, What We Offer, Why Us */}
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard icon={<FaBook />} title="Our Mission">
              To ignite a lifelong love of reading by making books accessible, affordable, and enjoyable for everyone.
            </FeatureCard>

            <FeatureCard icon={<FaRocket />} title="What We Offer">
              From rare classics to digital downloads, our intuitive platform makes discovering books easy and fun.
            </FeatureCard>

            <FeatureCard icon={<FaUsers />} title="Why Infinity Books?">
              A community-driven bookstore curated by real readers, editors, and literary lovers — not just algorithms.
            </FeatureCard>
          </div>

          {/* Highlights List */}
          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Platform Highlights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Thousands of curated titles across every genre</li>
              <li>Personalized dashboards and wishlists</li>
              <li>Secure checkout & fast delivery</li>
              <li>Monthly reading challenges, giveaways, and events</li>
              <li>Global shipping and multilingual support</li>
            </ul>
          </section>

          {/* Values + Sustainability */}
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard icon={<FaGlobe />} title="Our Values">
              <p><strong>Inclusivity:</strong> Diverse voices & stories<br />
                <strong>Integrity:</strong> Honest reviews, secure service<br />
                <strong>Innovation:</strong> Personalized recommendations & community features</p>
            </FeatureCard>

            <FeatureCard icon={<FaLeaf />} title="Sustainability">
              We plant one tree for every 10 books sold and partner with eco-conscious publishers.
            </FeatureCard>
          </div>

          {/* What's Next */}
          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">What’s Coming Next?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Mobile app on iOS and Android</li>
              <li>Subscription boxes & book clubs</li>
              <li>AI-based smart reading suggestions</li>
              <li>Live storytelling and virtual book rooms</li>
            </ul>
          </section>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">Join Our Book Community</h2>
            <p className="text-gray-600 mb-6">Follow us on socials, join the club, and be a part of our growing story.</p>
            <p className="text-xl font-semibold text-indigo-600">Thank you for making Infinity Books a part of your story.</p>
          </div>
        </div>
      </div></>
  );
}

// Reusable Card Component
function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-indigo-600 text-3xl">{icon}</div>
        <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
}
