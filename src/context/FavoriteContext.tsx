import { IProduct } from "@/interfaces/products";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

type ProviderProps = {
  children: ReactNode;
};

type FavoriteContextType = {
  toggleFavorite: (productId: number) => void;
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: ProviderProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Fetch favorite IDs from Firestore on load
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth.currentUser) return;
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const ids: number[] = userSnap.data().favoriteIds || [];
        setFavoriteIds(ids);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFavoriteIds([]);
        return;
      }
      fetchFavorites();
    });
    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (productId: number) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userId);
    try {
      if (favoriteIds.includes(productId)) {
        setFavoriteIds(() => {
          return favoriteIds.filter((id) => id != productId);
        });
        await setDoc(
          userDocRef,
          { favoriteIds: arrayRemove(productId) },
          { merge: true }
        );
      } else {
        setFavoriteIds([...favoriteIds, productId]);
        await setDoc(
          userDocRef,
          { favoriteIds: arrayUnion(productId) },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Failed to update favorites in Firestore:", error);
    }
  };
  const isFavorite = (productId: number) => {
    return favoriteIds.some((id) => id == productId);
  };

  return (
    <FavoriteContext.Provider
      value={{ isFavorite, favoriteIds, toggleFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoriteProvider");
  return context;
};
