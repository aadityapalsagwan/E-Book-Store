import { useEffect, useRef, useState } from 'react';
import { FaShoppingCart, FaBoxOpen, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem('user'));
  const userInitial = user?.name?.[0]?.toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50 px-6 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-15 rounded-full object-cover" />
          <span className="text-xl font-semibold text-blue-700">e-Book Store</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 relative">
          <a href="/orders" title="Orders" className="hover:text-blue-600"><FaBoxOpen size={20} /></a>
          <a href="/cart" title="Cart" className="hover:text-blue-600"><FaShoppingCart size={20} /></a>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold"
              title="Profile"
            >
              {userInitial || <span>👤</span>}
            </div>

            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white border shadow-md rounded-md z-50 w-40">
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden text-2xl text-gray-700 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <FaTimes className="text-xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
        </div>
        <div className="flex flex-col p-4 gap-4 text-base">
          <a href="/" onClick={() => setIsSidebarOpen(false)} className="flex gap-2 items-center">
            <AiOutlineHome size={20} color="black" /> Home
          </a>
          <a href="/profile" onClick={() => setIsSidebarOpen(false)} className="flex gap-2 items-center">
            👤 Profile
          </a>
          <a href="/orders" onClick={() => setIsSidebarOpen(false)} className="flex gap-2 items-center">
            <FaBoxOpen /> Orders
          </a>
          <a href="/cart" onClick={() => setIsSidebarOpen(false)} className="flex gap-2 items-center">
            <FaShoppingCart /> Cart
          </a>
          <button
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false);
            }}
            className="flex gap-2 items-center text-red-500"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsSidebarOpen(false)}></div>}
      <div className="pt-16"></div>
    </>
  );
}
