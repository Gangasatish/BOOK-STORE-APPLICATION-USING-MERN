import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorCard from '../components/ErrorCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Filter } from 'lucide-react';
import api, { getFriendlyError } from '../lib/api';
import { trackSearch } from '../utils/analytics';

const Shop = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword') || '';
    const categoryParam = searchParams.get('category') || '';

    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

    const categories = ['All', 'Fiction', 'Classic', 'Fantasy', 'Romance', 'Dystopian', 'Science Fiction', 'Mystery', 'History', 'Business', 'Technology'];

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            let url = `/books?keyword=${encodeURIComponent(keyword)}`;
            if (selectedCategory && selectedCategory !== 'All') {
                url += `&category=${encodeURIComponent(selectedCategory)}`;
            }
            const { data } = await api.get(url);
            setBooks(data);
            setLoading(false);
            if (keyword) trackSearch(keyword);
        } catch (err) {
            setError(getFriendlyError(err));
            setLoading(false);
        }
    }, [keyword, selectedCategory]);

    useEffect(() => { fetchBooks(); }, [fetchBooks]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <SEO
                title={keyword ? `Shop ${keyword} Books | Curated Online Bookstore India` : 'Shop Aesthetic Books | Independent Book Marketplace India'}
                description={keyword ? `Search for "${keyword}" at LuminaReads, an independent book marketplace India. Buy aesthetic books online with cash on delivery.` : 'Browse our handpicked fiction emporium in India. Shop the best online alternative to mega bookstores for romance and fantasy readers.'}
                url={keyword ? `https://book-store-application-using-mern-seven.vercel.app/shop?keyword=${encodeURIComponent(keyword)}` : 'https://book-store-application-using-mern-seven.vercel.app/shop'}
                keywords="curated online bookstore India, independent book marketplace India, handpicked fiction emporium, buy aesthetic books online, affordable bibliophile platform, next-gen reader discovery"
            />
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Shop' }]} />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {keyword ? `Search Results for "${keyword}"` : 'All Books'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {loading ? 'Loading books…' : `Showing ${books.length} result${books.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select className="border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-700 dark:text-gray-200 rounded-md shadow-sm py-2 px-4 focus:ring-primary-500 hover:border-primary-400 focus:border-primary-500 transition-colors cursor-pointer" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {loading ? (
                    [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
                ) : error ? (
                    <ErrorCard error={error} onRetry={fetchBooks} fullWidth />
                ) : books.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No books found</h2>
                        <p className="text-gray-500">Try adjusting your search criteria or category filter.</p>
                    </div>
                ) : (
                    books.map((book) => (
                        <div key={book._id} className="animate-fade-in">
                            <BookCard book={book} />
                        </div>
                    ))
                )}
            </div>
            <section className="mt-14 bg-primary-50 dark:bg-dark-surface rounded-3xl p-8 border border-primary-100 dark:border-primary-900">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Looking for reading inspiration?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Explore trending genres, curated collections, and expert book guides to help you find the perfect title.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/categories" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all">Browse Genres</Link>
                    <Link to="/blog" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-100 transition-all">Read Book Tips</Link>
                </div>
            </section>
        </div>
    );
};

export default Shop;
