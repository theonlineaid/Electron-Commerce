// src/renderer.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import NewPage from './page/NewPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/new",
    element: <NewPage />,
  },

  {
    path: "*",
    element: <div>
      <h1>Page not found</h1>
      <p>Sorry, but the page you are looking for does not exist.</p>
      <Link to="/">Go back</Link>
    </div>,
  }
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
} else {
  console.error('Root element not found!');
}

console.log('👋 This message is being logged by "renderer.tsx", included via Vite');
