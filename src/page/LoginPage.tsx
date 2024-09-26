import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., form validation, authentication request)
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="tw-w-full tw-max-w-md tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
        {/* Logo */}
        <div className="tw-flex tw-justify-center tw-mb-6">
          <img
            src="https://i.ibb.co/DpK6Z0m/1673291260756.png"
            alt="Logo"
            className="tw-h-16 tw-object-contain"
          />
        </div>

        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-text-gray-700 tw-mb-8">
          Login to Your Account
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="tw-mb-4">
            <label
              htmlFor="email"
              className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
            />
          </div>

          <div className="tw-mb-4">
            <label
              htmlFor="password"
              className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
            >
              Password
            </label>
            <div className="tw-relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="tw-absolute tw-right-3 tw-top-3 tw-cursor-pointer tw-text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <p className="tw-text-right tw-text-gray-600 tw-text-sm tw-mb-4">
            <Link
              to="/forgotpassword"
              className="tw-text-blue-500 tw-underline"
            >
              Forgot your password?
            </Link>
          </p>

          <div className="tw-mb-4">
            <button
              type="submit"
              className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-2 tw-rounded-lg tw-font-bold hover:tw-bg-blue-600 tw-transition-colors"
            >
              Login
            </button>
          </div>
        </form>

        <p className="tw-text-center tw-text-gray-600 tw-text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="tw-text-blue-500 tw-underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
