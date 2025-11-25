import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Add BrowserRouter for routing support
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
