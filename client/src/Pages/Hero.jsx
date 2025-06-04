import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
        alt="Books"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.5]"
      />

      {/* Glassmorphic Content Box */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-2xl px-6 py-10 text-center max-w-3xl mx-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          Discover Your Next Favorite Book
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-white/90 drop-shadow-md"
        >
          Browse thousands of books across every genre and ignite your imagination.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8"
        >
          <button
            onClick={() => {
              window.scrollBy({ top: 600, behavior: 'smooth' });
              // 600px niche scroll karega, aap apne hisaab se adjust kar sakte hain
            }}
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105"
          >
            Shop Now
          </button>
        </motion.div>


      </div>
    </div>
  );
}
