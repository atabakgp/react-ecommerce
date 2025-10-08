import React, { useEffect, useState } from "react";
import { getUserOrders, Order } from "@/services/ordersService";
import { auth } from "@/firebase/firebase";
import { useUser } from "@/context/UserContext";

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

  if (loading) return <div className="container py-4">Loading orders...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.createdAt?.toDate ? o.createdAt.toDate().toLocaleString() : "-"}</td>
                  <td>
                    {o.items.map((it) => (
                      <div key={`${o.id}-${it.productId}`}>
                        {it.name} x{it.quantity} (${(it.price * it.quantity).toFixed(2)})
                      </div>
                    ))}
                  </td>
                  <td>${o.totalAmount.toFixed(2)}</td>
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


