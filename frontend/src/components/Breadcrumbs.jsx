import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
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
