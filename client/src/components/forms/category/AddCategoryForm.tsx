import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CategoryFieldErrors } from "../../../interfaces/CategoryFieldErrors";
import CategoryService from "../../../services/CategoryService";
import ErrorHandler from "../../../handler/ErrorHandler";
import SpinnerSmall from "../../SpinnerSmall";

interface AddCategoryFormProps {
  onCategoryAdded: (message: string) => void;
}

const AddCategoryForm = ({ onCategoryAdded }: AddCategoryFormProps) => {
  const [state, setState] = useState({
    loadingStore: false,
    category: "",
    errors: {} as CategoryFieldErrors,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStoreCategory = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingStore: true,
    }));

    CategoryService.storeCategory(state)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            category: "",
            errors: {} as CategoryFieldErrors,
          }));
          onCategoryAdded(res.data.message);
        } else {
          console.error(
            "Unexpected status error during storing category:",
            res.status
          );
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingStore: false,
        }));
      });
  };

  return (
    <form onSubmit={handleStoreCategory}>
      <div className="form-group mb-3">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          className={`form-control ${
            state.errors.category ? "is-invalid" : ""
          }`}
          id="category"
          name="category"
          value={state.category}
          onChange={handleInputChange}
        />
        {state.errors.category && (
          <p className="text-danger">{state.errors.category[0]}</p>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.loadingStore}
        >
          {state.loadingStore ? (
            <>
              <SpinnerSmall /> Loading...
            </>
          ) : (
            "SAVE"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
