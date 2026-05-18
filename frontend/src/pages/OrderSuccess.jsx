import { Link, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Receipt } from 'lucide-react';
import SEO from '../components/SEO';

const OrderSuccess = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center px-4">
            <SEO
                title="Order Confirmation | LuminaReads"
                description="Your order is confirmed and being processed. Thank you for choosing LuminaReads for your book purchase."
                url={`https://book-store-application-using-mern-seven.vercel.app/order-success/${id}`}
                noindex
            />
            <Motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-8 md:p-10 text-center"
            >
                <Motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                    className="mx-auto mb-5 w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"
                >
                    <CheckCircle2 className="h-11 w-11 text-emerald-600" />
                </Motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Order Placed Successfully</h2>
                <p className="text-gray-600 mb-6">
                    Your order is confirmed and being processed.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left border border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Order Reference</p>
                    <p className="font-mono text-sm text-gray-800 break-all">{id}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to={`/orders/${id}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
                    >
                        <Receipt className="h-5 w-5" />
                        View Order
                    </Link>
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold transition-colors"
                    >
                        Continue Shopping
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <section className="mt-10 text-left bg-primary-50 dark:bg-primary-950/20 rounded-3xl p-6 border border-primary-100 dark:border-primary-900">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">What happens next?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        We will process your order and notify you when it ships. Return to shopping for more books or explore recommended categories to keep reading.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link to="/categories" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all">
                            Browse Categories
                        </Link>
                        <Link to="/blog" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border hover:bg-gray-100 transition-all">
                            Reading Ideas
                        </Link>
                    </div>
                </section>
            </Motion.div>
        </div>
    );
};

export default OrderSuccess;
