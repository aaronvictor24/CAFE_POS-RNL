import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import OrderService from "../../services/OrderService";
import IngredientService from "../../services/IngredientService";
import ErrorHandler from "../../handler/ErrorHandler";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../interfaces/CartItem";

export function usePOSCart() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);
  const [lastTotal, setLastTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true); // <-- NEW
  const navigate = useNavigate();

  useEffect(() => {
    setDataLoading(true);
    Promise.all([
      ProductService.loadProducts()
        .then((res) => setProducts(res.data.products))
        .catch(() => setProducts([])),
      IngredientService.loadIngredients()
        .then((res) => setIngredients(res.data.ingredients))
        .catch(() => setIngredients([])),
    ]).finally(() => setDataLoading(false));
  }, []);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const found = prev.find((item) => item.product_id === product.product_id);
      if (found) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: product.product_id,
          product: product.product,
          price: product.price,
          quantity: 1,
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

  const handleCheckout = () => {
    if (cart.length === 0) return;
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
    })
      .then((res) => {
        setMessage(res.data.message || "Order placed!");
        setLastOrder(cart);
        setLastTotal(total);
        setCart([]);
        setShowReceipt(true);
      })
      .catch((error) => {
        setMessage(
          error.response?.data?.message || "Order failed. Please try again."
        );
      })
      .finally(() => setLoading(false));
  };

  const handlePaymentConfirm = (cash: number, change: number) => {
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
      cash_received: cash,
      change: change,
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
    products: products ?? [],
    cart: cart ?? [],
    loading,
    message,
    showReceipt,
    setShowReceipt,
    lastOrder: lastOrder ?? [],
    lastTotal,
    showPayment,
    setShowPayment,
    addToCart,
    updateQuantity,
    removeFromCart,
    total,
    handleCheckout,
    handlePaymentConfirm,
    setMessage,
    ingredients: ingredients ?? [],
    dataLoading, // <-- expose loading state for data
  };
}
