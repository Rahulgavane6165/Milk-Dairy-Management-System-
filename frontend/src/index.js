import './index.css'; // Import Tailwind CSS

import App from './App';
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for createRoot
import { RecoilRoot } from 'recoil';

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
