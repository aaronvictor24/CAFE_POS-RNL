import { useEffect, useState } from "react";
import ProductIngredientService from "../../../services/ProductIngredientService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Spinner } from "react-bootstrap";

interface ProductIngredientTableProps {
  productId: number;
  refreshProductIngredients: boolean;
  onEditProductIngredient?: (ingredient: any) => void;
  onDeleteProductIngredient?: (ingredient: any) => void;
}

const ProductIngredientTable = ({
  productId,
  refreshProductIngredients,
  onEditProductIngredient,
  onDeleteProductIngredient,
}: ProductIngredientTableProps) => {
  const [state, setState] = useState({
    loading: true,
    ingredients: [] as any[],
  });

  const handleLoadProductIngredients = () => {
    ProductIngredientService.loadProductIngredients(productId)
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            ingredients: res.data.ingredients,
          }));
        }
      })
      .catch((error) => ErrorHandler(error, null))
      .finally(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    handleLoadProductIngredients();
    // eslint-disable-next-line
  }, [productId, refreshProductIngredients]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>Ingredient</th>
          <th>Quantity Required</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {state.loading ? (
          <tr>
            <td colSpan={4} className="text-center">
              <Spinner />
            </td>
          </tr>
        ) : state.ingredients.length > 0 ? (
          state.ingredients.map((item, index) => (
            <tr key={item.product_ingredient_id}>
              <td>{index + 1}</td>
              <td>{item.ingredient?.name}</td>
              <td>{item.quantity_required}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => onEditProductIngredient?.(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteProductIngredient?.(item)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No ingredients found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductIngredientTable;
