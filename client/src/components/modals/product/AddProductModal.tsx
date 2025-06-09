import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";
import AddProductForm from "../../forms/product/AddProductForm";

interface AddProductModalProps {
  showModal: boolean;
  onRefreshProducts: (shouldRefresh: boolean) => void;
  onClose: () => void;
}

const AddProductModal = ({
  showModal,
  onRefreshProducts,
  onClose,
}: AddProductModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshProducts, setRefreshProducts] = useState(false);
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
            <h1 className="modal-title fs-5">Add Product</h1>
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
            <AddProductForm
              setSubmitForm={submitFormRef}
              setLoadingStore={setLoadingStore}
              onProductAdded={(message) => {
                handleShowAlertMessage(message, true, true);
                setRefreshProducts(!refreshProducts);
                onRefreshProducts(refreshProducts);
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

export default AddProductModal;
