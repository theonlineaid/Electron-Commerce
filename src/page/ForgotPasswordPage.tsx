import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useRoute from "../hook/useRouter";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { clickRouteLink } = useRoute();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the password reset logic (e.g., sending reset link to email)
    console.log("Reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <Helmet>
        <title>Forgot Password</title>
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
          Forgot Your Password?
        </h2>

        {submitted ? (
          <div className="tw-text-center tw-text-gray-700">
            <p className="tw-mb-4">
              A password reset link has been sent to your email.
            </p>
            <Link
              to="/login"
              className="tw-text-blue-500 tw-underline tw-font-bold hover:tw-text-blue-600"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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
                required
                className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
              />
            </div>

            <div
              className="tw-mb-4"
              onClick={() => clickRouteLink("resetpassword")}
            >
              <button
                type="submit"
                className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-2 tw-rounded-lg tw-font-bold hover:tw-bg-blue-600 tw-transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}

        <p
          className="tw-text-center tw-text-gray-600 tw-text-sm"
          onClick={() => clickRouteLink("otp")}
        >
          Remembered your password? Verify OTP {""}
          <Link to="/login" className="tw-text-blue-500 tw-underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
