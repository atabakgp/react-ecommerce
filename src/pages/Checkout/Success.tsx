import React from "react";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="p-5 bg-light rounded shadow-sm">
            <h1 className="mb-4 text-success">Thank You!</h1>
            <h3 className="mb-3">Your order has been placed successfully.</h3>
            <p className="mb-4">We appreciate your purchase. You will receive a confirmation email soon.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
