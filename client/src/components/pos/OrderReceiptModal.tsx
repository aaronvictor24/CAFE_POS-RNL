import type { CartItem } from "../../interfaces/CartItem";
import AlertMessage from "../AlertMessage";

interface OrderReceiptModalProps {
  show: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  message: string;
  orderNumber?: string | number;
  orderDate?: string;
  isSuccess?: boolean;
  isVisible?: boolean;
}

function OrderReceiptModal({
  show,
  onClose,
  cart,
  total,
  message,
  orderNumber,
  orderDate,
  isSuccess = true,
  isVisible = true,
}: OrderReceiptModalProps) {
  if (!show) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content" id="receipt-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Receipt</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <AlertMessage
              message={message}
              isSuccess={isSuccess}
              isVisible={isVisible}
              onClose={onClose}
              autoHide={false}
            />
            <div>
              <strong>Order No:</strong> {orderNumber || "N/A"}
              <br />
              <strong>Date/Time:</strong>{" "}
              {orderDate
                ? new Date(orderDate).toLocaleString()
                : new Date().toLocaleString()}
            </div>
            <ul className="list-group mb-3 mt-2">
              {cart.map((item) => (
                <li
                  key={item.product_id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {item.product} x {item.quantity}
                  </span>
                  <span>₱{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <h5>Total: ₱{total}</h5>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handlePrint}>
              Print
            </button>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderReceiptModal;
