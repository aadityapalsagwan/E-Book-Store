import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import BookList from './pages/BookList';
import SalesReport from './pages/SalesReport';
import NotFound from './pages/NotFound';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import AdminProfile from './pages/AdminProfile';

const RoutesFile = () => {
  const { admin } = useContext(AdminContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {admin ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/profile" element={<AdminProfile />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesFile;
