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

const addOrUpdateSchema = (schema) => {
    const id = 'structured-data-jsonld';
    let element = document.head.querySelector(`script[id="${id}"]`);

    if (!schema) {
        if (element) {
            element.remove();
        }
        return;
    }

    if (!element) {
        element = document.createElement('script');
        element.setAttribute('type', 'application/ld+json');
        element.setAttribute('id', id);
        document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(schema);
};

const SEO = ({ title, description, url, image, keywords, type = 'website', noindex = false, schema }) => {
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

        addOrUpdateSchema(schema);
    }, [title, description, url, image, keywords, type, noindex, schema]);

    return null;
};

export default SEO;
