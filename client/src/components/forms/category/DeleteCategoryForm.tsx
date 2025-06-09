import { useEffect, useRef, useState, type FormEvent } from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import CategoryService from "../../../services/CategoryService";
import type { Category } from "../../../interfaces/Category";

interface DeleteCategoryFormProps {
  category: Category | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeleteCategory: (message: string) => void;
}

const DeleteCategoryForm = ({
  category,
  setSubmitForm,
  setLoadingDestroy,
  onDeleteCategory,
}: DeleteCategoryFormProps) => {
  const [state, setState] = useState({
    category_id: 0,
    category_name: "",
  });

  const handleDestroyCategory = (e: FormEvent) => {
    e.preventDefault();

    setLoadingDestroy(true);

    CategoryService.destroyCategory(state.category_id)
      .then((res) => {
        if (res.status === 200) {
          onDeleteCategory(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying category: ",
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

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (category) {
      setState((prevState) => ({
        ...prevState,
        category_id: category.category_id,
        category_name: category.category,
      }));
    } else {
      setState({ category_id: 0, category_name: "" });
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [category, setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleDestroyCategory}>
        <div className="row">
          <div className="justify-content-center">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="category_name">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="category_name"
                  id="category_name"
                  value={state.category_name}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeleteCategoryForm;
