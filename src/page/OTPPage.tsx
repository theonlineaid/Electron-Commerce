import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import useRoute from "../hook/useRouter";

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes in seconds (120 seconds)
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { clickRouteLink } = useRoute();

  // Generate OTP on page load
  useEffect(() => {
    generateOtp();
  }, []);

  // Timer logic for counting down
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  // Generate a random 6-digit OTP
  const generateOtp = () => {
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(otpValue);
    console.log("Generated OTP:", otpValue); // For development/testing, remove in production
  };

  // Handle OTP submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the OTP matches and if time has not run out
    if (otp !== generatedOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    if (timer === 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <Helmet>
        <title>OTP Validation</title>
      </Helmet>
      <div className="tw-w-full tw-max-w-md tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-text-gray-700 tw-mb-8">
          Enter OTP
        </h2>

        {submitted ? (
          <div className="tw-text-center tw-text-gray-700">
            <p className="tw-mb-4">OTP verified successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="tw-mb-4">
              <label
                htmlFor="otp"
                className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
              >
                Enter the 6-digit OTP sent to your phone/email
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                pattern="[0-9]*" // Ensures only numbers are entered
                required
                className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
              />
            </div>

            {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}

            <div className="tw-mb-4">
              <button
                onClick={() => clickRouteLink("login")}
                type="submit"
                className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-2 tw-rounded-lg tw-font-bold hover:tw-bg-blue-600 tw-transition-colors"
              >
                Verify OTP
              </button>
            </div>

            <p className="tw-text-center tw-text-gray-700">
              Time remaining: {Math.floor(timer / 60)}:
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </p>
          </form>
        )}

        {timer === 0 && !submitted && (
          <div className="tw-text-center tw-mt-4">
            <p className="tw-text-red-500">Your OTP has expired.</p>
            <button
              onClick={generateOtp}
              className="tw-mt-4 tw-bg-gray-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-gray-600"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
