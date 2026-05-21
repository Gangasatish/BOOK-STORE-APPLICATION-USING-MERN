import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Send, BookOpen, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import api, { getFriendlyError } from '../lib/api';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const benefits = [
    { icon: Users, title: 'Reach Thousands of Readers', desc: 'Get your book in front of an engaged audience across every genre.' },
    { icon: TrendingUp, title: 'Grow Your Sales', desc: 'Benefit from curated promotions, featured listings, and genre spotlights.' },
    { icon: BookOpen, title: 'Simple Submission', desc: 'Submit your title quickly with our easy collaboration request form.' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const SellWithUs = () => {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', organization: '',
        bookTitle: '', authorName: '', genre: '', publishYear: '',
        description: '', sampleLink: '', expectedPrice: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);
        try {
            setLoading(true);
            const payload = {
                ...form,
                publishYear: form.publishYear ? Number(form.publishYear) : null,
                expectedPrice: form.expectedPrice ? Number(form.expectedPrice) : 0,
            };
            const { data } = await api.post('/collab', payload);
            setMessage(data.message || 'Request submitted successfully!');
            setSuccess(true);
            setForm({
                name: '', email: '', phone: '', organization: '',
                bookTitle: '', authorName: '', genre: '', publishYear: '',
                description: '', sampleLink: '', expectedPrice: '',
            });
        } catch (err) {
            setMessage(getFriendlyError(err));
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all placeholder:text-gray-400";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            <SEO
                title="Sell Books Online | Partner With India's Curated Online Bookstore | LuminaReads"
                description="Sell your books on LuminaReads, an independent book marketplace India. Partner with India's curated online bookstore and affordable bibliophile platform to reach thousands of readers."
                url="https://book-store-application-using-mern-seven.vercel.app/sell-with-us"
                keywords="modern bookworm marketplace India, sell books online India, curated online bookstore India, independent book marketplace India, author collaboration, publish books online, partner with bookstore"
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-900 dark:to-primary-950 text-white py-16 md:py-24 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute bottom-10 right-20 w-48 h-48 border-2 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Sell With Us' }]} />
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Sell Your Books With <span className="text-primary-200">LuminaReads</span>
                        </h2>
                        <p className="text-lg md:text-xl text-primary-100 leading-relaxed mb-8">
                            Are you an author or publisher? Partner with India's growing online bookstore and reach thousands of passionate readers.
                        </p>
                        <a href="#submit-form" className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Submit Your Book <ArrowRight className="h-5 w-5" />
                        </a>
                    </Motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Benefits Section */}
                <section className="mb-20">
                    <Motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4"
                    >
                        Why Partner With LuminaReads?
                    </Motion.h2>
                    <Motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12"
                    >
                        Join a growing community of authors and publishers reaching readers across India.
                    </Motion.p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((b, i) => (
                            <Motion.div
                                key={b.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border p-8 text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <b.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{b.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                            </Motion.div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <Motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 bg-primary-50 dark:bg-primary-950/20 rounded-3xl border border-primary-100 dark:border-primary-900 p-8 md:p-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'Submit Your Book', desc: 'Fill out the collaboration form below with your book details.' },
                            { step: '2', title: 'We Review', desc: 'Our team reviews your submission and gets in touch within 48 hours.' },
                            { step: '3', title: 'Start Selling', desc: 'Once approved, your book goes live on LuminaReads for readers to discover.' },
                        ].map((s, i) => (
                            <Motion.div
                                key={s.step}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="text-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                                    {s.step}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.section>

                {/* Submission Form */}
                <Motion.section
                    id="submit-form"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-24"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Submit Your Book</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Fill in your details and we'll get back to you within 48 hours.</p>

                    <form onSubmit={onSubmit} className="max-w-3xl mx-auto bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-3xl p-8 md:p-10 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Your Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <input name="name" value={form.name} onChange={onChange} placeholder="Your Name *" required className={inputClasses} />
                            <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Email *" required className={inputClasses} />
                            <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone *" required className={inputClasses} />
                            <input name="organization" value={form.organization} onChange={onChange} placeholder="Publisher / Organization (optional)" className={inputClasses} />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Book Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input name="bookTitle" value={form.bookTitle} onChange={onChange} placeholder="Book Title *" required className={inputClasses} />
                            <input name="authorName" value={form.authorName} onChange={onChange} placeholder="Author Name *" required className={inputClasses} />
                            <input name="genre" value={form.genre} onChange={onChange} placeholder="Genre *" required className={inputClasses} />
                            <input type="number" name="publishYear" value={form.publishYear} onChange={onChange} placeholder="Publish Year" className={inputClasses} />
                            <input name="sampleLink" value={form.sampleLink} onChange={onChange} placeholder="Sample / Drive Link (optional)" className={inputClasses} />
                            <input type="number" name="expectedPrice" value={form.expectedPrice} onChange={onChange} placeholder="Expected Price (₹)" className={inputClasses} />
                        </div>

                        <textarea name="description" value={form.description} onChange={onChange} rows="5" placeholder="Book Description *" required className={`${inputClasses} resize-none mb-6`} />

                        {/* Status Message */}
                        {message && (
                            <Motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl text-sm mb-6 flex items-center gap-2 ${success ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'}`}
                            >
                                {success && <CheckCircle className="h-4 w-4 flex-shrink-0" />}
                                {message}
                            </Motion.div>
                        )}

                        <Motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <Send className="h-5 w-5" />
                            {loading ? 'Submitting…' : 'Submit Collaboration Request'}
                        </Motion.button>
                    </form>
                </Motion.section>

                {/* CTA Section */}
                <section className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need help before submitting?</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">Check out our FAQ for author guidelines or contact our team for any questions.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/faq" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all font-semibold">
                            Read FAQ
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-dark-surface text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-50 transition-all font-semibold">
                            Contact Support
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SellWithUs;
