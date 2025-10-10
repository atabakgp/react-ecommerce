import React from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "@/interfaces/cart";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  const proceedToCheckout = () => navigate("/checkout");

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };

  const total = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Your Cart</h2>
        <button
          onClick={clearCart}
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.items.map((item: CartItem) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-700 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <div className="text-xl font-semibold mb-4">
          Total: ${total.toFixed(2)}
        </div>
        <button
          onClick={proceedToCheckout}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
