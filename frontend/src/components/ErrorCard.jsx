import { motion as Motion } from 'framer-motion';
import { WifiOff, Clock, ServerCrash, AlertTriangle, RefreshCw } from 'lucide-react';

const VARIANTS = {
    network: {
        icon: WifiOff,
        title: 'Connection Lost',
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-950/20',
        border: 'border-amber-200 dark:border-amber-800',
        buttonBg: 'bg-amber-500 hover:bg-amber-600',
    },
    timeout: {
        icon: Clock,
        title: 'Request Timed Out',
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        buttonBg: 'bg-blue-500 hover:bg-blue-600',
    },
    server: {
        icon: ServerCrash,
        title: 'Server Error',
        color: 'text-red-500',
        bg: 'bg-red-50 dark:bg-red-950/20',
        border: 'border-red-200 dark:border-red-800',
        buttonBg: 'bg-red-500 hover:bg-red-600',
    },
    generic: {
        icon: AlertTriangle,
        title: 'Something Went Wrong',
        color: 'text-gray-500',
        bg: 'bg-gray-50 dark:bg-gray-800/40',
        border: 'border-gray-200 dark:border-gray-700',
        buttonBg: 'bg-gray-600 hover:bg-gray-700',
    },
};

/**
 * Detect error variant from an error object or message string.
 */
const detectVariant = (error) => {
    if (!error) return 'generic';
    const msg = typeof error === 'string' ? error : error.message || '';
    const code = error?.code || '';

    if (code === 'ECONNABORTED' || msg.includes('timeout') || msg.includes('timed out') || msg.includes('taking longer')) {
        return 'timeout';
    }
    if (code === 'ERR_NETWORK' || msg.includes('connect') || msg.includes('network') || msg.includes('internet')) {
        return 'network';
    }
    if (msg.includes('server') || msg.includes('500') || msg.includes('our end')) {
        return 'server';
    }
    return 'generic';
};

const ErrorCard = ({
    error,
    message,
    variant: variantProp,
    onRetry,
    className = '',
    fullWidth = false,
}) => {
    const variant = variantProp || detectVariant(error);
    const config = VARIANTS[variant] || VARIANTS.generic;
    const Icon = config.icon;

    const displayMessage =
        message ||
        (typeof error === 'string' ? error : error?.friendlyMessage || error?.message) ||
        'An unexpected error occurred. Please try again.';

    return (
        <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`${fullWidth ? 'col-span-full' : ''} ${className}`}
            role="alert"
        >
            <div
                className={`rounded-2xl border p-6 sm:p-8 ${config.bg} ${config.border} transition-all`}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Icon */}
                    <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}
                    >
                        <Icon className={`h-6 w-6 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {config.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {displayMessage}
                        </p>
                    </div>

                    {/* Retry Button */}
                    {onRetry && (
                        <Motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onRetry}
                            className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${config.buttonBg}`}
                            aria-label="Retry loading"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Motion.button>
                    )}
                </div>
            </div>
        </Motion.div>
    );
};

export default ErrorCard;
