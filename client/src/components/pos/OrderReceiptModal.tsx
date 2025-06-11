import jsPDF from "jspdf";
import type { CartItem } from "../../interfaces/CartItem";
import AlertMessage from "../AlertMessage";
import html2canvas from "html2canvas";

interface OrderReceiptModalProps {
  show: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  message: string;
  orderNumber?: string | number;
  orderDate?: string;
  amountReceived?: number;
  change?: number;
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
  amountReceived = 0,
  change = 0,
  isSuccess = true,
  isVisible = true,
}: OrderReceiptModalProps) {
  if (!show) return null;

  const handlePrintPDF = async () => {
    const input = document.getElementById("receipt-content");
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("receipt.pdf");
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content" id="receipt-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Receipt</h5>
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
                  <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mb-2">
              <strong>Amount Payable:</strong> ₱{total.toFixed(2)}
              <br />
              <strong>Amount Received:</strong> ₱{amountReceived.toFixed(2)}
              <br />
              <strong>Change:</strong> ₱{change.toFixed(2)}
            </div>
            <div className="text-center mt-3">
              <img src="/public/feedback.png" alt="QR Code" width={96} height={96} />
              <div className="small text-muted mt-1">Scan for Feedback</div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handlePrintPDF}>
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