import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Bungkus seluruh aplikasi dengan Router di sini, hanya di index.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>  {/* Router hanya di sini */}
    <App />
  </Router>
);
