import { useState, useEffect, useRef } from 'react';

const DeferredRender = ({ children, minHeight = '50vh' }) => {
    const [shouldRender, setShouldRender] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // Use IntersectionObserver to render when it comes near the viewport
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Start rendering 200px before it comes into view
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Fallback: also render when the main thread is idle
        let fallbackTimer;
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(() => {
                if (!shouldRender) setShouldRender(true);
            }, { timeout: 2000 });
        } else {
            fallbackTimer = setTimeout(() => {
                if (!shouldRender) setShouldRender(true);
            }, 500);
        }

        return () => {
            observer.disconnect();
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };
    }, [shouldRender]);

    if (shouldRender) {
        return children;
    }

    // Return a placeholder with the approximate height to prevent scrollbar jumping
    return <div ref={containerRef} style={{ minHeight }} className="w-full" aria-hidden="true" />;
};

export default DeferredRender;
