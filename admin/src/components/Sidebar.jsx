import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: '/profile', label: 'Profile' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/add-book', label: 'Add Book' },
    { to: '/book-list', label: 'Book List' },
    { to: '/sales-report', label: 'Sales Report' },
    { to: '/orders', label: 'All Orders' },
    { to: '/users', label: 'All Users' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">📚 BookStore</h1>
      <nav className="flex flex-col space-y-4">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 ${
              location.pathname === to ? 'bg-gray-700 font-semibold' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
