import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import SkeletonCard from '../components/SkeletonCard';
import SEO from '../components/SEO';
import DeferredRender from '../components/DeferredRender';

const WakeUpScreen = lazy(() => import('../components/WakeUpScreen'));
const ErrorCard = lazy(() => import('../components/ErrorCard'));

import { ArrowRight } from 'lucide-react';
import api, { getFriendlyError, deduplicatedGet } from '../lib/api';
import { useBackendWaking } from '../lib/backendWakeUp';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSent, setNewsletterSent] = useState(false);
    const isWaking = useBackendWaking();

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'LuminaReads - Modern Bookworm Marketplace India',
        'alternateName': 'Curated Novel Emporium Online',
        'url': 'https://book-store-application-using-mern-seven.vercel.app/',
        'description': 'Discover LuminaReads, the modern bookworm marketplace in India. Shop a curated collection of fiction, fantasy, and romance books with fast cash on delivery.',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://book-store-application-using-mern-seven.vercel.app/shop?keyword={search_term}',
            'query-input': 'required name=search_term'
        }
    };

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await deduplicatedGet('/books?paginate=true&limit=12');
            setBooks(Array.isArray(data) ? data : (data.items || []));
        } catch (err) {
            setError(getFriendlyError(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        setNewsletterSent(true);
        setNewsletterEmail('');
    };

    // Determine what to show in the Trending Now section
    const renderBookSection = () => {
        if (isWaking && loading) {
            return (
                <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading backend...</div>}>
                    <WakeUpScreen inline />
                </Suspense>
            );
        }

        if (loading) {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            );
        }

        if (error) {
            return (
                <Suspense fallback={<div className="text-center text-red-500 py-10">Failed to load books.</div>}>
                    <ErrorCard error={error} onRetry={fetchBooks} fullWidth />
                </Suspense>
            );
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
                {books.slice(0, 5).map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        );
    };

    return (
        <div>
            <SEO
                title="Modern Bookworm Marketplace India | Curated Books at LuminaReads"
                description="Discover LuminaReads, the modern bookworm marketplace in India. Shop a curated collection of fiction, fantasy, and romance books with fast cash on delivery."
                url="https://book-store-application-using-mern-seven.vercel.app/"
                image="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=630&fit=crop"
                keywords="modern bookworm marketplace India, curated novel emporium online, smart reader bookshop India, affordable bibliophile bookstore, indie reading marketplace India, next-gen book discovery platform"
                schema={schema}
            />
            {/* Hero Section */}
            <section className="bg-primary-50 dark:bg-dark-surface overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Hero text — CSS animation instead of framer-motion */}
                        <div className="space-y-6 hero-text-enter">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                Welcome to LuminaReads: The Modern <span className="text-primary-600">Bookworm Marketplace</span> in India
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 md:max-w-lg">
                                Order from 1000+ books across fiction, romance, fantasy, mystery, thriller & more. Enjoy cash on delivery, free shipping above ₹500, and fast home delivery across India.
                            </p>
                            <div className="pt-4 flex gap-4">
                                <Link to="/shop" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                                    Shop Now <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Link to="/shop" className="bg-white dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border px-8 py-3 rounded-full font-medium hover:bg-gray-50 flex items-center transition-all">
                                    Browse Categories
                                </Link>
                            </div>
                        </div>

                        {/* Hero image — CSS animation, eager load for LCP, responsive srcSet */}
                        <div className="relative hidden md:block hero-image-enter">
                            <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900/40 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-10 translate-y-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
                                srcSet="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop 800w"
                                sizes="(max-width: 768px) 400px, 800px"
                                alt="LuminaReads - A modern bookworm marketplace in India offering curated fiction and romance novels."
                                loading="eager"
                                fetchpriority="high"
                                decoding="async"
                                width={800}
                                height={533}
                                className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <DeferredRender minHeight="400px">
                <section className="py-20 bg-white dark:bg-dark-bg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bestselling Books Online</h2>
                                <p className="text-gray-500 dark:text-gray-400">Most popular books to buy this week — affordable prices with fast delivery</p>
                            </div>
                            <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group">
                                View All <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {renderBookSection()}
                    </div>
                </section>
            </DeferredRender>

            {/* Categories Banner — content-visibility for deferred rendering */}
            <DeferredRender minHeight="300px">
                <section className="py-20 bg-gray-50 dark:bg-dark-surface cv-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Shop Books by Category</h2>
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
            </DeferredRender>

            {/* Blog Teaser — content-visibility for deferred rendering */}
            <DeferredRender minHeight="400px">
                <section className="py-16 bg-gray-50 dark:bg-dark-surface cv-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">From the LuminaReads Blog</h2>
                                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mt-2">
                                    Get reading advice, genre guides, and book-buying tips to help you find your next favorite title.
                                </p>
                            </div>
                            <Link to="/blog" className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-700 transition-all">
                                Visit Blog
                            </Link>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                {
                                    title: 'How to Find the Perfect Book for Your Mood',
                                    excerpt: 'Discover smart ways to choose books that match your mood and reading goals.',
                                },
                                {
                                    title: 'Top 5 Must-Read Book Genres for Every Reader',
                                    excerpt: 'Explore the bestselling genres readers love, from fantasy to personal development.',
                                },
                                {
                                    title: 'Why Reading Daily Improves Focus and Creativity',
                                    excerpt: 'Learn how a small daily reading habit can transform focus and creative thinking.',
                                },
                            ].map((post, index) => (
                                <article key={index} className="bg-white dark:bg-dark-bg rounded-3xl border border-gray-100 dark:border-dark-border p-6 shadow-sm hover:shadow-md transition-all">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
                                    <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-semibold">
                                        Read the article →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </DeferredRender>

            {/* Newsletter Signup — content-visibility for deferred rendering */}
            <DeferredRender minHeight="300px">
                <section className="py-16 bg-primary-600 text-white cv-auto">
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
                            <p className="mt-5 text-sm text-white/90">Thanks! You're now on the list for exclusive book updates.</p>
                        )}
                    </div>
                </section>
            </DeferredRender>

            {/* SEO Semantic Paragraph - Important for SERP Domination */}
            <DeferredRender minHeight="150px">
                <section className="py-12 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Welcome to your new favorite reading destination. As a <strong>modern bookworm marketplace in India</strong>, LuminaReads is built for readers who crave quality and convenience. We step away from cluttered mega-stores to bring you a carefully <strong>curated novel emporium online</strong>. Whether you are hunting for gripping mystery thrillers, heartwarming romance, or epic fantasy, our <strong>smart reader bookshop</strong> offers affordable prices, reliable cash on delivery, and fast shipping across the country. Dive into our collection and experience the <strong>next-gen book discovery platform</strong> designed specifically for bibliophiles.
                        </p>
                    </div>
                </section>
            </DeferredRender>
        </div>
    );
};

export default Home;
