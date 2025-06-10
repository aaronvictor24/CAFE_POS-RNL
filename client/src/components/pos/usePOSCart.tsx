import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import OrderService from "../../services/OrderService";
import IngredientService from "../../services/IngredientService";
import ErrorHandler from "../../handler/ErrorHandler";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../interfaces/CartItem";
import type { Products } from "../../interfaces/Product";

export function usePOSCart() {
  const [products, setProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);
  const [lastTotal, setLastTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      ProductService.loadProducts()
        .then((res) => setProducts(res.data.products))
        .catch(() => setProducts([])),
      IngredientService.loadIngredients()
        .then((res) => setIngredients(res.data.ingredients))
        .catch(() => setIngredients([])),
    ]);
  }, []);

  const addToCart = (product: Products) => {
    let canMake = true;
    if (product.ingredients && product.ingredients.length > 0) {
      canMake = product.ingredients.every(reqIng => {
        const stockIng = ingredients.find(i => i.ingredient_id === reqIng.ingredient_id);
        return stockIng && stockIng.quantity_in_stock > 0;
      });
    }

    setCart((prev) => {
      const existing = prev.find(item => item.product_id === product.product_id);
      if (existing) {
        return prev.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          can_make: canMake,
        },
      ];
    });
  };

  const updateQuantity = (product_id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (product_id: number) => {
    setCart((prev) => prev.filter((item) => item.product_id !== product_id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaymentConfirm = ({
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
    setShowPayment(false);
    setLoading(true);
    setMessage("");
    OrderService.storeOrder({
      employee_id: 1,
      total_amount: total,
      items: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      cash_received: amountReceived,
      change: change,
      order_number: orderNumber,
      order_date: orderDate || new Date().toISOString(),
    })
      .then((res) => {
        setMessage(res.data.message || "Order placed!");
        setLastOrder(cart);
        setLastTotal(total);
        setCart([]);
        setShowReceipt(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setMessage(
            error.response.data.message || "Order failed. Please try again."
          );
        } else {
          ErrorHandler(error, navigate);
        }
      })
      .finally(() => setLoading(false));
  };

  return {
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
    setMessage,
    ingredients,
  };
}