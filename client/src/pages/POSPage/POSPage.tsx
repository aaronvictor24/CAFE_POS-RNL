import OrderCart from "../../components/pos/OrderCart";
import OrderReceiptModal from "../../components/pos/OrderReceiptModal";
import PaymentModal from "../../components/pos/PaymentModal";
import ProductList from "../../components/pos/ProductList";
import { usePOSCart } from "../../components/pos/usePOSCart";
import MainLayout from "../layout/MainLayout";

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

  const content = (
    <div className="row">
      <OrderReceiptModal
        show={showReceipt}
        onClose={() => setShowReceipt(false)}
        cart={lastOrder}
        total={lastTotal}
        message={message}
      />

      <PaymentModal
        show={showPayment}
        total={total}
        onConfirm={handlePaymentConfirm}
        onClose={() => setShowPayment(false)}
      />
      {/* Product List */}
      <div className="col-md-6 border-end">
        <ProductList products={products} onAddToCart={addToCart} />
      </div>

      {/* Order/Cart */}
      <div className="col-md-6">
        <OrderCart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          total={total}
        />
        <button
          className="btn btn-success mt-3"
          disabled={loading || cart.length === 0}
          onClick={() => setShowPayment(true)}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );

  return <MainLayout content={content} />;
};

export default POSPage;
