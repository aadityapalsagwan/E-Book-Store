import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


// Get base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
      }

      // Optionally display success message
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
   <>
     <Helmet>
        <title>Create Your Account | Signup for Free | E-Bookstore</title>
        <meta
          name="description"
          content="Join E-Bookstore for free and get instant access to thousands of ebooks. Easy and secure signup process to start your reading journey today."
        />
        <meta
          name="keywords"
          content="signup, create account, register, ebookstore signup, free account creation, secure registration, online bookstore"
        />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-white to-cyan-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-wide">
          <FaBook className="text-2xl" /> Book Store
        </div>
      </nav>

      {/* Form Container */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-md animate-fade-in-up bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transition-all duration-500">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 tracking-tight">Join Book Store</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow-sm transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
   </>
  );
}
