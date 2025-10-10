import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { CartItem } from "@/interfaces/cart";

export const saveCartToFirestore = async (
  userId: string,
  email: string,
  updatedItems: CartItem[]
) => {
  const userDocRef = doc(db, "users", userId);
  await setDoc(
    userDocRef,
    { email, cartItems: updatedItems },
    { merge: true }
  );
};

export const getCartFromFirestore = async (
  userId: string
): Promise<CartItem[]> => {
  const userDocRef = doc(db, "users", userId);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) return [];
  const data = docSnap.data();
  return (data.cartItems || []) as CartItem[];
};


