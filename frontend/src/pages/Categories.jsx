import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const categories = [
    'Fiction',
    'Classic',
    'Fantasy',
    'Romance',
    'Dystopian',
    'Science Fiction',
    'Mystery',
    'History',
    'Business',
    'Technology'
];

const Categories = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <SEO
                title="Browse Book Categories | Buy Fiction, Romance & Mystery Books Online"
                description="Explore LuminaReads' extensive book categories. Buy fiction books, romance novels, fantasy, and classic literature online in India. Affordable online bookstore with fast delivery and cash on delivery!"
                url="https://book-store-application-using-mern-seven.vercel.app/categories"
                keywords="book categories, buy fiction books online India, romance novels online, fantasy books buy, mystery books India, science fiction books online, classic literature buy, book genres online, shop books by category, affordable books India"
            />
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Categories' }]} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Browse Book Categories</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Select a genre to explore curated book collections and discover titles that match your next reading adventure.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                {categories.map((category) => (
                    <Link
                        key={category}
                        to={`/shop?category=${encodeURIComponent(category)}`}
                        className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl px-4 py-6 text-center font-semibold text-gray-800 dark:text-gray-100 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                        {category}
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <section className="bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Why browse by genre?</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Finding the right category helps you discover books faster and match your reading preferences. Whether you love fantasy, romance, mystery, or business, our categories organize top selling titles for easy browsing.
                    </p>
                </section>
                <section className="bg-primary-50 dark:bg-primary-950/20 rounded-3xl border border-primary-100 dark:border-primary-900 p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Need reading inspiration?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        Visit our blog for book recommendations, genre guides, and reading tips.</p>
                    <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all">
                        Read Blog Articles
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Categories;
