import { useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import DeleteGenderForm from "../../components/forms/gender/DeleteGenderForm";
import MainLayout from "../layout/MainLayout";

const DeleteGender = () => {
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
  const content = (
    <>
      <AlertMessage
        message={message}
        isSuccess={isSuccess}
        isVisible={isVisible}
        onClose={handleCloseAlterMessage}
      />
      <div className="d-flex justify-content-center">
        <div className="col-md-3">
          <DeleteGenderForm
            onDeleteGender={(message) =>
              handleShowAlertMessage(message, true, true)
            }
          />
        </div>
      </div>
    </>
  );
  return <MainLayout content={content} />;
};
export default DeleteGender;
