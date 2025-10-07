import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Cart, CartItem } from "../interfaces/cart";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

type ProviderProps = {
  children: ReactNode;
};

type CartContextType = {
  cart: Cart;
  loading: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [loading, setLoading] = useState(true);

  // Helper: save cart to Firestore
  const saveCartToFirestore = async (updatedItems: CartItem[]) => {
    if (!auth.currentUser || !auth.currentUser.uid || !auth.currentUser.email)
      return;
    const userId = auth.currentUser.uid;
    const email = auth.currentUser.email;
    const userDocRef = doc(db, "users", userId);

    try {
      await setDoc(
        userDocRef,
        { email, cartItems: updatedItems },
        { merge: true }
      );
    } catch (error) {
      console.error("Failed to update cart in Firestore:", error);
    }
  };

  // Helper: save guest cart to localStorage
  const saveGuestCart = (updatedItems: CartItem[]) => {
    localStorage.setItem("guestCart", JSON.stringify(updatedItems));
  };

  // Merge guest cart with Firestore cart
  const mergeCarts = (guestItems: CartItem[], firestoreItems: CartItem[]) => {
    const merged: CartItem[] = [...firestoreItems];

    guestItems.forEach((guestItem) => {
      const existingIndex = merged.findIndex(
        (i) => i.productId === guestItem.productId
      );
      if (existingIndex > -1) {
        merged[existingIndex].quantity += guestItem.quantity;
      } else {
        merged.push(guestItem);
      }
    });

    return merged;
  };

  // Load cart on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const guestCartRaw = localStorage.getItem("guestCart");
      const guestCart: CartItem[] = guestCartRaw
        ? JSON.parse(guestCartRaw)
        : [];

      if (!user || !user.uid || !user.email) {
        // Guest user
        setCart({ items: guestCart });
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const firestoreCart: CartItem[] = data.cartItems || [];
          const mergedCart = mergeCarts(guestCart, firestoreCart);

          setCart({ items: mergedCart });
          await saveCartToFirestore(mergedCart);
          localStorage.removeItem("guestCart"); // Clear guest cart after merging
        } else {
          // First time login: save guest cart to Firestore
          setCart({ items: guestCart });
          await saveCartToFirestore(guestCart);
          localStorage.removeItem("guestCart");
        }
      } catch (error) {
        console.error("Failed to load cart from Firestore:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const addItem = (item: CartItem) => {
    let updatedItems = [...cart.items];
    const existingIndex = updatedItems.findIndex(
      (i) => i.productId === item.productId
    );

    if (existingIndex > -1) {
      updatedItems[existingIndex].quantity += 1;
    } else {
      updatedItems.push(item);
    }

    setCart({ items: updatedItems });

    if (auth.currentUser?.uid) saveCartToFirestore(updatedItems);
    else saveGuestCart(updatedItems);
  };

  const removeItem = (productId: number) => {
    const updatedItems = cart.items.filter((i) => i.productId !== productId);
    setCart({ items: updatedItems });

    if (auth.currentUser?.uid) saveCartToFirestore(updatedItems);
    else saveGuestCart(updatedItems);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const updatedItems = cart.items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    setCart({ items: updatedItems });

    if (auth.currentUser?.uid) saveCartToFirestore(updatedItems);
    else saveGuestCart(updatedItems);
  };

  const clearCart = () => {
    setCart({ items: [] });

    if (auth.currentUser?.uid) saveCartToFirestore([]);
    else saveGuestCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addItem, removeItem, updateQuantity, clearCart }}
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
