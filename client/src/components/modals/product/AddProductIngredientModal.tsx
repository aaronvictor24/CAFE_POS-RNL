import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";
import AddProductIngredientForm from "../../forms/product/AddProductIngredientForm";

interface AddProductIngredientModalProps {
  showModal: boolean;
  onRefreshProductIngredients: (shouldRefresh: boolean) => void;
  onClose: () => void;
  allIngredients: any[];
  productId: number;
}

const AddProductIngredientModal = ({
  showModal,
  onRefreshProductIngredients,
  onClose,
  allIngredients,
  productId,
}: AddProductIngredientModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);
  const [loadingStore, setLoadingStore] = useState(false);
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
            <h1 className="modal-title fs-5">Add Ingredient to Product</h1>
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
            <AddProductIngredientForm
              setSubmitForm={submitFormRef}
              setLoadingStore={setLoadingStore}
              onProductIngredientAdded={(message) => {
                handleShowAlertMessage(message, true, true);
                onRefreshProductIngredients(true);
              }}
              allIngredients={allIngredients}
              productId={productId}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loadingStore}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => submitFormRef.current?.()}
              disabled={loadingStore}
            >
              {loadingStore ? (
                <>
                  <SpinnerSmall /> Saving...
                </>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductIngredientModal;
