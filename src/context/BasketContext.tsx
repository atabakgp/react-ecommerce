import { createContext, useContext, useState, ReactNode } from "react";
import { Basket, BasketItem } from "../types/basket";

type ProviderProps = {
  children: ReactNode;
};

type BasketContextType = {
  basket: Basket;
  AddItem: (item: BasketItem) => void;
  RemoveItem: (item: BasketItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  ClearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: ProviderProps) => {
  const [basket, setBasket] = useState<Basket>({ items: [] });

  const AddItem = (item: BasketItem) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.items.find(
        (i) => i.productId === item.productId
      );
      if (existingItem) {
        // Use updateQuantity to update the quantity
        updateQuantity(item.productId, item.quantity + 1);
        return prevBasket;
      } else {
        return {
          ...prevBasket,
          items: [...prevBasket.items, item],
        };
      }
    });
  };

  const RemoveItem = (item: BasketItem) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      items: prevBasket.items.filter((i) => i.productId !== item.productId),
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      items: prevBasket.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    }));
  };

  const ClearBasket = () => {
    setBasket({ items: [] });
  };

  return (
    <BasketContext.Provider
      value={{ basket, AddItem, RemoveItem, updateQuantity, ClearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used within BasketProvider");
  return context;
};
