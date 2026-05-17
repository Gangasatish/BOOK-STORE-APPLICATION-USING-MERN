import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, Users, BookOpen, Zap } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const AboutContact = () => {
    const location = useLocation();
    const isContactPage = location.pathname === '/contact';
    const whatsappUrl = 'https://wa.me/917981048680?text=Hi%2C%20I%20need%20help%20with%20my%20order.';
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `New Contact Message:%0AName: ${encodeURIComponent(
            `${form.firstName} ${form.lastName}`.trim()
        )}%0AEmail: ${encodeURIComponent(form.email)}%0AMessage: ${encodeURIComponent(form.message)}`;
        const submitUrl = `https://wa.me/917981048680?text=${text}`;
        window.open(submitUrl, '_blank');
        setSent(true);
        setForm({ firstName: '', lastName: '', email: '', message: '' });
    };

    const features = [
        { icon: BookOpen, title: 'Curated Collection', desc: 'Handpicked books across all genres' },
        { icon: Zap, title: 'Fast Shipping', desc: 'Quick delivery to your doorstep' },
        { icon: Award, title: 'Quality Guaranteed', desc: 'Premium books from trusted sources' },
        { icon: Users, title: 'Expert Support', desc: '24/7 customer support available' },
    ];

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LuminaReads',
        url: 'https://book-store-application-using-mern-seven.vercel.app/about',
        logo: 'https://book-store-application-using-mern-seven.vercel.app/logo.png',
        contactPoint: [{
            '@type': 'ContactPoint',
            telephone: '+91-7981048680',
            contactType: 'customer support',
            areaServed: 'IN',
            availableLanguage: ['English'],
        }],
        sameAs: [
            'https://www.facebook.com/luminareads',
            'https://twitter.com/luminareads',
            'https://www.instagram.com/luminareads'
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            <SEO
                title={isContactPage ? 'Contact Us | Customer Support & Help | LuminaReads Bookstore' : 'About Us | Best Online Bookstore in India | LuminaReads'}
                description={isContactPage ? 'Contact LuminaReads for order support, book inquiries, and publishing partnerships. Our team ensures fast book delivery in India and hassle-free cash on delivery shopping experiences.' : 'Learn more about LuminaReads, your trusted online bookstore in India. We offer affordable books, curated collections, fast book delivery, and excellent customer service for book lovers nationwide.'}
                url={isContactPage ? 'https://book-store-application-using-mern-seven.vercel.app/contact' : 'https://book-store-application-using-mern-seven.vercel.app/about'}
                keywords={isContactPage ? 'contact bookstore, bookstore support, order help, LuminaReads contact' : 'online bookstore India, about LuminaReads, book delivery, bookshop, reading community, customer support'}
                schema={schema}
            />
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
            {/* Hero Section */}
            <section className="bg-linear-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-950 text-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About LuminaReads</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        Your premier destination for discovering, purchasing, and sharing great books
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* About Section */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                Founded in 2026, LuminaReads emerged from a simple belief: everyone deserves access to great literature. What started as a passion project has blossomed into a thriving online bookstore serving book lovers across the globe.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                We understand that books are more than just words on pages. They are gateways to new worlds, sources of inspiration, windows into different perspectives, and companions through life's journey. Our mission is to connect readers with books that resonate with their hearts and minds.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Choose LuminaReads?</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-primary-600 font-bold">✓</span>
                                    <span><strong>Expertly Curated Selection:</strong> Our collection spans every genre imaginable, from timeless classics to contemporary bestsellers, indie gems to international treasures.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-primary-600 font-bold">✓</span>
                                    <span><strong>Competitive Prices:</strong> We believe great books should be affordable. Enjoy discounts and special offers on popular titles.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-primary-600 font-bold">✓</span>
                                    <span><strong>Fast & Reliable Shipping:</strong> Your books arrive quickly and safely. We partner with trusted delivery partners across India.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-primary-600 font-bold">✓</span>
                                    <span><strong>Exceptional Customer Service:</strong> Our dedicated support team is ready to help you 24/7 through WhatsApp, email, or contact form.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                We envision a world where every reader can discover their next favorite book easily and affordably. Whether you're hunting for that one specific title, exploring a new genre, or browsing our latest arrivals, LuminaReads makes the experience seamless and enjoyable.
                            </p>
                        </section>

                        <img
                            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop"
                            alt="Bookstore Library with rows of books"
                            loading="lazy"
                            decoding="async"
                            className="rounded-2xl shadow-xl w-full h-64 object-cover"
                        />
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-8">
                        {/* Contact Form */}
                        <div className="bg-white dark:bg-dark-surface p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-dark-border">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Get in Touch</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">Have questions? We'd love to hear from you. Send us a message and we'll respond promptly.</p>
                            
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg items-center gap-2"
                                aria-label="Chat with us on WhatsApp"
                            >
                                <span>💬</span> Chat Us on WhatsApp
                            </a>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            value={form.firstName}
                                            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all"
                                            required
                                            aria-required="true"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            value={form.lastName}
                                            onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all"
                                            aria-label="Last name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        value={form.message}
                                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-all resize-none"
                                        required
                                        aria-required="true"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
                                    aria-label="Send contact message"
                                >
                                    Send Message
                                </button>
                                {sent && (
                                    <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg text-sm border border-green-200 dark:border-green-800">
                                        ✓ Message sent successfully! Our support team will contact you soon.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white dark:bg-dark-surface p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-dark-border">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            LPU Campus, Jalandhar<br />Punjab, India - 144411
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Phone / WhatsApp</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <a href="tel:+917981048680" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                                                +91 79810 48680
                                            </a>
                                            <span className="block mt-1 text-sm">Available 24/7 for your queries and support</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                                        <a href="mailto:support@luminareads.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                                            support@luminareads.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="mt-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Why Readers Love LuminaReads</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-dark-border text-center">
                                <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" aria-hidden="true" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-16 bg-primary-50 dark:bg-primary-950/20 rounded-3xl p-8 border border-primary-100 dark:border-primary-900">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to explore books or get support?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        Browse our full collection, discover curated categories, or contact our support team for order and publishing questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all">
                            Browse Books
                        </Link>
                        <Link to="/faq" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-100 transition-all">
                            Visit FAQ
                        </Link>
                        <Link to="/categories" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-100 transition-all">
                            Browse Categories
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutContact;
