import { createContext, useContext, useState, ReactNode } from "react";
import { Cart, CartItem } from "../types/cart";

type ProviderProps = {
  children: ReactNode;
};

type CartContextType = {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (i) => i.productId === item.productId
      );
      if (existingItem) {
        // Use updateQuantity to update the quantity
        updateQuantity(item.productId, item.quantity + 1);
        return prevCart;
      } else {
        return {
          ...prevCart,
          items: [...prevCart.items, item],
        };
      }
    });
  };

  const removeItem = (item: CartItem) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((i) => i.productId !== item.productId),
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    }));
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
