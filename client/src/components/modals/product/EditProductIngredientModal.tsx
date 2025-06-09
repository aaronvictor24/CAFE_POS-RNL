import { useRef, useState } from "react";
import SpinnerSmall from "../../SpinnerSmall";
import AlertMessage from "../../AlertMessage";
import EditProductIngredientForm from "../../forms/product/EditProductIngredientForm";
import type { ProductIngredient } from "../../../interfaces/ProductIngredient";
import type { Ingredients } from "../../../interfaces/Ingredients";

interface EditProductIngredientModalProps {
  showModal: boolean;
  productIngredient: ProductIngredient | null;
  allIngredients: Ingredients[];
  onRefreshProductIngredients: (refresh: boolean) => void;
  onClose: () => void;
}

const EditProductIngredientModal = ({
  showModal,
  productIngredient,
  allIngredients,
  onRefreshProductIngredients,
  onClose,
}: EditProductIngredientModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
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
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Edit Product Ingredient</h1>
          </div>
          <div className="modal-body">
            <AlertMessage
              message={message}
              isSuccess={isSuccess}
              isVisible={isVisible}
              onClose={handleCloseAlertMessage}
            />
            <EditProductIngredientForm
              productIngredient={productIngredient}
              allIngredients={allIngredients}
              setSubmitForm={submitFormRef}
              setLoadingUpdate={setLoadingUpdate}
              onProductIngredientUpdated={(message) => {
                handleShowAlertMessage(message, true, true);
                onRefreshProductIngredients(true);
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={loadingUpdate}
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={loadingUpdate}
              onClick={() => submitFormRef.current?.()}
            >
              {loadingUpdate ? (
                <>
                  <SpinnerSmall /> Updating ingredient...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductIngredientModal;
