import { useEffect, useState } from "react";
import IngredientService from "../../../services/IngredientService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Spinner } from "react-bootstrap";
import type { Ingredients } from "../../../interfaces/Ingredients";

interface IngredientsTableProps {
  refreshIngredients: boolean;
  onEditIngredient: (ingredient: Ingredients) => void;
  onDeleteIngredient: (ingredient: Ingredients) => void;
}

const IngredientsTable = ({
  refreshIngredients,
  onEditIngredient,
  onDeleteIngredient,
}: IngredientsTableProps) => {
  const [state, setState] = useState({
    loading: true,
    ingredients: [] as Ingredients[],
  });

  const handleLoadIngredients = () => {
    IngredientService.loadIngredients()
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            ingredients: res.data.ingredients,
          }));
        } else {
          console.error("Unexpected error loading ingredients:", res.status);
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
    handleLoadIngredients();
  }, [refreshIngredients]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Category</th>
          <th>Unit</th>
          <th>Cost/Unit</th>
          <th>Stock</th>
          <th>Threshold</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {state.loading ? (
          <tr>
            <td colSpan={9}>
              <Spinner />
            </td>
          </tr>
        ) : state.ingredients.length > 0 ? (
          state.ingredients.map((ingredient, index) => (
            <tr key={ingredient.ingredient_id} className="align-middle">
              <td>{index + 1}</td>
              <td>{ingredient.name}</td>
              <td>{ingredient.category.category}</td>
              <td>{ingredient.unit}</td>
              <td>₱{Number(ingredient.cost_per_unit).toFixed(2)}</td>
              <td>{Math.trunc(ingredient.quantity_in_stock)}</td>
              <td>{ingredient.low_stock_threshold ?? "-"}</td>
              <td>{ingredient.status}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => onEditIngredient(ingredient)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteIngredient(ingredient)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className="text-center">
              No Ingredients Found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default IngredientsTable;
