import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const topicContent = {
    faq: {
        title: 'Frequently Asked Questions',
        metaDesc: 'Get answers to common questions about ordering books on LuminaReads. Learn about shipping times, order cancellation, international delivery, and payment options.',
        metaKeywords: 'bookstore FAQ, order questions, how to order books online, book delivery questions, LuminaReads help',
        items: [
            { q: 'How long does shipping take?', a: 'Standard shipping usually takes 3 to 7 business days.' },
            { q: 'Can I cancel my order?', a: 'Yes, before it is marked as shipped. Contact support quickly for help.' },
            { q: 'Do you have international shipping?', a: 'Yes, for selected countries. Rates are shown during checkout.' }
        ]
    },
    shipping: {
        title: 'Shipping Information',
        metaDesc: 'LuminaReads shipping policy: standard delivery in 3-7 days, express shipping in 1-2 days. Track your book order and get updates by email.',
        metaKeywords: 'book shipping India, book delivery time, express book shipping, track book order, LuminaReads shipping policy',
        items: [
            { q: 'Standard Shipping', a: '3 to 7 business days for domestic orders.' },
            { q: 'Express Shipping', a: '1 to 2 business days where available.' },
            { q: 'Tracking', a: 'A tracking update is sent to your email after dispatch.' }
        ]
    },
    returns: {
        title: 'Returns & Refunds',
        metaDesc: 'LuminaReads returns policy: 14-day return window, books must be unused. Refunds processed within 5-10 business days. Easy hassle-free returns.',
        metaKeywords: 'book returns policy, book refund, return books online, LuminaReads refund policy, 14-day returns',
        items: [
            { q: 'Return Window', a: 'Returns are accepted within 14 days of delivery.' },
            { q: 'Book Condition', a: 'Books should be unused and in original condition.' },
            { q: 'Refund Time', a: 'Refunds are processed within 5 to 10 business days after inspection.' }
        ]
    }
};

const SupportPage = ({ topic = 'faq' }) => {
    const content = topicContent[topic] || topicContent.faq;
    const url = `https://book-store-application-using-mern-seven.vercel.app/${topic}`;
    const schema = topic === 'faq'
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.items.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a,
                },
            })),
        }
        : null;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <SEO
                title={`${content.title} | LuminaReads Online Bookstore`}
                description={content.metaDesc}
                url={url}
                keywords={content.metaKeywords}
                schema={schema}
            />
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: content.title }]} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{content.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Find fast, clear answers to shipping, returns, and order support questions. If you'd like extra help, our support team is ready to assist.
            </p>

            <div className="space-y-4">
                {content.items.map((item) => (
                    <div key={item.q} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-5">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-3xl bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Can’t find what you need?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Browse our blog for book buying tips and browse categories to discover titles in your favorite genre.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/blog" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all">
                        Read the Blog
                    </Link>
                    <Link to="/categories" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-100 transition-all">
                        Browse Categories
                    </Link>
                </div>
            </div>
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                Need more help? Visit the <Link to="/contact" className="text-primary-600 hover:underline">contact page</Link>.
            </div>
        </div>
    );
};

export default SupportPage;
