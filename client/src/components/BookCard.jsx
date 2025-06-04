import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const avgRating = parseFloat(book.avgRating || 0);
  const fullStars = Math.floor(avgRating);
  const halfStar = avgRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/books/${book._id}`)}
      role="button"
      tabIndex={0}
      className="group cursor-pointer max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 gap-4"
    >
      {/* Image Section */}
      <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden pt-2 pb-2">
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-white/80 text-xs px-2 py-0.5 rounded shadow-sm font-semibold text-gray-800 backdrop-blur">
          Bestseller
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>

        {/* Ratings */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
          {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
          {halfStar && <FaStarHalfAlt />}
          {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
          <span className="text-gray-500 text-xs ml-2">({book.totalRatings || 0})</span>
        </div>

        {/* Category & CTA */}
        <div className="flex justify-between items-center mt-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
            {book.category}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/books/${book._id}`);
            }}
            className="text-indigo-600 font-medium text-sm "
          >
            View →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
