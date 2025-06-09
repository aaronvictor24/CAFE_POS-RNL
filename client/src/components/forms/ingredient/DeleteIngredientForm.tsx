import { useEffect, useRef, useState, type FormEvent } from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import IngredientService from "../../../services/IngredientService";
import type { Ingredients } from "../../../interfaces/Ingredients";

interface DeleteIngredientFormProps {
  ingredient: Ingredients | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeleteIngredient: (message: string) => void;
}

const DeleteIngredientForm = ({
  ingredient,
  setSubmitForm,
  setLoadingDestroy,
  onDeleteIngredient,
}: DeleteIngredientFormProps) => {
  const [state, setState] = useState({
    ingredient_id: 0,
    name: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleDestroyIngredient = (e: FormEvent) => {
    e.preventDefault();

    setLoadingDestroy(true);

    IngredientService.destroyIngredient(state.ingredient_id)
      .then((res) => {
        if (res.status === 200) {
          onDeleteIngredient(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying ingredient: ",
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
    if (ingredient) {
      setState({
        ingredient_id: ingredient.ingredient_id,
        name: ingredient.name,
      });
    } else {
      setState({
        ingredient_id: 0,
        name: "",
      });
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [ingredient, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleDestroyIngredient}>
      <div className="row">
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="ingredient">Ingredient Name</label>
              <input
                type="text"
                className="form-control"
                name="ingredient"
                id="ingredient"
                value={state.name}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeleteIngredientForm;
