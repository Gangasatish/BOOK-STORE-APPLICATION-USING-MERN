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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
