import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const Header = () => {
  const { logout } = useContext(AdminContext);

  return (
  <header className="fixed top-0 left-64 right-0 bg-white shadow-md px-6 py-4 flex justify-between items-center z-30">
  <h1 className="text-2xl font-bold text-gray-800 tracking-wide">📘 Admin Panel</h1>
  <button
    onClick={logout}
    className="bg-red-600 hover:bg-red-700 transition duration-200 text-white font-medium px-5 py-2 rounded-lg shadow-sm"
  >
    🔒 Logout
  </button>
</header>

  );
};

export default Header;
