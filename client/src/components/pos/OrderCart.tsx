import type { FC } from "react";

interface CartItem {
  product_id: number;
  product: string;
  price: number;
  quantity: number;
}

interface OrderCartProps {
  cart: CartItem[];
  onUpdateQuantity: (product_id: number, quantity: number) => void;
  onRemove: (product_id: number) => void;
  total: number;
}

const OrderCart: FC<OrderCartProps> = ({
  cart,
  onUpdateQuantity,
  onRemove,
  total,
}) => (
  <div>
    <h4>Order</h4>
    {cart.length === 0 ? (
      <p>No items in order.</p>
    ) : (
      <ul className="list-group mb-3">
        {cart.map((item) => (
          <li
            key={item.product_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {item.product} x{" "}
              <input
                type="number"
                min={1}
                value={item.quantity}
                style={{ width: 50 }}
                onChange={(e) =>
                  onUpdateQuantity(item.product_id, Number(e.target.value))
                }
              />
            </span>
            <span>
              ₱{item.price * item.quantity}
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
    <h5>Total: ₱{total}</h5>
  </div>
);

export default OrderCart;
