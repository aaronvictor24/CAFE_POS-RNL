import { useRef, useState } from "react";
import SpinnerSmall from "../../SpinnerSmall";
import AlertMessage from "../../AlertMessage";
import EditProductForm from "../../forms/product/EditProductForm";
import type { Products } from "../../../interfaces/Product";

interface EditProductModalProps {
  showModal: boolean;
  product: Products | null;
  onRefreshProducts: (refresh: boolean) => void;
  onClose: () => void;
}

const EditProductModal = ({
  showModal,
  product,
  onRefreshProducts,
  onClose,
}: EditProductModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshProducts, setRefreshProducts] = useState(false);
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
            <h1 className="modal-title fs-5">Edit Product</h1>
          </div>
          <div className="modal-body">
            <AlertMessage
              message={message}
              isSuccess={isSuccess}
              isVisible={isVisible}
              onClose={handleCloseAlertMessage}
            />
            <EditProductForm
              product={product}
              setSubmitForm={submitFormRef}
              setLoadingUpdate={setLoadingUpdate}
              onProductUpdated={(message) => {
                handleShowAlertMessage(message, true, true);
                const refresh = !refreshProducts;
                setRefreshProducts(refresh);
                onRefreshProducts(refresh);
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
                  <SpinnerSmall /> Updating product...
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
