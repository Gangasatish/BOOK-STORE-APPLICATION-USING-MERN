import ReactGA from 'react-ga4';

// GA4 Measurement ID - Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-PN3JDQBXHL';

// Initialize Google Analytics 4
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gtagOptions: {
      debug_mode: process.env.NODE_ENV === 'development'
    }
  });
};

// Track page views
export const trackPageView = (page) => {
  ReactGA.send({
    hitType: 'pageview',
    page: page
  });
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  ReactGA.event({
    action: action,
    category: category,
    label: label,
    value: value
  });
};

// Track user engagement
export const trackEngagement = (action, value) => {
  ReactGA.event({
    action: action,
    category: 'engagement',
    value: value
  });
};

// Track e-commerce events
export const trackPurchase = (transactionId, value, currency = 'USD') => {
  ReactGA.event('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency
  });
};

export const trackAddToCart = (itemId, itemName, price, quantity = 1) => {
  ReactGA.event('add_to_cart', {
    item_id: itemId,
    item_name: itemName,
    price: price,
    quantity: quantity
  });
};

export const trackViewItem = (itemId, itemName, price) => {
  ReactGA.event('view_item', {
    item_id: itemId,
    item_name: itemName,
    price: price
  });
};

// Track search
export const trackSearch = (searchTerm) => {
  ReactGA.event('search', {
    search_term: searchTerm
  });
};

// Track user interactions
export const trackButtonClick = (buttonName, page) => {
  ReactGA.event('click', {
    button_name: buttonName,
    page: page
  });
};

export const trackFormSubmit = (formName, page) => {
  ReactGA.event('form_submit', {
    form_name: formName,
    page: page
  });
};

export default ReactGA;