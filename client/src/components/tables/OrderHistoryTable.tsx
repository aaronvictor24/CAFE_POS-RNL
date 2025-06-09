import type { Order } from "../../interfaces/Order";

interface OrderHistoryTableProps {
  orders?: Order[];
  onSelectOrder?: (order: Order) => void;
}

const OrderHistoryTable = ({
  orders = [],
  onSelectOrder,
}: OrderHistoryTableProps) => (
  <table className="table table-bordered table-hover">
    <thead>
      <tr>
        <th>No.</th>
        <th>Date/Time</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {orders.length > 0 ? (
        [...orders].reverse().map((order, index) => (
          <tr key={order.order_id}>
            <td>{index + 1}</td>
            <td>{new Date(order.created_at).toLocaleString()}</td>
            <td>₱{order.total_amount}</td>
            <td>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onSelectOrder && onSelectOrder(order)}
              >
                View
              </button>
            </td>
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
