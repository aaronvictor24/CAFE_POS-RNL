import { useEffect, useRef, useState, type FormEvent } from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import ProductIngredientService from "../../../services/ProductIngredientService";
import type { ProductIngredient } from "../../../interfaces/ProductIngredient";

interface DeleteProductIngredientFormProps {
  productIngredient: ProductIngredient | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeleteProductIngredient: (message: string) => void;
}

const DeleteProductIngredientForm = ({
  productIngredient,
  setSubmitForm,
  setLoadingDestroy,
  onDeleteProductIngredient,
}: DeleteProductIngredientFormProps) => {
  const [state, setState] = useState({
    product_ingredient_id: 0,
    ingredient: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleDestroyProductIngredient = (e: FormEvent) => {
    e.preventDefault();
    setLoadingDestroy(true);

    ProductIngredientService.destroyProductIngredient(
      state.product_ingredient_id
    )
      .then((res) => {
        if (res.status === 200) {
          onDeleteProductIngredient(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying product ingredient: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setLoadingDestroy(false);
      });
  };

  useEffect(() => {
    if (productIngredient) {
      setState((prevState) => ({
        ...prevState,
        product_ingredient_id: productIngredient.product_ingredient_id,
        ingredient: productIngredient.ingredient?.name || "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        product_ingredient_id: 0,
        ingredient: "",
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [productIngredient, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleDestroyProductIngredient}>
      <div className="row">
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="ingredient">Ingredient</label>
              <input
                type="text"
                className="form-control"
                name="ingredient"
                id="ingredient"
                value={state.ingredient}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeleteProductIngredientForm;
