import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaCalendarAlt, FaMoneyBill, FaTruck, FaSearch, FaTimes } from 'react-icons/fa';
import { format } from 'timeago.js';
import { Helmet } from 'react-helmet-async';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sorted);
          setFilteredOrders(sorted);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredOrders(
      orders.filter(order =>
        order.books.some(item =>
          item.book?.title?.toLowerCase().includes(term) ||
          item.book?.author?.toLowerCase().includes(term)
        )
      )
    );
  }, [searchTerm, orders]);

  const clearSearch = () => setSearchTerm('');

  const statusColors = {
    Delivered: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <Helmet>
        <title>My Orders | Track & Manage Your Purchases | E-Bookstore</title>
        <meta
          name="description"
          content="View and manage your past orders at E-Bookstore. Track your ebook purchases, download receipts, and enjoy a seamless shopping experience."
        />
        <meta
          name="keywords"
          content="my orders, order history, ebook purchases, track orders, download receipts, digital book orders, online bookstore orders"
        />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 p-6 font-sans">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <h1 className="text-4xl font-extrabold flex items-center gap-3 text-gradient  to-pink-500 drop-shadow-lg">
            <FaBoxOpen className="text-5xl" /> My Orders
          </h1>
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-orange-400 text-lg pointer-events-none" />
            <input
              type="text"
              placeholder="Search by book title or author..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search orders by book title or author"
              className="w-full pl-12 pr-10 py-3 rounded-[10px] border border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300 transition shadow-sm text-gray-700 placeholder:text-orange-300"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-orange-400 hover:text-orange-600 transition"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <svg
              className="animate-spin h-14 w-14 text-orange-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading"
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
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-xl text-gray-500 italic">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrders.map(order => (
              <div
                key={order._id}
                className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-4">
                  <p className="text-md font-semibold text-orange-700 select-text">
                    Order ID: <span className="font-normal text-gray-600">{order.orderId}</span>
                  </p>
                  <p className="flex items-center text-sm text-gray-400 mt-1 gap-2 select-text">
                    <FaCalendarAlt />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>                </p>
                </div>

                <div className="divide-y divide-orange-100 mb-5 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50">
                  {order.books.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 py-3 items-center hover:bg-orange-50 rounded-lg transition"
                    >
                      <img
                        src={item.book?.image}
                        alt={item.book?.title}
                        className="w-20 h-24 object-cover rounded-lg border border-orange-200 shadow-sm"
                        loading="lazy"
                      />
                      <div className="flex-1 text-gray-700">
                        <p className="font-semibold text-lg">{item.book?.title}</p>
                        <p className="text-sm text-orange-500">{item.book?.author}</p>
                        <p className="mt-1 text-md">
                          Qty: <strong>{item.quantity}</strong> × ₹{item.book?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-gray-700 space-y-2 text-sm font-medium">
                  <p
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${statusColors[order.deliveryStatus] || 'bg-gray-100 text-gray-800'}`}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <FaTruck className="text-xl" />
                    Status: {order.deliveryStatus}
                  </p>
                  <p>
                    Payment Method: <span className="font-semibold">{order.paymentMethod}</span>
                  </p>
                  <p className="flex items-center gap-2 text-green-600">
                    <FaMoneyBill className="text-xl" />
                    <span>
                      Total: ₹
                      {order.books.reduce((sum, item) => sum + item.book.price * item.quantity, 0)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    <p className="text-xs text-gray-400 italic">
                      Expected Delivery: {new Date(order.deliveryDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>                </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
