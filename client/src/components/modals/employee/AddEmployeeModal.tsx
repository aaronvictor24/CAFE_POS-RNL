import { useRef, useState } from "react";
import AddEmployeeForm from "../../forms/employee/AddEmployeeForm";
import AlertMessage from "../../AlertMessage";
import SpinnerSmall from "../../SpinnerSmall";

interface AddEmployeeModalProps {
  showModal: boolean;
  onRefreshEmployees: (shouldRefresh: boolean) => void;
  onClose: () => void;
}

const AddEmployeeModal = ({
  showModal,
  onRefreshEmployees,
  onClose,
}: AddEmployeeModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const [loadingStore, setLoadingStore] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setisSuccess] = useState(false);
  const [isVisible, setisVisible] = useState(false);

  const handleShowAlertMessage = (
    message: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(message);
    setisSuccess(isSuccess);
    setisVisible(isVisible);
  };

  const handleCloseAlterMessage = () => {
    setMessage("");
    setisSuccess(false);
    setisVisible(false);
  };

  return (
    <>
      <div
        className={`modal fade ${showModal ? "show d-block" : ""} `}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Add Employee</h1>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <AlertMessage
                  message={message}
                  isSuccess={isSuccess}
                  isVisible={isVisible}
                  onClose={handleCloseAlterMessage}
                />
              </div>
              <AddEmployeeForm
                setSubmitForm={submitFormRef}
                setLoadingStore={setLoadingStore}
                onEmployeeAdded={(message) => {
                  handleShowAlertMessage(message, true, true);
                  setRefreshEmployees(!refreshEmployees);
                  onRefreshEmployees(refreshEmployees);
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
    </>
  );
};

export default AddEmployeeModal;
