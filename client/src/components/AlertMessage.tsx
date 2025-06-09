import { useEffect } from "react";

interface AlertMessageProps {
  message: string;
  isSuccess: boolean;
  isVisible: boolean;
  onClose: () => void;
  autoHide?: boolean;
}

const AlertMessage = ({
  message,
  isSuccess,
  isVisible,
  onClose,
  autoHide = true,
}: AlertMessageProps) => {
  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  return (
    <>
      <div
        className={`alert ${isSuccess ? "alert-success" : "alert-danger"} ${
          isVisible ? "show" : "d-none"
        } `}
        role="alert"
      >
        {message}
      </div>
    </>
  );
};
export default AlertMessage;
