import { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import IngredientService from "../services/IngredientService";
import type { Ingredients } from "../interfaces/Ingredients";

const LowStockAlert = () => {
    const [state, setState] = useState({
        loading: true,
        lowStock: [] as Ingredients[],
    });

    const handleLoadLowStock = () => {
        IngredientService.loadLowStockIngredients()
            .then((res) => {
                const data = res.data?.low_stock_ingredients;
                setState((prevState) => ({
                    ...prevState,
                    lowStock: Array.isArray(data) ? data : [],
                }));
            })
            .catch((error) => {
                console.error(error);
                setState((prevState) => ({
                    ...prevState,
                    lowStock: [],
                }));
            })
            .finally(() => {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    };

    useEffect(() => {
        handleLoadLowStock();
    }, []);

    if (state.loading) return <Spinner animation="border" variant="warning" />;
    if (!Array.isArray(state.lowStock) || state.lowStock.length === 0) return null;

    return (
        <div>
            {state.lowStock.map((item) => (
                <Alert key={item.ingredient_id} variant="warning" className="mb-2 fw-bold">
                    ⚠️ {item.name} is low in stock ({item.quantity_in_stock} {item.unit} left)!
                </Alert>
            ))}
        </div>
    );
};

export default LowStockAlert;