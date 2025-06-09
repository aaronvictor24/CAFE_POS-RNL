import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import ProductIngredientService from "../../../services/ProductIngredientService";
import type { ProductIngredient } from "../../../interfaces/ProductIngredient";
import type { Ingredients } from "../../../interfaces/Ingredients";
import type { ProductIngredientFieldErrors } from "../../../interfaces/ProductIngredientFieldErrors";

interface EditProductIngredientFormProps {
  productIngredient: ProductIngredient | null;
  allIngredients: Ingredients[];
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onProductIngredientUpdated: (message: string) => void;
}

const EditProductIngredientForm = ({
  productIngredient,
  allIngredients,
  setSubmitForm,
  setLoadingUpdate,
  onProductIngredientUpdated,
}: EditProductIngredientFormProps) => {
  const [state, setState] = useState({
    product_ingredient_id: 0,
    ingredient_id: "",
    quantity_required: "",
    errors: {} as ProductIngredientFieldErrors,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProductIngredient = (e: FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);

    ProductIngredientService.updateProductIngredient(
      state.product_ingredient_id,
      {
        ingredient_id: state.ingredient_id,
        quantity_required: state.quantity_required,
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            errors: {} as ProductIngredientFieldErrors,
          }));
          onProductIngredientUpdated(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          setState((prev) => ({
            ...prev,
            errors: err.response.data.errors,
          }));
        } else {
          ErrorHandler(err, null);
        }
      })
      .finally(() => setLoadingUpdate(false));
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (productIngredient) {
      setState((prev) => ({
        ...prev,
        product_ingredient_id: productIngredient.product_ingredient_id,
        ingredient_id: productIngredient.ingredient_id.toString(),
        quantity_required: productIngredient.quantity_required.toString(),
        errors: {} as ProductIngredientFieldErrors,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        product_ingredient_id: 0,
        ingredient_id: "",
        quantity_required: "",
        errors: {} as ProductIngredientFieldErrors,
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [productIngredient, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleUpdateProductIngredient}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="ingredient_id">Ingredient</label>
            <select
              className={`form-select ${
                state.errors.ingredient_id ? "is-invalid" : ""
              }`}
              name="ingredient_id"
              id="ingredient_id"
              value={state.ingredient_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Ingredient</option>
              {allIngredients.map((ingredient) => (
                <option
                  key={ingredient.ingredient_id}
                  value={ingredient.ingredient_id}
                >
                  {ingredient.name}
                </option>
              ))}
            </select>
            {state.errors.ingredient_id && (
              <span className="text-danger">
                {state.errors.ingredient_id[0]}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="quantity_required">Quantity Required</label>
            <input
              type="number"
              className={`form-control ${
                state.errors.quantity_required ? "is-invalid" : ""
              }`}
              name="quantity_required"
              id="quantity_required"
              value={state.quantity_required}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
              required
            />
            {state.errors.quantity_required && (
              <span className="text-danger">
                {state.errors.quantity_required[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProductIngredientForm;
