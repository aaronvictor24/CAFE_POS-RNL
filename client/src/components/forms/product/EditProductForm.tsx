import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { ProductFieldErrors } from "../../../interfaces/ProductFieldErrors";
import ErrorHandler from "../../../handler/ErrorHandler";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import type { Products } from "../../../interfaces/Product";
import type { Category } from "../../../interfaces/Category";

interface EditProductFormProps {
  product: Products | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onProductUpdated: (message: string) => void;
}

const EditProductForm = ({
  product,
  setSubmitForm,
  setLoadingUpdate,
  onProductUpdated,
}: EditProductFormProps) => {
  const [state, setState] = useState({
    loadingCategories: true,
    categories: [] as Category[],
    product_id: 0,
    product: "",
    category: "",
    unit: "",
    stock_quantity: 0,
    price: 0,
    errors: {} as ProductFieldErrors,
  });

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

  const handleLoadCategories = () => {
    CategoryService.loadCategories()
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            categories: res.data.categories,
          }));
        } else {
          console.error("Unexpected status loading categories:", res.status);
        }
      })
      .catch((err) => ErrorHandler(err, null))
      .finally(() => {
        setState((prev) => ({
          ...prev,
          loadingCategories: false,
        }));
      });
  };

  const handleUpdateProduct = (e: FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);

    ProductService.updateProduct(state.product_id, state)
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            errors: {} as ProductFieldErrors,
          }));
          onProductUpdated(res.data.message);
        } else {
          console.error("Unexpected status updating product:", res.status);
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
    handleLoadCategories();

    if (product) {
      setState((prev) => ({
        ...prev,
        product_id: product.product_id,
        product: product.product,
        category: product.category.category_id.toString(),
        unit: product.unit,
        stock_quantity: product.stock_quantity,
        price: product.price,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        product_id: 0,
        product: "",
        category: "",
        unit: "",
        stock_quantity: 0,
        price: 0,
        errors: {} as ProductFieldErrors,
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [product, setSubmitForm]);

  return (
    <form ref={formRef} onSubmit={handleUpdateProduct}>
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
            <label htmlFor="category">Category</label>
            <select
              className={`form-control ${
                state.errors.category ? "is-invalid" : ""
              }`}
              name="category"
              id="category"
              value={state.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {state.loadingCategories ? (
                <option value="">Loading...</option>
              ) : (
                state.categories.map((state) => (
                  <option key={state.category_id} value={state.category_id}>
                    {state.category}
                  </option>
                ))
              )}
            </select>
            {state.errors.category && (
              <span className="text-danger">{state.errors.category[0]}</span>
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
        </div>

        <div className="col-md-6">
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
          <div className="mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
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
        </div>
      </div>
    </form>
  );
};

export default EditProductForm;
