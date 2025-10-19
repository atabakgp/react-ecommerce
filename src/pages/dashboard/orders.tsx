import React, { useEffect, useState } from "react";
import { getUserOrders } from "@/services/orders/ordersService";
import { auth } from "@/firebase/firebase";
import { useUser } from "@/context/UserContext";
import { Order } from "@/interfaces/orders";

const Orders: React.FC = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setOrders([]);
        setLoading(false);
        return;
      }
      try {
        const data = await getUserOrders(uid);
        setOrders(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.email]);

  if (loading)
    return <div className="container py-10 text-center">Loading orders...</div>;

  if (error)
    return (
      <div className="container py-10 text-center text-red-500">{error}</div>
    );

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-3">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wider">
                <th className="py-3 px-5 border-b">Order ID</th>
                <th className="py-3 px-5 border-b">Date</th>
                <th className="py-3 px-5 border-b">Items</th>
                <th className="py-3 px-5 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-5 border-b text-gray-800">{o.id}</td>
                  <td className="py-3 px-5 border-b text-gray-600">
                    {o.createdAt?.toDate
                      ? o.createdAt.toDate().toLocaleString()
                      : "-"}
                  </td>
                  <td className="py-3 px-5 border-b text-gray-700">
                    {o.items.map((it) => (
                      <div key={`${o.id}-${it.productId}`} className="text-sm">
                        {it.name} ×{it.quantity} —{" "}
                        <span className="text-gray-500">
                          ${Number(it.price * it.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-5 border-b text-right font-medium text-gray-900">
                    ${o.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
