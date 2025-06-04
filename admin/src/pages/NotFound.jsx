import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <Link to="/" className="text-blue-600 underline">
      Go to Login
    </Link>
  </div>
);

export default NotFound;
