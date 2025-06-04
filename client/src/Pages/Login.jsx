import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../auth';
import { FaBook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


// Read API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();

      // Save token and user in localStorage
      localStorage.setItem('token', data.token);
      // localStorage.setItem('user', JSON.stringify({ ...data.user}));
      localStorage.setItem('userId', data.user._id);


      loginUser(data); // Agar ye function kuch aur kar raha ho to theek hai
      navigate('/');    // Redirect to homepage or dashboard
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <>
       <Helmet>
        <title>Login to Your Account | Secure Access | E-Bookstore</title>
        <meta
          name="description"
          content="Securely login to your E-Bookstore account to access your ebooks, track orders, and manage your profile with ease."
        />
        <meta
          name="keywords"
          content="login, secure login, user account access, ebookstore login, sign in, online bookstore account"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-tr from-cyan-100 via-white to-indigo-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-md shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-wide">
            <FaBook className="text-2xl" /> Book Store
          </div>
        </nav>

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in-up transition-all duration-500">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 tracking-tight">Welcome Back</h2>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
