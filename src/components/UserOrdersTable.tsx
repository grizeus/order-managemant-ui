import { useEffect, useState } from "react";
import Loader from "./Loader";
import { orderApi } from "../api/orderApi";
import type { Order } from "../types";

interface UserOrdersTableProps {
  refreshTrigger?: boolean;
  userId: string;
}

export const UserOrdersTable = ({
  refreshTrigger,
  userId,
}: UserOrdersTableProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await orderApi.getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load orders. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId, refreshTrigger]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mt-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-ivory mt-4 text-center">
        No orders found. Create your first order!
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="border-sand overflow-x-auto rounded-lg border-2">
        <table className="bg-ivory min-w-full rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-tarnished px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Order ID
              </th>
              <th className="text-tarnished px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Product ID
              </th>
              <th className="text-tarnished px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Quantity
              </th>
              <th className="text-tarnished px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Total Price
              </th>
              <th className="text-tarnished px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="text-ebony px-6 py-4 text-sm whitespace-nowrap">
                  {order.id.substring(0, 8)}...
                </td>
                <td className="text-ebony px-6 py-4 text-sm whitespace-nowrap">
                  {order.product.id.substring(0, 8)}...
                </td>
                <td className="text-ebony px-6 py-4 text-sm whitespace-nowrap">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-ebony">{order.totalPrice}</span>
                </td>
                <td className="text-ebony px-6 py-4 text-sm whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
