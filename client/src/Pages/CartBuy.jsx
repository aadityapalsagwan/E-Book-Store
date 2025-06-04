import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiShoppingCart, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';


export default function CartBuy() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const userId = localStorage.getItem('userId');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!cartItems.length || !userId) {
      navigate('/cart');
    }
  }, [cartItems, navigate, userId]);

  const onSubmit = (data) => {
    const books = cartItems.map(({ book, quantity }) => ({
      book: book._id,
      quantity,
      bookTitle: book.title,
    }));

    const total = cartItems.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    );

    navigate('/payment', {
      state: {
        userId,
        ...data,
        books,
        total,
        fromCart: true,
      },
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  // Motion variants for staggered animation
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Helmet>
        <title>Buy Online – Cart Item | E-Bookstore</title>
        <meta
          name="description"
          content={`Purchase " securely online. Add to cart now and get instant access to your favorite ebook.`}
        />
        <meta
          name="keywords"
          content={` ebook, online book purchase, digital ebook store`}
        />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-8 sm:p-12">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-extrabold text-gray-900 text-center mb-12 select-none flex items-center justify-center gap-3"
        >
          <HiShoppingCart className="text-green-600" /> Review & Checkout
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-xl mt-28 select-none"
          >
            Your cart is empty.
          </motion.div>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cart Summary */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {cartItems.map(({ book, quantity }) => (
                <motion.div
                  key={book._id}
                  variants={itemVariants}
                  className="flex items-center justify-between bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow cursor-default select-none"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-xl shadow-md"
                      loading="lazy"
                      draggable={false}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">Qty: {quantity}</p>
                      <p className="text-sm text-green-700 font-semibold">
                        ₹{book.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xl font-extrabold text-green-700">
                    ₹{(book.price * quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl shadow-lg space-y-6"
              >
                <div className="flex justify-between text-gray-700 text-lg">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-lg">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-extrabold border-t border-gray-200 pt-5">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Delivery Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-lg space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 select-none flex items-center gap-2">
                🚚 Delivery Details
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 transition
                  ${errors.name
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300'
                      }`}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="absolute text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    {...register('mobile', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter valid 10-digit mobile number',
                      },
                    })}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 transition
                  ${errors.mobile
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300'
                      }`}
                    autoComplete="tel"
                  />
                  {errors.mobile && (
                    <p className="absolute text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                {/* Pincode */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pincode"
                    {...register('pincode', {
                      required: 'Pincode is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Enter valid 6-digit pincode',
                      },
                    })}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 transition
                  ${errors.pincode
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300'
                      }`}
                    autoComplete="postal-code"
                  />
                  {errors.pincode && (
                    <p className="absolute text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="relative">
                  <textarea
                    placeholder="Delivery Address"
                    rows={4}
                    {...register('address', { required: 'Address is required' })}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 transition resize-none
                  ${errors.address
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300'
                      }`}
                  />
                  {errors.address && (
                    <p className="absolute text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 select-none"
              >
                {isSubmitting ? (
                  <>
                    <HiCheckCircle className="animate-spin" size={24} />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment →
                  </>
                )}
              </button>
            </motion.form>
          </div>
        )}
      </div>
    </>
  );
}
