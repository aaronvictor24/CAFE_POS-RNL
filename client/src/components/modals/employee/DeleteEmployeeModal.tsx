import { useRef, useState } from "react";
import AlertMessage from "../../AlertMessage";
import DeleteEmployeeForm from "../../forms/employee/DeleteEmployeeForm";
import SpinnerSmall from "../../SpinnerSmall";
import type { Employees } from "../../../interfaces/Employees";

interface DeleteEmployeeModalProps {
  showModal: boolean;
  employee: Employees | null;
  onRefreshEmployees: (refresh: boolean) => void;
  onClose: () => void;
}

const DeleteEmployeeModal = ({
  showModal,
  employee,
  onRefreshEmployees,
  onClose,
}: DeleteEmployeeModalProps) => {
  const submitFormRef = useRef<() => void | null>(null);

  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const [loadingDestroy, setLoadingDestroy] = useState(false);

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
              <h1 className="modal-title fs-5">Delete Employee</h1>
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
              <p className="fs-4">Are you sure you want to delete this user?</p>
              <DeleteEmployeeForm
                employee={employee}
                setSubmitForm={submitFormRef}
                setLoadingDestroy={setLoadingDestroy}
                onDeleteEmployee={(message) => {
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
                    <SpinnerSmall /> Deleting Employee...
                  </>
                ) : (
                  "Delete Employee"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEmployeeModal;
