import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-primary-100 dark:from-dark-bg dark:to-dark-surface px-4">
            <SEO
                title="404 Page Not Found | LuminaReads"
                description="The page you are looking for is not available. Return to LuminaReads home to continue browsing great books."
                url="https://luminareads.com/404"
                noindex
            />
            <div className="max-w-2xl text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                        404
                    </div>
                    <div className="h-1 w-32 bg-primary-600 dark:bg-primary-400 mx-auto mb-8"></div>
                </div>

                {/* Content */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                    The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                    Don't worry! Let's get you back to exploring great books.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                        <Home className="h-5 w-5" />
                        Go Home
                    </Link>
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 bg-white dark:bg-dark-surface text-gray-900 dark:text-white border-2 border-primary-600 dark:border-primary-400 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-dark-bg transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Browse Books
                    </Link>
                </div>

                {/* Suggestions */}
                <div className="bg-white dark:bg-dark-surface rounded-lg p-8 shadow-lg border border-gray-200 dark:border-dark-border">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Helpful Links
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to="/shop" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors">
                            → Shop All Books
                        </Link>
                        <Link to="/categories" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors">
                            → Browse Categories
                        </Link>
                        <Link to="/about" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors">
                            → About LuminaReads
                        </Link>
                        <Link to="/contact" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors">
                            → Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
