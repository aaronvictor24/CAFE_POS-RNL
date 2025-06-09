import { useEffect, useRef, useState, type FormEvent } from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import EmployeeService from "../../../services/EmployeeService";
import type { Employees } from "../../../interfaces/Employees";

interface DeleteEmployeeFormProps {
  employee: Employees | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeleteEmployee: (message: string) => void;
}

const DeleteEmployeeForm = ({
  employee,
  setSubmitForm,
  setLoadingDestroy,
  onDeleteEmployee,
}: DeleteEmployeeFormProps) => {
  const [state, setState] = useState({
    employee_id: 0,
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix_name: "",
    full_name: "",
  });

  const handleDestroyEmployee = (e: FormEvent) => {
    e.preventDefault();

    setLoadingDestroy(true);

    EmployeeService.destroyEmployee(state.employee_id)
      .then((res) => {
        if (res.status === 200) {
          onDeleteEmployee(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying employee: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setLoadingDestroy(false);
      });
  };

  const handleEmployeeFullName = (
    firstName: string,
    middleName: string,
    lastName: string,
    suffixName: string
  ) => {
    let fullName = "";

    if (middleName) {
      fullName = `${lastName}, ${firstName}, ${middleName.charAt(0)}. `;
    } else {
      fullName = `${lastName}, ${firstName}`;
    }

    if (suffixName) {
      fullName += `${suffixName}`;
    }

    return fullName;
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (employee) {
      setState((prevState) => ({
        ...prevState,
        employee_id: employee.employee_id,
        full_name: handleEmployeeFullName(
          employee.first_name,
          employee.middle_name,
          employee.last_name,
          employee.suffix_name
        ),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        employee_id: 0,
        full_name: "",
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [employee, setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleDestroyEmployee}>
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  id="full_name"
                  value={state.full_name}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeleteEmployeeForm;
