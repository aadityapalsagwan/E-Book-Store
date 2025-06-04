import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import ProfilePage from './Pages/ProfilePage'; // Optional, if you have one
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar';
import { isLoggedIn } from './auth';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import BookDetails from './Pages/BookDetails';
import About from './Pages/About';
import Support from './Pages/Support';
import FAQs from './Pages/FAQ';
import TermsConditions from './Pages/T&C';
import PrivacyPolicy from './Pages/P&P';
import ChangePassword from './Pages/changepassword';
import Buy from './Pages/Buy';
import PaymentPage from './Pages/PaymentPage';
import OrderSuccess from './Pages/OrderSuccess';
import CartBuy from './Pages/CartBuy';


function Layout() {
    const location = useLocation();
    const loggedIn = isLoggedIn();
    const hideNavbarOn = ['/login', '/signup'];
    const shouldShowNavbar = loggedIn && !hideNavbarOn.includes(location.pathname);

    return (
        <>
            {shouldShowNavbar && <Navbar />}

            <Routes>
                <Route path="/"
                    element={!isLoggedIn() ? <Navigate to="/login" /> : <Home />} />

                <Route
                    path="/login"
                    element={isLoggedIn() ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={isLoggedIn() ? <Navigate to="/" /> : <Signup />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/FAQs"
                    element={
                        <ProtectedRoute>
                            <FAQs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Privacy-Policy"
                    element={
                        <ProtectedRoute>
                            <PrivacyPolicy />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Support"
                    element={
                        <ProtectedRoute>
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Terms-&-Conditions"
                    element={
                        <ProtectedRoute>
                            <TermsConditions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/books/:id"
                    element={
                        <ProtectedRoute>
                            <BookDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/changepassword"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/buy/:id"
                    element={
                        <ProtectedRoute>
                            <Buy />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute>
                            <PaymentPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/order-success"
                    element={
                        <ProtectedRoute>
                            <OrderSuccess />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/buy/cart-item"
                    element={
                        <ProtectedRoute>
                            <CartBuy />
                        </ProtectedRoute>
                    }
                />



            </Routes>

        </>
    );
}

export default function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}
