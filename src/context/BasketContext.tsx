import { createContext, useContext, useState, ReactNode } from "react";
import { Basket, BasketItem } from "../types/basket";

type ProviderProps = {
  children: ReactNode;
};

type BasketContextType = {
  basket: Basket;
  AddItem: (item: BasketItem) => void;
  RemoveItem: (item: BasketItem) => void;
  updateQuantity: (item: BasketItem) => void;
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
        updateQuantity({
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        });
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

  const updateQuantity = (item: BasketItem) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      items: prevBasket.items.map((i) =>
        i.productId === item.productId ? item : i
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
