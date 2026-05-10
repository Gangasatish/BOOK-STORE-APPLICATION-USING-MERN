import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const posts = [
    {
        title: 'How to Find the Perfect Book for Your Mood',
        excerpt: 'Discover smart ways to choose books that match your reading mood, interests, and goals, whether you want escape, inspiration, or skill-building.',
        slug: 'find-perfect-book',
    },
    {
        title: 'Top 5 Must-Read Book Genres for Every Reader',
        excerpt: 'Explore the bestselling genres readers love, from fantasy and romance to thriller and personal development.',
        slug: 'must-read-book-genres',
    },
    {
        title: 'Why Reading Daily Improves Focus and Creativity',
        excerpt: 'Learn how a small daily reading habit can transform your concentration, creativity, and long-term learning.',
        slug: 'daily-reading-benefits',
    },
];

const Blog = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'LuminaReads Blog',
        url: 'https://luminareads.com/blog',
        description: 'Read articles on book recommendations, reading habits, genres, and book buying tips from LuminaReads.',
        blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `https://luminareads.com/blog#${post.slug}`,
        })),
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <SEO
                title="Blog | LuminaReads"
                description="Read expert book recommendations, genre guides, and reading tips from LuminaReads."
                url="https://luminareads.com/blog"
                keywords="book blog, reading tips, book recommendations, genre guides"
                schema={schema}
            />
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Blog' }]} />

            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">LuminaReads Blog</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                    Fresh insights on books, reading habits, author recommendations, and tips to help you choose your next favorite read.
                </p>
            </div>

            <div className="space-y-10">
                {posts.map((post) => (
                    <article key={post.slug} id={post.slug} className="bg-white dark:bg-dark-surface rounded-3xl shadow-sm border border-gray-100 dark:border-dark-border p-8 transition-transform hover:-translate-y-1">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">{post.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                                <p>Discover more content about choosing the right book, top genres, and how daily reading improves focus.</p>
                                <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-semibold">
                                    Shop popular titles →
                                </Link>
                            </div>
                            <Link to={`/shop`} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all font-semibold">
                                Browse Books
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            <section className="mt-16 bg-primary-50 dark:bg-primary-950/20 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Find your next read with LuminaReads</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Explore curated recommendations, genre guides, and shopping inspiration across our site. Ready to browse more books?</p>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all">
                        Shop Books
                    </Link>
                    <Link to="/categories" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-50 transition-all">
                        Browse Categories
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Blog;
