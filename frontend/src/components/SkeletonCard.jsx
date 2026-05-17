const SkeletonCard = () => {
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
            <div className="relative aspect-3/4 bg-gray-200 dark:bg-gray-700 w-full overflow-hidden">
                <div className="shimmer-overlay" />
            </div>
            <div className="p-4 flex flex-col gap-3">
                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 w-1/3 rounded overflow-hidden">
                    <div className="shimmer-overlay" />
                </div>
                <div className="relative h-5 bg-gray-200 dark:bg-gray-700 w-3/4 rounded overflow-hidden">
                    <div className="shimmer-overlay" />
                </div>
                <div className="relative h-4 bg-gray-200 dark:bg-gray-700 w-1/2 rounded overflow-hidden">
                    <div className="shimmer-overlay" />
                </div>
                <div className="relative mt-2 h-4 bg-gray-200 dark:bg-gray-700 w-1/4 rounded overflow-hidden">
                    <div className="shimmer-overlay" />
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
                    <div className="relative h-6 bg-gray-200 dark:bg-gray-700 w-1/4 rounded overflow-hidden">
                        <div className="shimmer-overlay" />
                    </div>
                    <div className="relative h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="shimmer-overlay" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
