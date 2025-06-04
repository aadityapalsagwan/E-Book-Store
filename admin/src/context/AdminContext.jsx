import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminToken');
    if (storedAdmin) {
      setAdmin({ token: storedAdmin });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setAdmin({ token });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
