// src/pages/RegistrationPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Simple password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // await axios.post('/api/register', {
      //     name,
      //     email,
      //     phone,
      //     password,
      // });
      // Redirect to login or confirmation page after successful registration
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-gray-100">
      <div className="tw-w-full tw-max-w-md tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
        <div className="tw-flex tw-justify-center tw-mb-6">
          <Link to={"/"}>
            <img
              src="https://i.ibb.co/DpK6Z0m/1673291260756.png"
              alt="Logo"
              className="tw-w-20"
            />
          </Link>
        </div>
        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">
          Create an Account
        </h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="tw-space-y-4">
          <div>
            <label
              htmlFor="name"
              className="tw-block tw-mb-1 tw-font-medium tw-text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="tw-border tw-border-gray-300 tw-p-2 tw-w-full tw-rounded"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="tw-block tw-mb-1 tw-font-medium tw-text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="tw-border tw-border-gray-300 tw-p-2 tw-w-full tw-rounded"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="tw-block tw-mb-1 tw-font-medium tw-text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="tw-border tw-border-gray-300 tw-p-2 tw-w-full tw-rounded"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="tw-block tw-mb-1 tw-font-medium tw-text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="tw-border tw-border-gray-300 tw-p-2 tw-w-full tw-rounded"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="tw-block tw-mb-1 tw-font-medium tw-text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="tw-border tw-border-gray-300 tw-p-2 tw-w-full tw-rounded"
            />
          </div>
          <button
            type="submit"
            className={`tw-bg-blue-500 tw-text-white tw-w-full tw-py-2 tw-rounded tw-font-medium hover:tw-bg-blue-600 ${
              loading ? "tw-opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="tw-text-center tw-mt-4">
          Already have an account?{" "}
          <Link to="/login" className="tw-text-blue-500 tw-underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
