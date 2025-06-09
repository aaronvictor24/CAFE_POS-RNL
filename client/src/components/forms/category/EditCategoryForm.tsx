import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Category } from "../../../interfaces/Category";
import type { CategoryFieldErrors } from "../../../interfaces/CategoryFieldErrors";
import CategoryService from "../../../services/CategoryService";
import ErrorHandler from "../../../handler/ErrorHandler";

interface EditCategoryFormProps {
  category: Category | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onCategoryUpdated: (message: string) => void;
}

const EditCategoryForm = ({
  category,
  setSubmitForm,
  setLoadingUpdate,
  onCategoryUpdated,
}: EditCategoryFormProps) => {
  const [state, setState] = useState({
    category_id: 0,
    category: "",
    errors: {} as CategoryFieldErrors,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCategory = (e: FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);

    CategoryService.updateCategory(state.category_id, {
      category: state.category,
    })
      .then((res) => {
        if (res.status === 200) {
          onCategoryUpdated(res.data.message);
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
      .finally(() => setLoadingUpdate(false));
  };

  useEffect(() => {
    if (category) {
      setState({
        category_id: category.category_id,
        category: category.category,
        errors: {},
      });
    }

    setSubmitForm.current = () => {
      formRef.current?.requestSubmit();
    };
  }, [category, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleUpdateCategory}>
      <div className="mb-3">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          className={`form-control ${
            state.errors.category ? "is-invalid" : ""
          }`}
          name="category"
          id="category"
          value={state.category}
          onChange={handleInputChange}
        />
        {state.errors.category && (
          <span className="text-danger">{state.errors.category[0]}</span>
        )}
      </div>
    </form>
  );
};

export default EditCategoryForm;
