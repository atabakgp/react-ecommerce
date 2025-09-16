import React from "react";
import "./Cart.scss";
import { useBasket } from "@/context/BasketContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { basket, RemoveItem, updateQuantity, ClearBasket } = useBasket();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const item = basket.items.find((i) => i.productId === productId);
    if (item) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId: string) => {
    const item = basket.items.find((i) => i.productId === productId);
    if (item) {
      RemoveItem(item);
    }
  };

  const total = basket.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (basket.items.length === 0) {
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
      <button className="btn btn-danger mb-3" onClick={ClearBasket}>Clear Cart</button>
      <div className="cart-items">
        {basket.items.map((item) => (
          <div className="cart-item d-flex align-items-center mb-3 p-2 border rounded" key={item.productId}>
            <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover" }} className="me-3" />
            <div className="flex-grow-1">
              <div className="fw-bold">{item.name}</div>
              <div>${item.price} x </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                >
                  +
                </button>
                <span className="ms-2">= ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-outline-danger ms-3" onClick={() => handleRemove(item.productId)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total mt-4 fs-4 fw-bold">Total: ${total.toFixed(2)}</div>
      <button className="btn btn-success mt-3">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
