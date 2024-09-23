// src/renderer.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
} else {
  console.error('Root element not found!');
}

console.log('👋 This message is being logged by "renderer.tsx", included via Vite');
