import React from "react";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <div className="mb-5">
          <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-green-600 mb-2">
            Thank You!
          </h1>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Your order has been placed successfully.
          </h3>
          <p className="text-gray-500 mb-6">
            We appreciate your purchase. You will receive a confirmation email
            soon.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
