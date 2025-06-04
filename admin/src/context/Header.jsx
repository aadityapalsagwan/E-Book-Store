import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const Header = () => {
  const { logout } = useContext(AdminContext);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <button
        onClick={logout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
