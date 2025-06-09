import { useEffect, useState } from "react";
import type { Products } from "../../../interfaces/Product";
import ProductService from "../../../services/ProductService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ProductTable {
  refreshProducts: boolean;
  onEditProduct: (product: Products) => void;
  onDeleteProduct: (product: Products) => void;
}

const ProductsTable = ({
  refreshProducts,
  onEditProduct,
  onDeleteProduct,
}: ProductTable) => {
  const [state, setState] = useState({
    loadingProducts: true,
    products: [] as Products[],
  });
  const navigate = useNavigate();

  const handleLoadProducts = () => {
    ProductService.loadProducts()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            products: res.data.products,
          }));
        } else {
          console.error(
            "Unexpected error while loading products: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingProducts: false,
        }));
      });
  };

  useEffect(() => {
    handleLoadProducts();
  }, [refreshProducts]);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Stocks</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingProducts ? (
            <tr className="align-middle">
              <td colSpan={7}>
                <Spinner />
              </td>
            </tr>
          ) : state.products.length > 0 ? (
            state.products.map((product, index) => (
              <tr className="align-middle" key={product.product_id}>
                <td>{index + 1}</td>
                <td>{product.product}</td>
                <td>{product.category.category}</td>
                <td>{product.unit}</td>
                <td>{product.stock_quantity}</td>
                <td>₱{Number(product.price).toFixed(2)}</td>

                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() =>
                        navigate(
                          `/manage-product-ingredient/${product.product_id}`
                        )
                      }
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => onEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDeleteProduct(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="align-middle">
              <td colSpan={7} className="text-center">
                No Products Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductsTable;
