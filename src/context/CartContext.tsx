import { createContext, useContext, useState, ReactNode } from "react";
import { Cart, CartItem } from "../interfaces/cart";

type ProviderProps = {
  children: ReactNode;
};

type CartContextType = {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (removedItemId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addItem = (item: CartItem) => {
    const existingItem = cart.items.find(
      (i: CartItem) => i.productId === item.productId
    );
    if (existingItem) {
      updateQuantity(item.productId, existingItem.quantity + 1);
    } else {
      setCart({
        items: [...cart.items, item],
      });
    }
  };

  const removeItem = (removedItemId: number) => {
    setCart({
      items: cart.items.filter((item: CartItem) => {
        return item.productId != removedItemId;
      }),
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart({
      items: cart.items.map((i: CartItem) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    });
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
