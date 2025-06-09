import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import DeleteIngredientForm from "../../forms/ingredient/DeleteIngredientForm";
import SpinnerSmall from "../../SpinnerSmall";
import type { Ingredients } from "../../../interfaces/Ingredients";

interface DeleteIngredientModalProps {
  showModal: boolean;
  ingredient: Ingredients | null;
  onRefreshIngredients: (refresh: boolean) => void;
  onClose: () => void;
}

const DeleteIngredientModal = ({
  showModal,
  ingredient,
  onRefreshIngredients,
  onClose,
}: DeleteIngredientModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshIngredients, setRefreshIngredients] = useState(false);
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
            <h1 className="modal-title fs-5">Delete Ingredient</h1>
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
              Are you sure you want to delete this ingredient?
            </p>
            <DeleteIngredientForm
              ingredient={ingredient}
              setSubmitForm={submitFormRef}
              setLoadingDestroy={setLoadingDestroy}
              onDeleteIngredient={(message) => {
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

export default DeleteIngredientModal;
