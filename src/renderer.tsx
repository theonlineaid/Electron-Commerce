// src/renderer.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import NewPage from './page/NewPage';
import { Provider } from 'react-redux';
import store from './store/store';

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
      <Helmet>
        <title>Page not found</title>
      </Helmet>
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
      <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
      </HelmetProvider>
    </ThemeProvider>
  );
} else {
  console.error('Root element not found!');
}

console.log('👋 This message is being logged by "renderer.tsx", included via Vite');
