import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SITE_URL = 'https://book-store-application-using-mern-seven.vercel.app';

const Breadcrumbs = ({ items }) => {
    useEffect(() => {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                item: item.path ? `${SITE_URL}${item.path}` : undefined,
            })),
        };

        const id = 'breadcrumb-jsonld';
        let el = document.head.querySelector(`script[id="${id}"]`);
        if (!el) {
            el = document.createElement('script');
            el.setAttribute('type', 'application/ld+json');
            el.setAttribute('id', id);
            document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(schema);

        return () => {
            const existing = document.head.querySelector(`script[id="${id}"]`);
            if (existing) existing.remove();
        };
    }, [items]);

    return (
        <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 items-center">
                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center gap-2">
                        {index > 0 && <span className="text-gray-400">/</span>}
                        {item.path ? (
                            <Link to={item.path} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
