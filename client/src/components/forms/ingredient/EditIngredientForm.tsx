import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import CategoryService from "../../../services/CategoryService";
import IngredientService from "../../../services/IngredientService";
import ErrorHandler from "../../../handler/ErrorHandler";
import type { Category } from "../../../interfaces/Category";
import type { IngredientFieldErrors } from "../../../interfaces/IngredientFieldErrors";
import type { Ingredients } from "../../../interfaces/Ingredients";

interface EditIngredientFormProps {
  ingredient: Ingredients | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onIngredientUpdated: (message: string) => void;
}

const EditIngredientForm = ({
  ingredient,
  setSubmitForm,
  setLoadingUpdate,
  onIngredientUpdated,
}: EditIngredientFormProps) => {
  const [state, setState] = useState({
    loadingCategories: true,
    categories: [] as Category[],
    name: "",
    category_id: "",
    unit: "",
    cost_per_unit: 0,
    quantity_in_stock: 0,
    low_stock_threshold: 0,
    errors: {} as IngredientFieldErrors,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: [
        "cost_per_unit",
        "quantity_in_stock",
        "low_stock_threshold",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const loadCategories = () => {
    CategoryService.loadCategories()
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            categories: res.data.categories,
          }));
        }
      })
      .catch((error) => ErrorHandler(error, null))
      .finally(() => {
        setState((prev) => ({
          ...prev,
          loadingCategories: false,
        }));
      });
  };

  const handleUpdateIngredient = (e: FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);

    if (!ingredient) return;

    IngredientService.updateIngredient(ingredient.ingredient_id, state)
      .then((res) => {
        if (res.status === 200) {
          onIngredientUpdated(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setState((prev) => ({
            ...prev,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  useEffect(() => {
    loadCategories();
    if (ingredient) {
      setState((prev) => ({
        ...prev,
        name: ingredient.name,
        category_id: ingredient.category?.category_id?.toString() ?? "",
        unit: ingredient.unit,
        cost_per_unit: ingredient.cost_per_unit,
        quantity_in_stock: ingredient.quantity_in_stock,
        low_stock_threshold: ingredient.low_stock_threshold ?? 0,
        errors: {} as IngredientFieldErrors,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        name: "",
        category_id: "",
        unit: "",
        cost_per_unit: 0,
        quantity_in_stock: 0,
        low_stock_threshold: 0,
        errors: {} as IngredientFieldErrors,
      }));
    }
    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [ingredient, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleUpdateIngredient}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name">Ingredient Name</label>
            <input
              type="text"
              className={`form-control ${
                state.errors.name ? "is-invalid" : ""
              }`}
              name="name"
              id="name"
              value={state.name}
              onChange={handleInputChange}
            />
            {state.errors.name && (
              <span className="text-danger">{state.errors.name[0]}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              className={`form-control ${
                state.errors.unit ? "is-invalid" : ""
              }`}
              name="unit"
              id="unit"
              value={state.unit}
              onChange={handleInputChange}
            />
            {state.errors.unit && (
              <span className="text-danger">{state.errors.unit[0]}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="cost_per_unit">Cost Per Unit</label>
            <input
              type="number"
              className={`form-control ${
                state.errors.cost_per_unit ? "is-invalid" : ""
              }`}
              name="cost_per_unit"
              id="cost_per_unit"
              value={state.cost_per_unit}
              onChange={handleInputChange}
            />
            {state.errors.cost_per_unit && (
              <span className="text-danger">
                {state.errors.cost_per_unit[0]}
              </span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="quantity_in_stock">Quantity in Stock</label>
            <input
              type="number"
              className={`form-control ${
                state.errors.quantity_in_stock ? "is-invalid" : ""
              }`}
              name="quantity_in_stock"
              id="quantity_in_stock"
              value={
                Number.isNaN(state.quantity_in_stock)
                  ? ""
                  : parseInt(state.quantity_in_stock as any, 10)
              }
              onChange={handleInputChange}
            />
            {state.errors.quantity_in_stock && (
              <span className="text-danger">
                {state.errors.quantity_in_stock[0]}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="low_stock_threshold">Low Stock Threshold</label>
            <input
              type="number"
              className={`form-control ${
                state.errors.low_stock_threshold ? "is-invalid" : ""
              }`}
              name="low_stock_threshold"
              id="low_stock_threshold"
              value={state.low_stock_threshold ?? ""}
              onChange={handleInputChange}
            />
            {state.errors.low_stock_threshold && (
              <span className="text-danger">
                {state.errors.low_stock_threshold[0]}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="category_id">Category</label>
            <select
              className={`form-select ${
                state.errors.category ? "is-invalid" : ""
              }`}
              name="category_id"
              id="category_id"
              value={state.category_id}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {state.loadingCategories ? (
                <option value="">Loading...</option>
              ) : (
                state.categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category}
                  </option>
                ))
              )}
            </select>
            {state.errors.category && (
              <span className="text-danger">{state.errors.category[0]}</span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditIngredientForm;
