import { useEffect, useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet-async';


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCartItems(res.data.cart))
      .catch((err) => console.error(err));
  }, []);

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/cart/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems((prev) => prev.filter((item) => item.book._id !== bookId));
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <>
      <Helmet>
        <title>Cart Item | E-Bookstore</title>
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
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3 animate-fade-in-down">
            <FaShoppingCart className="text-orange-500" />
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center shadow animate-fade-in">
                  <p className="text-lg text-gray-600">Your cart is empty!</p>
                </div>
              ) : (
                cartItems.map(({ book, quantity }) => (
                  <div
                    key={book._id}
                    className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md transition hover:shadow-xl hover:scale-[1.01] duration-200 animate-slide-up cursor-pointer"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                        <p className="text-gray-500 text-sm">Qty: {quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-lg font-bold text-orange-600">
                        ₹{book.price.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(book._id);
                        }}
                        className="text-red-500 hover:text-red-700 transition text-xl"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-5 animate-fade-in-up h-fit sticky top-10">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Order Summary</h2>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-gray-800 text-lg">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() =>
                  navigate("/buy/cart-item", {
                    state: { cartItems },
                  })
                }
                className={`w-full py-3 mt-2 rounded-lg font-semibold transition duration-300 ${cartItems.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style>
          {`
          .animate-fade-in-down {
            animation: fadeInDown 0.6s ease-in-out;
          }
          .animate-slide-up {
            animation: slideUp 0.5s ease-in-out;
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-in-out;
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>
      </div>
    </>
  );
}
