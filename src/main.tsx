import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Polyfill adjustment for environments where 'fetch' might be read-only but a library attempts to re-assign it.
if (typeof window !== 'undefined') {
  try {
    // Some libraries (like @google/genai) check for fetch and might try to polyfill it.
    // If it's already there as a getter, direct assignment fails.
    if (!('fetch' in globalThis)) {
      (globalThis as any).fetch = window.fetch.bind(window);
    }
  } catch (e) {
    console.warn('Fetch polyfill check failed:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
