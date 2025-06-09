import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";
import AddIngredientForm from "../../forms/ingredient/AddIngredientForm"; // ✅ Make sure this path is correct

interface AddIngredientModalProps {
  showModal: boolean;
  onRefreshIngredients: (shouldRefresh: boolean) => void;
  onClose: () => void;
}

const AddIngredientModal = ({
  showModal,
  onRefreshIngredients,
  onClose,
}: AddIngredientModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshIngredients, setRefreshIngredients] = useState(false);
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
            <h1 className="modal-title fs-5">Add Item</h1>
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
            <AddIngredientForm
              setSubmitForm={submitFormRef}
              setLoadingStore={setLoadingStore}
              onIngredientAdded={(message) => {
                handleShowAlertMessage(message, true, true);
                setRefreshIngredients(!refreshIngredients);
                onRefreshIngredients(refreshIngredients);
              }}
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

export default AddIngredientModal;
