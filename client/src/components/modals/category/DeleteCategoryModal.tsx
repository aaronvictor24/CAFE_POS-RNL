import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import DeleteCategoryForm from "../../forms/category/DeleteCategoryForm";
import SpinnerSmall from "../../SpinnerSmall";
import type { Category } from "../../../interfaces/Category";

interface DeleteCategoryModalProps {
  showModal: boolean;
  category: Category | null;
  onRefreshCategories: (refresh: boolean) => void;
  onClose: () => void;
}

const DeleteCategoryModal = ({
  showModal,
  category,
  onRefreshCategories,
  onClose,
}: DeleteCategoryModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshCategories, setRefreshCategories] = useState(false);
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
    <>
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Delete Category</h1>
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
                Are you sure you want to delete this category?
              </p>
              <DeleteCategoryForm
                category={category}
                setSubmitForm={submitFormRef}
                setLoadingDestroy={setLoadingDestroy}
                onDeleteCategory={(message) => {
                  handleShowAlertMessage(message, true, true);
                  setRefreshCategories(!refreshCategories);
                  onRefreshCategories(refreshCategories);
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
                    <SpinnerSmall /> Deleting Category...
                  </>
                ) : (
                  "Delete Category"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryModal;
