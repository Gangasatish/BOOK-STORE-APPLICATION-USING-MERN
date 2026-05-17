import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initGA } from './utils/analytics.js'

// Defer GA4 initialization so it doesn't block first paint
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(() => initGA());
} else {
  setTimeout(() => initGA(), 1);
}

// Remove static SEO content to prevent duplicate H1 tags and content once React hydrates
const seoContent = document.getElementById('seo-content');
if (seoContent) {
  seoContent.remove();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
