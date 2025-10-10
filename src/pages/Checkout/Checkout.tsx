import React from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { saveUserOrder } from "@/services/orders/ordersService";
import { auth } from "@/firebase/firebase";

interface FormData {
  name: string;
  email: string;
  address: string;
}

const Checkout: React.FC = () => {
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
    const orderItems = cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = {
      items: orderItems,
      totalAmount,
      shipping: data,
    };

    try {
      const uid = auth.currentUser?.uid;
      if (uid) await saveUserOrder(uid, order);
    } catch (e) {
      console.error("Failed to save order:", e);
    } finally {
      clearCart();
      reset();
      navigate("/checkout/success");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - Shipping Form */}
        <div>
          <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
          <h2 className="text-xl font-medium mb-4 text-gray-700">
            Shipping Details
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
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
                className={`w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
                className={`w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your address"
              />
              {errors.address && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={cart.items.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Right - Cart Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.items.length === 0 ? (
            <p>
              Your cart is empty.{" "}
              <Link to="/products" className="text-blue-600 hover:underline">
                Shop now
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 mb-4">
              {cart.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between py-2 text-gray-700"
                >
                  <span>
                    {item.name}{" "}
                    <span className="text-gray-500">x{item.quantity}</span>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="text-lg font-semibold text-gray-900">
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
