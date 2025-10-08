import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export interface OrderItem {
  productId: number | string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shipping: {
    name: string;
    email: string;
    address: string;
  };
  createdAt?: any;
}

export async function saveUserOrder(userId: string, order: Omit<Order, "userId" | "createdAt">): Promise<void> {
  const ordersRef = collection(db, "users", userId, "orders");
  await addDoc(ordersRef, {
    ...order,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const ordersRef = collection(db, "users", userId, "orders");
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Order) }));
}


