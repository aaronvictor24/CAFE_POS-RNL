import { useEffect, useState } from "react";
import LowStockAlert from "./LowStockAlert";
import IngredientService from "../services/IngredientService";
import { Spinner } from "react-bootstrap";
import type { Ingredients } from "../interfaces/Ingredients";

const Dashboard = () => {
  const [inventory, setInventory] = useState({
    loading: true,
    ingredients: [] as Ingredients[],
  });

  const handleLoadIngredients = () => {
    IngredientService.loadIngredients()
      .then((res) => {
        setInventory({
          loading: false,
          ingredients: res.data.ingredients,
        });
      })
      .catch(() => {
        setInventory({
          loading: false,
          ingredients: [],
        });
      });
  };

  useEffect(() => {
    handleLoadIngredients();
  }, []);

  return (
    <div className="container-fluid min-vh-100 py-4 px-4 bg-light">
      <LowStockAlert />
      <div className="border bg-white p-4 rounded shadow-sm mt-4">
        <h4 className="mb-3 text-primary">Inventory Record</h4>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Stock</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.loading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              ) : inventory.ingredients.length > 0 ? (
                inventory.ingredients.map((item) => (
                  <tr key={item.ingredient_id}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.quantity_in_stock)}</td>
                    <td>{item.unit}</td>
                    <td>
                      <span className={
                        item.quantity_in_stock > 500 ? "badge bg-success" :
                          item.quantity_in_stock > 450 ? "badge bg-warning text-dark" :
                            "badge bg-danger"
                      }>
                        {item.quantity_in_stock > 500 ? "In Stock" :
                          item.quantity_in_stock > 450 ? "Low" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted">No inventory records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h4 className="text-center mb-0 text-muted">Welcome to your POS Dashboard!</h4>
      </div>
    </div>
  );
};

export default Dashboard;