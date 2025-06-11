import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import type { Products } from "../../interfaces/Product";

interface ProductListProps {
  loadProducts: () => Promise<Products[]>;
  onAddToCart: (product: Products) => void;
}

const ProductList = ({ loadProducts, onAddToCart }: ProductListProps) => {
  const [state, setState] = useState<{
    loadingProducts: boolean;
    products: Products[];
  }>({
    loadingProducts: true,
    products: [],
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, loadingProducts: true }));
    loadProducts()
      .then((products) => {
        setState({ loadingProducts: false, products });
      })
      .catch(() => {
        setState({ loadingProducts: false, products: [] });
      });
    // eslint-disable-next-line
  }, [loadProducts]);


  return (
    <div>
      <h4>Products</h4>
      {state.loadingProducts ? (
        <Spinner />
      ) : state.products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="list-group">
          {state.products.map((product) => {
            const canMake = product.can_make !== false;
            return (
              <li
                key={product.product_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {product.product} : ₱{product.price}
                  {!canMake && (
                    <span className="badge bg-danger ms-2">
                      Cannot make (ingredient out of stock)
                    </span>
                  )}
                </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onAddToCart(product)}
                  disabled={!canMake}
                >
                  Add
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductList;