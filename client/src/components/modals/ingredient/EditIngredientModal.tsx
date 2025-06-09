import { useRef, useState } from "react";
import SpinnerSmall from "../../SpinnerSmall";
import AlertMessage from "../../AlertMessage";
import EditIngredientForm from "../../forms/ingredient/EditIngredientForm";
import type { Ingredients } from "../../../interfaces/Ingredients";

interface EditIngredientModalProps {
  showModal: boolean;
  ingredient: Ingredients | null;
  onRefreshIngredients: (refresh: boolean) => void;
  onClose: () => void;
}

const EditIngredientModal = ({
  showModal,
  ingredient,
  onRefreshIngredients,
  onClose,
}: EditIngredientModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshIngredients, setRefreshIngredients] = useState(false);
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
            <h1 className="modal-title fs-5">Edit Ingredient</h1>
          </div>
          <div className="modal-body">
            <AlertMessage
              message={message}
              isSuccess={isSuccess}
              isVisible={isVisible}
              onClose={handleCloseAlertMessage}
            />
            <EditIngredientForm
              ingredient={ingredient}
              setSubmitForm={submitFormRef}
              setLoadingUpdate={setLoadingUpdate}
              onIngredientUpdated={(message) => {
                handleShowAlertMessage(message, true, true);
                const refresh = !refreshIngredients;
                setRefreshIngredients(refresh);
                onRefreshIngredients(refresh);
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
                "Save Ingredient"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIngredientModal;
