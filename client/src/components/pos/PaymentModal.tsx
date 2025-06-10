import { useEffect, useState } from "react";

interface PaymentModalProps {
  show: boolean;
  total: number;
  discountAmount: number;
  discountPercent: number;
  onConfirm: (info: {
    amountReceived: number;
    change: number;
    orderNumber: string | number;
    orderDate: string;
    paymentMethod: string;
  }) => void;
  onClose: () => void;
}

const paymentMethods = [
  { key: "cash", label: "Cash", icon: "💵" },
  { key: "gcash", label: "GCash", icon: "/new_gcash.png" }, // Use your own icon path
  { key: "paymaya", label: "PayMaya", icon: "/maya.png" }, // Use your own icon path
];

const PaymentModal = ({
  show,
  total,
  discountPercent,
  onConfirm,
  onClose,
}: PaymentModalProps) => {
  const [cash, setCash] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  useEffect(() => {
    if (show) {
      setCash("");
      setPaymentMethod("cash");
    }
  }, [show]);

  const change = cash !== "" ? Number(cash) - total : 0;
  const orderNumber = Date.now();
  const orderDate = new Date().toISOString();

  const discountAmountPayment = (total * discountPercent) / 100;
  if (!show) return null;

  return (
    <>

      <div className="modal show d-block" >
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header border-0">

              <div className="w-100 ">
                <h5
                  className="modal-title fw-bold px-4 py-2 rounded bg-dark text-white d-inline-block shadow-sm text-center w-100">
                  Payment
                </h5>
              </div>
              <button type="button" className="btn-close" onClick={onClose}>.</button>
            </div>
            {paymentMethod === "cash" && (
              <div className="justify-content-center row">
                <div className="px-5 py-5 bg-light col-md-4 mb-3 w-50">
                  <label >Amount Received:</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                    value={cash}
                    min={total}
                    onChange={(e) =>
                      setCash(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    autoFocus
                  />
                </div>
              </div>
            )}<div className="modal-body">
              <div className=" mb-3">
                <label>Total:</label>
                <strong className="ms-2">₱{total}</strong>
              </div>
              <div className="mb-3">
                <label>Discount ({discountPercent}%):</label>
                <strong className="ms-2 text-danger">-₱{discountAmountPayment.toFixed(2)}</strong>

              </div>
              <div className="mb-3">
                <label>Change:</label>
                <strong className="ms-2">₱{change >= 0 ? change : 0}</strong>
              </div>
              <div className="mb-3">
                <label className="form-label">Select Payment Method:</label>
                <div className="d-flex gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.key}
                      type="button"
                      className={`btn btn-outline-primary d-flex align-items-center flex-fill ${paymentMethod === method.key ? "active" : ""}`}

                      onClick={() => setPaymentMethod(method.key)}
                    >
                      {method.icon.startsWith("/") ? (
                        <img src={method.icon} alt={method.label} width={24} height={24} className="me-2" />
                      ) : (
                        <span className="me-2">{method.icon}</span>
                      )}
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>
              {(paymentMethod === "gcash" || paymentMethod === "paymaya") && (
                <div className="alert alert-info mt-3">
                  Please proceed to scan the QR code or use your e-wallet app to pay.
                </div>
              )}
            </div>
            <div className="modal-footer border-0">


              <button
                className="btn btn-primary w-100 py-2"
                disabled={
                  (paymentMethod === "cash" && (cash === "" || change < 0)) ||
                  (paymentMethod !== "cash" && false)
                }
                onClick={() => {
                  onConfirm({
                    amountReceived: paymentMethod === "cash" ? Number(cash) : total,
                    change: paymentMethod === "cash" ? change : 0,
                    orderNumber,
                    orderDate,
                    paymentMethod,
                  });
                }}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;