import { useEffect, useRef, useState, type FormEvent } from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import ProductService from "../../../services/ProductService";
import type { Products } from "../../../interfaces/Product";

interface DeleteProductFormProps {
  product: Products | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeleteProduct: (message: string) => void;
}

const DeleteProductForm = ({
  product,
  setSubmitForm,
  setLoadingDestroy,
  onDeleteProduct,
}: DeleteProductFormProps) => {
  const [state, setState] = useState({
    product_id: 0,
    product: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleDestroyProduct = (e: FormEvent) => {
    e.preventDefault();

    setLoadingDestroy(true);

    ProductService.destroyProduct(state.product_id)
      .then((res) => {
        if (res.status === 200) {
          onDeleteProduct(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying product: ",
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
    if (product) {
      setState((prevState) => ({
        ...prevState,
        product_id: product.product_id,
        product: product.product,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        product_id: 0,
        product: "",
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [product, setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleDestroyProduct}>
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="product">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  id="product"
                  value={state.product}
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

export default DeleteProductForm;
