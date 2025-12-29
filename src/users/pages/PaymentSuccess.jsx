import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPaymentAPI } from "../../services/allAPI";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      confirmPayment(sessionId);
    }
  }, []);

  const confirmPayment = async (sessionId) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      await confirmPaymentAPI(
        { session_id: sessionId },
        reqHeader
      );

      //  redirect AFTER confirmation
      navigate("/user/my-courses",{ replace: true });

    } catch (err) {
      console.error(err);
      navigate("/user/payment-cancel",{ replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-semibold text-green-600">
        Processing your payment...
      </h2>
    </div>
  );
};

export default PaymentSuccess;
