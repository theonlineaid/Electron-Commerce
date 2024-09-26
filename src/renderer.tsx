// src/renderer.tsx
import React, { ErrorInfo } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

// Lazy load pages for performance optimization
const App = React.lazy(() => import("./App"));
const RegisterPage = React.lazy(() => import("./page/RegistrationPage"));
const LoginPage = React.lazy(() => import("./page/LoginPage"));
const ForgotPasswordPage = React.lazy(
  () => import("./page/ForgotPasswordPage")
);
const OTPPage = React.lazy(() => import("./page/OTPPage"));
const ResetPasswordPage = React.lazy(() => import("./page/ResetPasswordPage"));
const NewPage = React.lazy(() => import("./page/NewPage"));
const SingleProduct = React.lazy(() => import("./page/SingleProduct"));
const CartPage = React.lazy(() => import("./page/CartPage"));
const CheckoutPage = React.lazy(() => import("./page/CheckoutPage"));

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  // Define initial state
  state: ErrorBoundaryState = { hasError: false };

  // Static method to update state when an error occurs
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  // Lifecycle method for catching errors
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </React.Suspense>
    ),
  },
  {
    path: "/forgotpassword",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordPage />
      </React.Suspense>
    ),
  },
  {
    path: "/resetpassword",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordPage />
      </React.Suspense>
    ),
  },

  {
    path: "/otp",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <OTPPage />
      </React.Suspense>
    ),
  },

  {
    path: "/register",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <RegisterPage />
      </React.Suspense>
    ),
  },
  {
    path: "/new",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <NewPage />
      </React.Suspense>
    ),
  },
  {
    path: `/product/:productId`,
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SingleProduct />
      </React.Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <CartPage />
      </React.Suspense>
    ),
  },

  {
    path: "/checkout",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <CheckoutPage />
      </React.Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <div>
        <Helmet>
          <title>Page not found</title>
        </Helmet>
        <h1>Page not found</h1>
        <p>Sorry, but the page you are looking for does not exist.</p>
        <Link to="/">Go back</Link>
      </div>
    ),
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <Provider store={store}>
            <PersistGate
              loading={<div>Loading persisted state...</div>}
              persistor={persistor}
            >
              <RouterProvider router={router} />
            </PersistGate>
          </Provider>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
} else {
  console.error("Root element not found!");
}
