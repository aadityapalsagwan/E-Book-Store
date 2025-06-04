import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // tailwind or global styles
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
