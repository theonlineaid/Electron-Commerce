import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate that the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Proceed with the reset password logic (e.g., API call)
    console.log("Password reset to:", password);
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="tw-w-full tw-max-w-md tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
        {/* Logo */}
        <div className="tw-flex tw-justify-center tw-mb-6">
          <Link to={"/"}>
            <img
              src="https://i.ibb.co/DpK6Z0m/1673291260756.png"
              alt="Logo"
              className="tw-h-16 tw-object-contain"
            />
          </Link>
        </div>

        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-text-gray-700 tw-mb-8">
          Reset Your Password
        </h2>

        {submitted ? (
          <div className="tw-text-center tw-text-gray-700">
            <p className="tw-mb-4">
              Your password has been reset successfully.
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
                htmlFor="password"
                className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
              >
                New Password
              </label>
              <div className="tw-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="tw-absolute tw-right-2 tw-top-2 tw-text-gray-500 hover:tw-text-gray-700"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="tw-mb-4">
              <label
                htmlFor="confirmPassword"
                className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
              >
                Confirm New Password
              </label>
              <div className="tw-relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="tw-absolute tw-right-2 tw-top-2 tw-text-gray-500 hover:tw-text-gray-700"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}

            <div className="tw-mb-4">
              <button
                type="submit"
                className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-2 tw-rounded-lg tw-font-bold hover:tw-bg-blue-600 tw-transition-colors"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
