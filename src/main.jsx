import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SharedCodeProvider } from './Context/SharedCodeContext';  // Correct import

ReactDOM.createRoot(document.getElementById('root')).render(
  <SharedCodeProvider>  {/* Wrap App with the SharedCodeProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SharedCodeProvider>
);
