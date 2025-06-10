import { useState } from "react";
import OrderCart from "../../components/pos/OrderCart";
import OrderReceiptModal from "../../components/pos/OrderReceiptModal";
import PaymentModal from "../../components/pos/PaymentModal";
import ProductList from "../../components/pos/ProductList";
import { usePOSCart } from "../../components/pos/usePOSCart";
import MainLayout from "../layout/MainLayout";
import DiscountModal from "../../components/modals/DiscountModal";

const POSPage = () => {
  const {
    products,
    cart,
    loading,
    message,
    showReceipt,
    setShowReceipt,
    lastOrder,
    lastTotal,
    showPayment,
    setShowPayment,
    addToCart,
    updateQuantity,
    removeFromCart,
    total,
    handlePaymentConfirm,
  } = usePOSCart();

  const [orderNumber, setOrderNumber] = useState<string | number>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const discountAmount = (total * discountPercent) / 100;
  const totalAfterDiscount = total - discountAmount;




  const handlePaymentConfirmWrapper = ({
    amountReceived,
    change,
    orderNumber,
    orderDate,
  }: {
    amountReceived: number;
    change: number;
    orderNumber: string | number;
    orderDate?: string;
  }) => {
    setAmountReceived(amountReceived);
    setChange(change);
    setOrderNumber(orderNumber);
    setOrderDate(orderDate || new Date().toISOString());
    handlePaymentConfirm({
      amountReceived,
      change,
      orderNumber,
      orderDate,
    });
    setDiscountPercent(0); // Reset discount after transaction
  };

  const content = (
    <div className="row">
      <OrderReceiptModal
        show={showReceipt}
        onClose={() => setShowReceipt(false)}
        cart={lastOrder}
        total={lastTotal}
        message={message}
        orderNumber={orderNumber}
        orderDate={orderDate}
        amountReceived={amountReceived}
        change={change}
        isSuccess={true}
        isVisible={true}
      />

      <PaymentModal
        show={showPayment}
        total={totalAfterDiscount}
        onConfirm={handlePaymentConfirmWrapper}
        discountPercent={discountPercent}
        discountAmount={discountAmount}
        onClose={() => setShowPayment(false)}
      />

      <DiscountModal
        showModal={showDiscountModal}
        currentDiscount={discountPercent}
        onSave={(discount) => {
          setDiscountPercent(discount);
          setShowDiscountModal(false);
        }}
        onClose={() => setShowDiscountModal(false)}
      />

      <div className="col-md-6 border-end">
        <ProductList loadProducts={() => Promise.resolve(products)} onAddToCart={addToCart} />
      </div>

      <div className="col-md-6">
        <OrderCart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          total={total}
          loadCart={() => Promise.resolve(cart)}
        />

        <div className="d-flex flex-column align-items-end mt-auto">
          <button className="btn btn-link d-block w-60 -mb-3 me-3" onClick={() => setShowDiscountModal(true)}>
            Set Discount
          </button>
          <span className="fw-bold">Discount ({discountPercent}%):</span>
          <button
            className="btn btn-success btn-lg d-block w-60 mb-3 me-3"
            disabled={loading || cart.length === 0}
            onClick={() => setShowPayment(true)}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );

  return <MainLayout content={content} />;
};

export default POSPage;