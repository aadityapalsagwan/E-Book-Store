import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [fetchError, setFetchError] = useState('');

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setFetchError('No token found, please login');
        navigate('/');
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized - Invalid or expired token');
        }
        throw new Error(`Error fetching profile: ${res.statusText}`);
      }

      const data = await res.json();
      const userData = data.user || data;
      setProfile(userData);
      setFetchError('');
    } catch (err) {
      console.error('Profile fetch error:', err.message);
      setFetchError('Session expired or invalid token. Please login again.');
      localStorage.removeItem('adminToken');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Get first letter of name, uppercase
  const firstLetter = profile.name ? profile.name.charAt(0).toUpperCase() : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="ml-64 pt-24 px-10 flex-grow flex justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10"
          >
            <div className="flex items-center gap-5 mb-8">
              {/* Profile Icon */}
              <div className="flex justify-center items-center w-16 h-16 rounded-full bg-blue-300 text-white text-3xl font-bold select-none">
                {firstLetter || 'A'}
              </div>
              <h2 className="text-4xl font-extrabold text-indigo-900">
                Admin Profile
              </h2>
            </div>

            {fetchError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 text-red-700 p-5 rounded-lg mb-6 font-semibold shadow-sm"
              >
                {fetchError}
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div>
                  <p className="text-sm uppercase text-indigo-400 font-semibold tracking-wide mb-1">
                    Name
                  </p>
                  <p className="text-2xl font-semibold text-black">
                    {profile.name || (
                      <span className="italic text-gray-400">Loading...</span>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase text-indigo-400 font-semibold tracking-wide mb-1">
                    Email
                  </p>
                  <p className="text-2xl font-semibold text-black">
                    {profile.email || (
                      <span className="italic text-gray-400">Loading...</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfile;
