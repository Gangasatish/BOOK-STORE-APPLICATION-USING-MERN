import { Component } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error for debugging (could integrate with a service in the future)
        console.error('[ErrorBoundary] Caught:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[50vh] flex items-center justify-center px-4 py-20">
                    <div className="max-w-md w-full bg-white dark:bg-dark-surface rounded-3xl shadow-lg border border-gray-100 dark:border-dark-border p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                            An unexpected error occurred while loading this page.
                            Please try again.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Try Again
                            </button>
                            <button
                                onClick={this.handleReload}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
