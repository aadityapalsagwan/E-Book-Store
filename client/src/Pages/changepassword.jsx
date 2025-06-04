import { useState } from 'react';
import { FaSave, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    const trimmedCurrent = currentPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedCurrent) newErrors.currentPassword = 'Current password is required.';
    else if (trimmedCurrent.length < 6) newErrors.currentPassword = 'Must be at least 6 characters.';

    if (!trimmedNew) newErrors.newPassword = 'New password is required.';
    else if (trimmedNew.length < 6) newErrors.newPassword = 'Must be at least 6 characters.';

    if (trimmedNew !== trimmedConfirm) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized: Please login again.');

      const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to change password.');
      }

      alert('Password changed successfully!');
      navigate('/profile');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `w-full px-4 py-3 mt-1 border rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
      error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'
    }`;

  const labelClass = 'text-sm font-medium text-gray-700 mb-1';

  return (
   <>
     <Helmet>
        <title>Password Change | E-Bookstore</title>
        <meta
          name="description"
          content={`Purchase " securely online. Add to cart now and get instant access to your favorite ebook.`}
        />
        <meta
          name="keywords"
          content={` ebook, online book purchase, digital ebook store`}
        />
      </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 ease-in-out">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-orange-600">
          <FaSave className="text-xl" /> Change Password
        </h1>

        {apiError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg text-sm animate-pulse">
            {apiError}
          </div>
        )}

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Input Field Template */}
          {[
            {
              label: 'Current Password',
              value: currentPassword,
              setter: setCurrentPassword,
              show: showCurrentPassword,
              toggleShow: setShowCurrentPassword,
              errorKey: 'currentPassword'
            },
            {
              label: 'New Password',
              value: newPassword,
              setter: setNewPassword,
              show: showNewPassword,
              toggleShow: setShowNewPassword,
              errorKey: 'newPassword'
            },
            {
              label: 'Confirm New Password',
              value: confirmPassword,
              setter: setConfirmPassword,
              show: showConfirmPassword,
              toggleShow: setShowConfirmPassword,
              errorKey: 'confirmPassword'
            }
          ].map((field, index) => (
            <div key={index} className="relative">
              <label className={labelClass}>{field.label}</label>
              <input
                type={field.show ? 'text' : 'password'}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className={inputClass(errors[field.errorKey])}
                disabled={loading}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              <button
                type="button"
                onClick={() => field.toggleShow((v) => !v)}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-800"
              >
                {field.show ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors[field.errorKey] && (
                <p className="text-red-600 text-sm mt-1">{errors[field.errorKey]}</p>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
              disabled={loading}
            >
              <FaArrowLeft /> Back to Profile
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className={`bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-xl font-medium text-sm shadow-md transition duration-200 ease-in-out flex items-center gap-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              <FaSave /> {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
   </>
  );
}
