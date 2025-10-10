import React from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Checkout.scss";
import { useUser } from "@/context/UserContext";
import { saveUserOrder } from "@/services/orders/ordersService";
import { auth } from "@/firebase/firebase";

interface FormData {
  name: string;
  email: string;
  address: string;
}

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const onSubmit = async (data: FormData) => {
    // Build order payload
    const orderItems = cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = {
      items: orderItems,
      totalAmount,
      shipping: {
        name: data.name,
        email: data.email,
        address: data.address,
      },
    };

    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        await saveUserOrder(uid, order);
      }
    } catch (e) {
      console.error("Failed to save order:", e);
    } finally {
      clearCart();
      reset();
      navigate("/checkout/success");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-7 mb-4">
          <h1 className="mb-4">Checkout</h1>
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`form-control${errors.name ? " is-invalid" : ""}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`form-control${errors.email ? " is-invalid" : ""}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
                className={`form-control${errors.address ? " is-invalid" : ""}`}
                placeholder="Enter your address"
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
              )}
            </div>
            <div className="place-order text-center">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={cart.items.length === 0}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-5">
          <div className="cart-summary p-4 bg-light rounded shadow-sm">
            <h2>Your Cart</h2>
            {cart.items.length === 0 ? (
              <p>
                Your cart is empty. <Link to="/products">Shop now</Link>
              </p>
            ) : (
              <ul className="list-group mb-3">
                {cart.items.map((item) => (
                  <li
                    key={item.productId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span className="fw-bold">{item.name}</span>{" "}
                      <span className="text-muted">x{item.quantity}</span>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="total-amount mt-4">
              <h3>Total: ${totalAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
