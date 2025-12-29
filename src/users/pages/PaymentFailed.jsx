import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h1>

      <p className="text-gray-700 mb-6 text-center">
        Your payment was not completed.<br />
        Please try again or choose another course.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/user/courses",{ replace: true })}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Back to Courses
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
