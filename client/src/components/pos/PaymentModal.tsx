import { useEffect, useState } from "react";

interface PaymentModalProps {
  show: boolean;
  total: number;
  onConfirm: (cash: number, change: number) => void;
  onClose: () => void;
}

const PaymentModal = ({
  show,
  total,
  onConfirm,
  onClose,
}: PaymentModalProps) => {
  const [cash, setCash] = useState<number | "">("");

  useEffect(() => {
    if (show) setCash("");
  }, [show]);

  const change = cash !== "" ? Number(cash) - total : 0;

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <label>Total: </label>
              <strong>₱{total}</strong>
            </div>
            <div className="mt-3">
              <label>Cash Received:</label>
              <input
                type="number"
                className="form-control"
                value={cash}
                min={total}
                onChange={(e) =>
                  setCash(e.target.value === "" ? "" : Number(e.target.value))
                }
                autoFocus
              />
            </div>
            <div className="mt-3">
              <label>Change:</label>
              <strong className="ms-2">₱{change >= 0 ? change : 0}</strong>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              disabled={cash === "" || change < 0}
              onClick={() => {
                if (cash !== "" && change >= 0) onConfirm(Number(cash), change);
              }}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
