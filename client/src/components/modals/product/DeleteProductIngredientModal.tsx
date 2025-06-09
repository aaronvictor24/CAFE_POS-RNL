import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import DeleteProductIngredientForm from "../../forms/product/DeleteProductIngredientForm";
import SpinnerSmall from "../../SpinnerSmall";
import type { ProductIngredient } from "../../../interfaces/ProductIngredient";

interface DeleteProductIngredientModalProps {
  showModal: boolean;
  productIngredient: ProductIngredient | null;
  onRefreshProductIngredients: (refresh: boolean) => void;
  onClose: () => void;
}

const DeleteProductIngredientModal = ({
  showModal,
  productIngredient,
  onRefreshProductIngredients,
  onClose,
}: DeleteProductIngredientModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshProductIngredients, setRefreshProductIngredients] =
    useState(false);
  const [loadingDestroy, setLoadingDestroy] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowAlertMessage = (
    message: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);
  };

  const handleCloseAlertMessage = () => {
    setMessage("");
    setIsSuccess(false);
    setIsVisible(false);
  };

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Delete Product Ingredient</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <AlertMessage
                message={message}
                isSuccess={isSuccess}
                isVisible={isVisible}
                onClose={handleCloseAlertMessage}
              />
            </div>
            <p className="fs-4">
              Are you sure you want to delete this ingredient from the product?
            </p>
            <DeleteProductIngredientForm
              productIngredient={productIngredient}
              setSubmitForm={submitFormRef}
              setLoadingDestroy={setLoadingDestroy}
              onDeleteProductIngredient={(message) => {
                handleShowAlertMessage(message, true, true);
                setRefreshProductIngredients(!refreshProductIngredients);
                onRefreshProductIngredients(true);
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={loadingDestroy}
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={loadingDestroy}
              onClick={() => submitFormRef.current?.()}
            >
              {loadingDestroy ? (
                <>
                  <SpinnerSmall /> Deleting Ingredient...
                </>
              ) : (
                "Delete Ingredient"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductIngredientModal;
