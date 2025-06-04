import { useParams, useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUserCircle,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';


function Stars({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-lg md:text-xl">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
}

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const token = localStorage.getItem('token');

  const handleAddToCart = async () => {
    try {
      if (!token) {
        alert('Please log in to add items to your cart.');
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          quantity: qty,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add to cart');
      }

      alert(`Added ${qty} of "${book.title}" to your cart.`);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchBook = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`);
      if (!res.ok) throw new Error('Book not found');
      const data = await res.json();
      setBook(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Please log in to submit a review.');
      return;
    }

    if (rating === 0 || comment.trim() === '') {
      alert('Please provide both rating and comment.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      setComment('');
      setRating(0);
      await fetchBook(); // Refresh reviews after submission
      alert('Review submitted successfully.');
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600 px-4 text-center">
        {error || 'Book not found.'}
      </div>
    );
  }

  const averageRating =
    book.reviews.length > 0
      ? book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length
      : 0;

  const buttonVariants = {
    rest: { scale: 1, boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)' },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 25px rgba(79, 70, 229, 0.7)',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <>
      <Helmet>
        <title>{book.title} | E-Bookstore</title>
        <meta
          name="description"
          content={`Buy "${book.title}" by ${book.author} online. Easy and secure purchase. Add to cart and enjoy reading your favorite ebook.`}
        />
        <meta
          name="keywords"
          content={`${book.title}, buy ${book.title}, ${book.author}, ebook, add to cart, online bookstore`}
        />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
      <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 sm:p-6 md:p-12 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-14">
          {/* Left: Book Image */}
          <div className="md:w-1/2 flex justify-center items-center overflow-hidden rounded-xl border border-gray-200">
            <img
              src={book.image}
              alt={book.title}
              className="max-w-full max-h-[400px] sm:max-h-[500px] md:max-h-[600px] object-contain transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Right: Book Details & Actions */}
          <div className="md:w-1/2 flex flex-col justify-between bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight">
                {book.title}
              </h1>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 min-h-[110px]">
                {book.description}
              </p>

              <div className="flex items-center gap-3 mb-5">
                <Stars rating={averageRating} />
                <span className="text-gray-500 text-sm font-medium">
                  ({book.reviews.length} review{book.reviews.length !== 1 ? 's' : ''})
                </span>
              </div>

              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-700 mb-8">
                ₹{(book.price * qty).toFixed(2)}
              </p>

              <div className="flex items-center gap-4 mb-10 flex-wrap">
                <label htmlFor="quantity" className="font-semibold text-lg min-w-[80px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-20 sm:w-24 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition shadow-sm"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <motion.button
                  onClick={() => navigate(`/buy/${book._id}`, { state: { quantity: qty } })}
                  className="flex items-center gap-3 rounded-[10px] font-semibold py-3 px-8 sm:py-4 sm:px-10 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white shadow-lg shadow-indigo-300 hover:from-indigo-700 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <FaMoneyBillWave className="text-xl sm:text-2xl" /> Buy Now
                </motion.button>

                <motion.button
                  onClick={handleAddToCart}
                  className="flex items-center gap-3 rounded-[10px] font-semibold py-3 px-8 sm:py-4 sm:px-10 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 shadow-lg shadow-yellow-300 hover:from-yellow-500 hover:to-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <FaShoppingCart className="text-xl sm:text-2xl" /> Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 w-full bg-white rounded-3xl p-6 sm:p-12 shadow-lg max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 tracking-wide border-b pb-4 border-gray-300">
            Customer Reviews
          </h2>

          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="border-t pt-6 sm:pt-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <label htmlFor="rating" className="font-semibold text-lg min-w-[80px]">
                Your Rating:
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl sm:text-4xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="comment" className="font-semibold text-lg mb-2">
                Your Review:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Write your thoughts here..."
                className="resize-none rounded-xl border border-gray-300 p-4 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="self-start rounded-xl bg-indigo-600 text-white px-8 py-3 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            >
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          <div className="mt-14 space-y-10">
            {book.reviews.length === 0 && (
              <p className="text-gray-500 text-center italic">No reviews yet. Be the first!</p>
            )}

            {book.reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-8"
              >
                <div className="flex items-center gap-3 min-w-[80px]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
                    {review.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span className="text-lg font-semibold text-indigo-700">
                    {review.user?.name || 'Anonymous'}
                  </span>
                </div>

                <div>
                  <Stars rating={review.rating} />
                  <p className="mt-3 text-gray-800 whitespace-pre-wrap">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
