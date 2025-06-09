import { useRef, useState } from "react";
import type { Employees } from "../../../interfaces/Employees";
import SpinnerSmall from "../../SpinnerSmall";
import EditEmployeeForm from "../../forms/employee/EditEmployeeForm";
import AlertMessage from "../../AlertMessage";

interface EditEmployeeModalProps {
  showModal: boolean;
  employee: Employees | null;
  onRefreshEmployees: (refresh: boolean) => void;
  onClose: () => void;
}

const EditEmployeeModal = ({
  showModal,
  employee,
  onRefreshEmployees,
  onClose,
}: EditEmployeeModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

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
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit User</h1>
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
              <EditEmployeeForm
                employee={employee}
                setSubmitForm={submitFormRef}
                setLoadingUpdate={setLoadingUpdate}
                onEmployeeUpdated={(message) => {
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
                    <SpinnerSmall /> Updating user...
                  </>
                ) : (
                  "Save User"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployeeModal;
