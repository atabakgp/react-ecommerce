import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { CartItem } from "@/interfaces/cart";
import { CART_ERROR_CODES, CART_ERROR_MESSAGES } from "./cart.constants";

export const saveCartToFirestore = async (
  userId: string,
  email: string,
  updatedItems: CartItem[]
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      { email, cartItems: updatedItems },
      { merge: true }
    );
  } catch (error: any) {
    switch (error.code) {
      case CART_ERROR_CODES.PERMISSION_DENIED:
        throw new Error(CART_ERROR_MESSAGES.PERMISSION_DENIED);
      case CART_ERROR_CODES.UNAUTHENTICATED:
        throw new Error(CART_ERROR_MESSAGES.UNAUTHENTICATED);
      case CART_ERROR_CODES.NETWORK_ERROR:
        throw new Error(CART_ERROR_MESSAGES.NETWORK_ERROR);
      default:
        throw new Error(CART_ERROR_MESSAGES.DEFAULT_SAVE);
    }
  }
};

export const getCartFromFirestore = async (
  userId: string
): Promise<CartItem[]> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      throw { code: CART_ERROR_CODES.NOT_FOUND };
    }

    const data = docSnap.data();
    return (data.cartItems || []) as CartItem[];
  } catch (error: any) {
    switch (error.code) {
      case CART_ERROR_CODES.NOT_FOUND:
        throw new Error(CART_ERROR_MESSAGES.NOT_FOUND);
      case CART_ERROR_CODES.UNAUTHENTICATED:
        throw new Error(CART_ERROR_MESSAGES.UNAUTHENTICATED);
      case CART_ERROR_CODES.NETWORK_ERROR:
        throw new Error(CART_ERROR_MESSAGES.NETWORK_ERROR);
      default:
        throw new Error(CART_ERROR_MESSAGES.DEFAULT_LOAD);
    }
  }
};
