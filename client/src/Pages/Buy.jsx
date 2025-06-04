import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';


export default function Buy() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const quantity = location.state?.quantity || 1;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { name: '', mobile: '', pincode: '', address: '' },
  });

  useEffect(() => {
    async function fetchBook() {
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
    }
    fetchBook();
  }, [id]);

  const onSubmit = async (data) => {
    const userId = localStorage.getItem('userId');
    navigate('/payment', {
      state: {
        ...data,
        quantity,
        bookId: id,
        bookTitle: book.title,
        total: (book.price * quantity).toFixed(2),
        userId,
      },
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-50">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-xl font-semibold select-none"
        >
          {error}
        </motion.p>
      </div>
    );

  if (!book) return null;

  return (
   <>
       <Helmet>
        <title>{book.title} - Buy Now | E-Bookstore</title>
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
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6 md:p-12 flex justify-center items-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full flex flex-col md:flex-row overflow-hidden border border-indigo-200"
      >
        {/* Left Panel - Book Info */}
        <div className="md:w-1/3 bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 p-10 flex flex-col items-center text-center text-white relative overflow-hidden">
          <motion.div
            className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.img
            src={book.image}
            alt={book.title}
            className="w-64 h-96 object-cover rounded-3xl mb-8 shadow-2xl border-4 border-indigo-400 hover:shadow-indigo-600 transition-shadow duration-500 z-10"
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight drop-shadow-lg z-10">
            {book.title}
          </h1>
          <p className="text-indigo-300 text-base md:text-lg mb-12 px-4 leading-relaxed line-clamp-6 z-10">
            {book.description}
          </p>
          <div className="space-y-3 font-semibold text-lg z-10 select-none">
            <p>
              Price each:{' '}
              <span className="text-indigo-100 text-2xl font-bold">₹{book.price.toFixed(2)}</span>
            </p>
            <p>
              Quantity: <span className="text-indigo-100 text-2xl font-bold">{quantity}</span>
            </p>
            <p className="text-3xl font-extrabold mt-6 tracking-wide">
              Total: ₹{(book.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Right Panel - Shipping Form */}
        <div className="md:w-2/3 p-14 bg-white rounded-tr-3xl rounded-br-3xl shadow-inner relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            className="text-5xl font-extrabold mb-14 border-b-4 border-indigo-300 pb-5 tracking-wide select-none text-indigo-900"
          >
            Shipping Address
          </motion.h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10 max-w-xl mx-auto"
            noValidate
          >
            {[  
              {
                id: 'name',
                label: 'Full Name',
                type: 'text',
                placeholder: 'John Doe',
                validation: { required: 'Name is required' },
              },
              {
                id: 'mobile',
                label: 'Mobile Number',
                type: 'tel',
                placeholder: '9876543210',
                validation: {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Enter a valid 10-digit mobile number starting with 6-9',
                  },
                },
              },
              {
                id: 'pincode',
                label: 'Pincode',
                type: 'text',
                placeholder: '123456',
                maxLength: 6,
                validation: {
                  required: 'Pincode is required',
                  minLength: { value: 6, message: 'Pincode must be 6 digits' },
                  maxLength: { value: 6, message: 'Pincode must be 6 digits' },
                  pattern: { value: /^\d{6}$/, message: 'Pincode must contain only digits' },
                },
              },
            ].map(({ id, label, type, placeholder, maxLength, validation }) => (
              <div key={id} className="relative group">
                <input
                  id={id}
                  type={type}
                  maxLength={maxLength}
                  placeholder=" "
                  {...register(id, validation)}
                  disabled={isSubmitting}
                  className={`peer w-full px-5 pt-6 pb-3 border rounded-2xl shadow-md
                    placeholder-transparent
                    focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600
                    transition duration-300
                    ${
                      errors[id]
                        ? 'border-red-500 ring-red-300'
                        : 'border-gray-300 focus:border-indigo-600'
                    }`}
                  aria-invalid={errors[id] ? 'true' : 'false'}
                />
                <label
                  htmlFor={id}
                  className={`absolute left-5 top-3 text-indigo-700 text-md font-semibold
                    transition-all duration-300
                    peer-placeholder-shown:top-6 peer-placeholder-shown:text-indigo-400
                    peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-indigo-700 peer-focus:text-md
                    select-none`}
                >
                  {label}
                </label>
                {errors[id] && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-600 mt-1 text-sm font-medium select-none"
                    role="alert"
                  >
                    {errors[id].message}
                  </motion.p>
                )}
              </div>
            ))}

            {/* Address textarea with floating label */}
            <div className="relative group">
           
              <textarea
                id="address"
                rows={4}
                placeholder="Type your address here..."
                {...register('address', { required: 'Address is required' })}
                disabled={isSubmitting}
                className={`peer w-full px-5 pt-6 pb-3 border rounded-2xl shadow-md resize-none
                  placeholder-transparent
                  focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600
                  transition duration-300
                  ${
                    errors.address ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:border-indigo-600'
                  }`}
                aria-invalid={errors.address ? 'true' : 'false'}
              />
              <label
                htmlFor="address"
                className={`absolute left-5 top-3 text-indigo-700 text-md font-semibold
                  transition-all duration-300
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-indigo-400
                  peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-indigo-700 peer-focus:text-md
                  select-none`}
              >
                Address
              </label>
              {errors.address && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-600 mt-1 text-sm font-medium select-none"
                  role="alert"
                >
                  {errors.address.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(79,70,229,0.8)',
                backgroundColor: '#4338ca',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl tracking-wider shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                select-none
                transition-colors duration-300"
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
   </>
  );
}
