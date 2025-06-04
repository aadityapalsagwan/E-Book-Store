import { BrowserRouter as Router } from 'react-router-dom';
import RoutesFile from './routes';
import AdminProvider from './context/AdminContext';

const App = () => {
  return (
    <AdminProvider>
      <Router>
        <RoutesFile />
      </Router>
    </AdminProvider>
  );
};

export default App;
