import { useEffect, useState } from "react";
import OrderHistoryTable from "../../components/tables/OrderHistoryTable";
import MainLayout from "../layout/MainLayout";
import OrderService from "../../services/OrderService";
import type { Order } from "../../interfaces/Order";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.loadOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const content = (
    <div className="container py-4">
      <h1 className="text-center mb-4">Order History</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <OrderHistoryTable
          orders={orders}
          onSelectOrder={(order) => {
            // Handle order selection here
            console.log("Selected order:", order);
          }}
        />
      )}
    </div>
  );

  return <MainLayout content={content} />;
};

export default OrderHistory;
