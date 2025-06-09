import { useRef, useState } from "react";
import type { Category } from "../../../interfaces/Category";
import EditCategoryForm from "../../forms/category/EditCategoryForm";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";

interface EditCategoryModalProps {
  showModal: boolean;
  category: Category | null;
  onRefreshCategories: () => void;
  onClose: () => void;
}

const EditCategoryModal = ({
  showModal,
  category,
  onRefreshCategories,
  onClose,
}: EditCategoryModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowAlertMessage = (msg: string) => {
    setMessage(msg);
    setIsSuccess(true);
    setIsVisible(true);
    onRefreshCategories();
  };

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Category</h5>
          </div>
          <div className="modal-body">
            <AlertMessage
              message={message}
              isSuccess={isSuccess}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
            <EditCategoryForm
              category={category}
              setSubmitForm={submitFormRef}
              setLoadingUpdate={setLoadingUpdate}
              onCategoryUpdated={handleShowAlertMessage}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loadingUpdate}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => submitFormRef.current?.()}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <>
                  <SpinnerSmall /> Updating...
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

export default EditCategoryModal;
