import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import ErrorHandler from "../../../handler/ErrorHandler";
import type { Category } from "../../../interfaces/Category";
import type { ProductFieldErrors } from "../../../interfaces/ProductFieldErrors";

interface AddProductFormProps {
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingStore: (loading: boolean) => void;
  onProductAdded: (message: string) => void;
}

const AddProductForm = ({
  setSubmitForm,
  setLoadingStore,
  onProductAdded,
}: AddProductFormProps) => {
  const [state, setState] = useState({
    loadingCategories: true,
    categories: [] as Category[],
    product: "",
    category_id: "",
    unit: "",
    stock_quantity: 0,
    price: 0,
    errors: {} as ProductFieldErrors,
  });

  const handleResetFields = () => {
    setState((prev) => ({
      ...prev,
      product: "",
      category_id: "",
      unit: "",
      stock_quantity: 0,
      price: 0,
      errors: {} as ProductFieldErrors,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]:
        name === "stock_quantity" || name === "price" ? Number(value) : value,
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
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prev) => ({
          ...prev,
          loadingCategories: false,
        }));
      });
  };

  const handleStoreProduct = (e: FormEvent) => {
    e.preventDefault();
    setLoadingStore(true);

    ProductService.storeProduct(state)
      .then((res) => {
        if (res.status === 200) {
          handleResetFields();
          onProductAdded(res.data.message);
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
    <form ref={formRef} onSubmit={handleStoreProduct}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="product">Product Name</label>
            <input
              type="text"
              className={`form-control ${
                state.errors.product ? "is-invalid" : ""
              }`}
              name="product"
              id="product"
              value={state.product}
              onChange={handleInputChange}
            />
            {state.errors.product && (
              <span className="text-danger">{state.errors.product[0]}</span>
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
            <label htmlFor="stock_quantity">Stock Quantity</label>
            <input
              type="number"
              className={`form-control ${
                state.errors.stock_quantity ? "is-invalid" : ""
              }`}
              name="stock_quantity"
              id="stock_quantity"
              value={state.stock_quantity}
              onChange={handleInputChange}
            />
            {state.errors.stock_quantity && (
              <span className="text-danger">
                {state.errors.stock_quantity[0]}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className={`form-control ${
                state.errors.price ? "is-invalid" : ""
              }`}
              name="price"
              id="price"
              value={state.price}
              onChange={handleInputChange}
            />
            {state.errors.price && (
              <span className="text-danger">{state.errors.price[0]}</span>
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

export default AddProductForm;
