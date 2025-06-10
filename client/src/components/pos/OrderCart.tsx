import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import type { CartItem } from "../../interfaces/CartItem";

interface OrderCartProps {
  cart: CartItem[];
  onUpdateQuantity: (product_id: number, quantity: number) => void;
  onRemove: (product_id: number) => void;
  total: number;
  loadCart: () => Promise<CartItem[]>;
}

const OrderCart = ({
  cart,
  onUpdateQuantity,
  onRemove,
  total,
  loadCart,
}: OrderCartProps) => {


  const [state, setState] = useState<{
    loadingCart: boolean;
    cart: CartItem[];
  }>({
    loadingCart: true,
    cart: [],
  });

  const handleLoadCart = () => {
    setState((prev) => ({ ...prev, loadingCart: true }));
    loadCart()
      .then((cart) => {
        setState({ loadingCart: false, cart });
      })
      .catch(() => {
        setState({ loadingCart: false, cart: [] });
      });
  };

  useEffect(() => {
    handleLoadCart();
    // eslint-disable-next-line
  }, [cart]);


  return (
    <>
      <h4>Order</h4>
      {state.loadingCart ? (
        <Spinner />
      ) : state.cart.length === 0 ? (
        <p>No items in order.</p>
      ) : (
        <ul className="list-group mb-3">
          {state.cart.map((item) => (
            <li
              key={item.product_id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{item.product}</strong>
                <div className="d-inline ms-2">
                  <button
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() =>
                      onUpdateQuantity(item.product_id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    className="col-md-1 text-center"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item.product_id, Math.max(1, Number(e.target.value)))
                    }
                  />
                  <button
                    className="btn btn-sm btn-outline-secondary ms-1"
                    onClick={() =>
                      onUpdateQuantity(item.product_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </span>
              <span>
                ₱{(item.price * item.quantity).toFixed(2)}
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => onRemove(item.product_id)}
                >
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex flex-column align-items-end ">
        <h5>Total: ₱{total}</h5>
      </div>

    </>
  );
};

export default OrderCart;