import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnalyticsTracker from './components/AnalyticsTracker';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { initBackendWakeUp } from './lib/backendWakeUp';

import Home from './pages/Home';

// Other routes lazy-loaded for smaller initial bundle
const Footer = lazy(() => import('./components/Footer'));
const Shop = lazy(() => import('./pages/Shop'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Cart = lazy(() => import('./pages/Cart'));
const AdminBooks = lazy(() => import('./pages/AdminBooks'));
const AboutContact = lazy(() => import('./pages/AboutContact'));
const AdminBookEdit = lazy(() => import('./pages/AdminBookEdit'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const Blog = lazy(() => import('./pages/Blog'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const Categories = lazy(() => import('./pages/Categories'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));
const UserRoute = lazy(() => import('./components/UserRoute'));
const Account = lazy(() => import('./pages/Account'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const WhatsAppFloat = lazy(() => import('./components/WhatsAppFloat'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SellWithUs = lazy(() => import('./pages/SellWithUs'));
const AdminCollabRequests = lazy(() => import('./pages/AdminCollabRequests'));

const SuspenseFallback = () => (
    <div className="py-20">
        <Loader />
    </div>
);

function App() {
    // Fire backend health check on app mount
    useEffect(() => {
        initBackendWakeUp();
    }, []);

    return (
        <Router>
            <AnalyticsTracker />
            <ErrorBoundary>
                <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100">
                    <Navbar />
                    <main className="grow">
                        <Suspense fallback={<SuspenseFallback />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/book/:id" element={<BookDetails />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/login" element={<Login />} />
                                <Route element={<UserRoute />}>
                                    <Route path="/account" element={<Account />} />
                                    <Route path="/orders/:id" element={<OrderDetails />} />
                                    <Route path="/order-success/:id" element={<OrderSuccess />} />
                                </Route>
                                <Route path="/admin/login" element={<Login adminMode />} />
                                <Route element={<AdminRoute />}>
                                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                    <Route path="/admin/books" element={<AdminBooks />} />
                                    <Route path="/admin/books/new" element={<AdminBookEdit />} />
                                    <Route path="/admin/books/:id/edit" element={<AdminBookEdit />} />
                                    <Route path="/admin/orders" element={<AdminOrders />} />
                                    <Route path="/admin/collab" element={<AdminCollabRequests />} />
                                </Route>
                                <Route path="/about" element={<AboutContact />} />
                                <Route path="/contact" element={<AboutContact />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/categories" element={<Categories />} />
                                <Route path="/faq" element={<SupportPage topic="faq" />} />
                                <Route path="/shipping" element={<SupportPage topic="shipping" />} />
                                <Route path="/returns" element={<SupportPage topic="returns" />} />
                                <Route path="/sell-with-us" element={<SellWithUs />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Suspense fallback={null}>
                        <WhatsAppFloat />
                    </Suspense>
                    <Suspense fallback={<footer className="h-64 bg-white dark:bg-dark-surface"></footer>}>
                        <Footer />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
