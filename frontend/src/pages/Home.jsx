import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import SkeletonCard from '../components/SkeletonCard';
import SEO from '../components/SEO';
import { ArrowRight } from 'lucide-react';
import api from '../lib/api';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSent, setNewsletterSent] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await api.get('/books?paginate=true&limit=12');
                setBooks(Array.isArray(data) ? data : (data.items || []));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        setNewsletterSent(true);
        setNewsletterEmail('');
    };

    return (
        <div>
            <SEO
                title="LuminaReads | Discover Your Next Great Read"
                description="Explore thousands of books across every genre and purchase your next favorite title from LuminaReads. Fast shipping and secure checkout."
                url="https://luminareads.com/"
                image="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=630&fit=crop"
                keywords="online bookstore, buy books online, best books, fiction books, non-fiction books"
            />
            {/* Hero Section */}
            <section className="bg-primary-50 dark:bg-dark-surface overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                Discover Your Next <span className="text-primary-600">Great Read</span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 md:max-w-lg">
                                Explore thousands of books across all categories. From gripping thrillers to insightful non-fiction, find the perfect book to inspire your imagination.
                            </p>
                            <div className="pt-4 flex gap-4">
                                <Link to="/shop" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                                    Shop Now <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Link to="/shop" className="bg-white dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border px-8 py-3 rounded-full font-medium hover:bg-gray-50 flex items-center transition-all">
                                    Browse Categories
                                </Link>
                            </div>
                        </Motion.div>

                        <Motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden md:block"
                        >
                            <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900/40 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-10 translate-y-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
                                alt="Reading"
                                className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
                            />
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <section className="py-20 bg-white dark:bg-dark-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trending Now</h2>
                            <p className="text-gray-500 dark:text-gray-400">Our most popular books this week</p>
                        </div>
                        <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group">
                            View All <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {books.slice(0, 5).map((book) => (
                                <BookCard key={book._id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Categories Banner */}
            <section className="py-20 bg-gray-50 dark:bg-dark-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Popular Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Fiction', 'Classic', 'Fantasy', 'Romance'].map((cat) => (
                            <Link
                                key={cat}
                                to={`/shop?category=${cat}`}
                                className="bg-white dark:bg-dark-bg p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border group"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{cat}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay updated with new arrivals and offers</h2>
                    <p className="max-w-2xl mx-auto text-gray-100 mb-8">
                        Join our newsletter for curated book picks, exclusive discounts, and reading recommendations delivered straight to your inbox.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <input
                            type="email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full sm:max-w-xl px-5 py-4 rounded-full border border-white/20 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                            aria-label="Email for newsletter signup"
                            required
                        />
                        <button type="submit" className="inline-flex items-center justify-center bg-white text-primary-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors w-full sm:w-auto">
                            Subscribe
                        </button>
                    </form>
                    {newsletterSent && (
                        <p className="mt-5 text-sm text-white/90">Thanks! You’re now on the list for exclusive book updates.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
