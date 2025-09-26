import React from "react";
import "./Cart.scss";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Cart, CartItem } from "@/interfaces/cart";

const CartPage = () => {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    const item = cart.items.find((i: CartItem) => i.productId === productId);
    if (item) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId: number) => {
    removeItem(productId);
  };

  const total = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  if (cart.items.length === 0) {
    return (
      <div className="cart container py-4">
        <h2>Your cart is empty</h2>
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart container py-4">
      <h2>Your Cart</h2>
      <button className="btn btn-danger mb-3" onClick={clearCart}>
        Clear Cart
      </button>
      <div className="cart-items">
        {cart.items.map((item: CartItem) => (
          <div
            className="cart-item d-flex align-items-center mb-3 p-2 border rounded"
            key={item.productId}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 80, height: 80, objectFit: "cover" }}
              className="me-3"
            />
            <div className="flex-grow-1">
              <div className="fw-bold">{item.name}</div>
              <div>${item.price} x </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity + 1)
                  }
                >
                  +
                </button>
                <span className="ms-2">
                  = ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className="btn btn-outline-danger ms-3"
              onClick={() => handleRemove(item.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total mt-4 fs-4 fw-bold">
        Total: ${total.toFixed(2)}
      </div>
      <button className="btn btn-success mt-3">Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
