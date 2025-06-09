import { useRef, useState } from "react";
import ProductIngredientService from "../../../services/ProductIngredientService";
import ErrorHandler from "../../../handler/ErrorHandler";

interface AddProductIngredientFormProps {
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingStore: (loading: boolean) => void;
  onProductIngredientAdded: (message: string) => void;
  allIngredients: any[];
  productId: number;
}

const AddProductIngredientForm = ({
  setSubmitForm,
  setLoadingStore,
  onProductIngredientAdded,
  allIngredients,
  productId,
}: AddProductIngredientFormProps) => {
  const [state, setState] = useState({
    ingredient_id: "",
    quantity_required: "",
    errors: {} as any,
  });

  const handleResetFields = () => {
    setState({
      ingredient_id: "",
      quantity_required: "",
      errors: {},
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStoreProductIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStore(true);

    ProductIngredientService.storeProductIngredient({
      product_id: productId,
      ingredient_id: state.ingredient_id,
      quantity_required: state.quantity_required,
    })
      .then((res) => {
        if (res.status === 200) {
          handleResetFields();
          onProductIngredientAdded(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
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

  // Set up submit ref for modal
  useState(() => {
    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  });

  return (
    <form ref={formRef} onSubmit={handleStoreProductIngredient}>
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
          <option value="">Select</option>
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
          <span className="text-danger">{state.errors.ingredient_id[0]}</span>
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
    </form>
  );
};

export default AddProductIngredientForm;
