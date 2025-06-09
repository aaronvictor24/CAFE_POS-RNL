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

interface AddIngredientFormProps {
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingStore: (loading: boolean) => void;
  onIngredientAdded: (message: string) => void;
}

const AddIngredientForm = ({
  setSubmitForm,
  setLoadingStore,
  onIngredientAdded,
}: AddIngredientFormProps) => {
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

  const handleResetFields = () => {
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
  };

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

  const handleStoreIngredient = (e: FormEvent) => {
    e.preventDefault();
    setLoadingStore(true);

    IngredientService.storeIngredient(state)
      .then((res) => {
        if (res.status === 200) {
          handleResetFields();
          onIngredientAdded(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prev) => ({
            ...prev,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setLoadingStore(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    loadCategories();
    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleStoreIngredient}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name">Item</label>
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
              value={state.quantity_in_stock}
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
              value={state.low_stock_threshold}
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

export default AddIngredientForm;
