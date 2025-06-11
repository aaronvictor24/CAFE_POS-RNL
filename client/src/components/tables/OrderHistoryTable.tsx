import type { Order } from "../../interfaces/Order";

interface OrderHistoryTableProps {
  orders?: Order[];
  onSelectOrder?: (order: Order) => void;
}

const OrderHistoryTable = ({
  orders = [],
}: OrderHistoryTableProps) => (
  <table className="table table-bordered table-hover">
    <thead>
      <tr>
        <th>No.</th>
        <th>Date/Time</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {orders.length > 0 ? (
        [...orders].reverse().map((order, index) => (
          <tr key={order.order_id}>
            <td>{index + 1}</td>
            <td>{new Date(order.created_at).toLocaleString()}</td>
            <td>₱{order.total_amount}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="text-center">
            No orders found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default OrderHistoryTable;
