import { useEffect } from 'react';

const addOrUpdateMeta = (attrName, attrValue, content) => {
    let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

const addOrUpdateLink = (rel, href) => {
    let element = document.head.querySelector(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
};

const SEO = ({ title, description, url, image, keywords, type = 'website', noindex = false }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        if (description) {
            addOrUpdateMeta('name', 'description', description);
        }

        if (keywords) {
            addOrUpdateMeta('name', 'keywords', keywords);
        }

        addOrUpdateMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
        addOrUpdateMeta('property', 'og:type', type);

        if (title) {
            addOrUpdateMeta('property', 'og:title', title);
            addOrUpdateMeta('name', 'twitter:title', title);
        }

        if (description) {
            addOrUpdateMeta('property', 'og:description', description);
            addOrUpdateMeta('name', 'twitter:description', description);
        }

        if (url) {
            addOrUpdateMeta('property', 'og:url', url);
            addOrUpdateLink('canonical', url);
        }

        if (image) {
            addOrUpdateMeta('property', 'og:image', image);
            addOrUpdateMeta('name', 'twitter:image', image);
            addOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
        }
    }, [title, description, url, image, keywords, type, noindex]);

    return null;
};

export default SEO;
