import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';


export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || {};

  const userId = orderData.userId;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!userId) return setError('User is not logged in.');
    if (!paymentMethod) return setError('Please select a payment method.');

    setLoading(true);
    setError('');

    let books = [];
    if (orderData.bookId && orderData.quantity) {
      books = [{
        book: orderData.bookId,
        quantity: orderData.quantity,
        bookTitle: orderData.bookTitle
      }];
    } else if (orderData.books) {
      books = orderData.books;
    }

    const payload = {
      userId,
      name: orderData.name,
      mobile: orderData.mobile,
      pincode: orderData.pincode,
      address: orderData.address,
      total: orderData.total,
      books,
      paymentMethod,
      fromCart: orderData.fromCart || false
    };

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Payment failed');
      }

      navigate('/order-success');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { id: 'cod', label: 'Cash on Delivery', value: 'Cash on Delivery' },
    // Add more here if needed, e.g. UPI
  ];

  return (
    <>
      <Helmet>
        <title>Secure Payment | Fast & Trusted Checkout | E-Bookstore</title>
        <meta
          name="description"
          content="Complete your purchase securely at E-Bookstore. Enjoy fast and trusted payment options with multiple gateways to buy your favorite ebooks hassle-free."
        />
        <meta
          name="keywords"
          content="secure payment, online checkout, fast payment, trusted payment gateway, ebook purchase, buy ebooks online, safe transactions"
        />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
      <section className="max-w-md mx-auto p-10 mt-12 bg-gradient-to-tr from-indigo-100 via-white to-indigo-100 rounded-2xl shadow-2xl font-sans">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-10 text-center relative inline-block">
          Choose Payment Method
          <span className="block h-1 w-24 bg-indigo-500 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2
                         animate-underline" />
        </h1>

        <div className="flex flex-col gap-6">
          {paymentOptions.map(({ id, label, value }) => (
            <label
              key={id}
              className={`cursor-pointer flex items-center p-5 rounded-xl border-2
                        transition-shadow duration-300 ease-in-out
                        hover:shadow-xl hover:scale-[1.02]
                        ${paymentMethod === value
                  ? 'border-indigo-600 shadow-indigo-400 shadow-md bg-indigo-50'
                  : 'border-gray-300 bg-white'
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={value}
                checked={paymentMethod === value}
                onChange={() => setPaymentMethod(value)}
                className="hidden"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0
                          mr-5 flex items-center justify-center
                          ${paymentMethod === value
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300 bg-white'
                  }`}
              >
                {paymentMethod === value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`font-semibold text-lg ${paymentMethod === value ? 'text-indigo-800' : 'text-gray-700'
                  }`}
              >
                {label}
              </span>
            </label>
          ))}
        </div>

        {error && (
          <p className="text-center text-red-600 font-medium mt-6 animate-pulse">{error}</p>
        )}

        <button
          disabled={loading}
          onClick={handlePayment}
          className="mt-12 w-full py-4 bg-indigo-600 rounded-xl text-white font-semibold
                   hover:bg-indigo-700 transition-colors duration-300 ease-in-out
                   shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                   transform hover:-translate-y-1 hover:shadow-xl"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-3">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Confirm Payment'
          )}
        </button>

        <style>{`
        @keyframes underline {
          0%, 100% { width: 0; }
          50% { width: 96px; }
        }
        .animate-underline {
          animation: underline 2s ease-in-out infinite;
        }
      `}</style>
      </section>
    </>
  );
}
