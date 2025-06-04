import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import truck from '../assets/trucks.png'; // Adjust the path as necessary
import { Helmet } from 'react-helmet-async';


export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
   <>
    <Helmet>
        <title>Order Successful | Thank You for Your Purchase | E-Bookstore</title>
        <meta
          name="description"
          content={`Thank you for your order! Your order ID is  You can now download your ebooks or continue shopping at E-Bookstore.`}
        />
        <meta
          name="keywords"
          content="order success, order confirmation, thank you for purchase, ebook download, digital book order, secure online bookstore"
        />
      </Helmet>
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-100 relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50" />

      {/* Success Card */}
      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">Order Placed Successfully!!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order is being processed and you will receive updates soon.
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition"
        >
          Go Back to Home
        </button>
      </div>

      {/* Animated Truck */}
      <motion.img
        src={truck}
        alt="Delivery Truck"
        className="w-28 mt-8 relative z-10"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />
    </section>
   </>
  );
}
