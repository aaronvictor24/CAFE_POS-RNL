import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Employees } from "../../../interfaces/Employees";
import type { EmployeeFieldErrors } from "../../../interfaces/EmployeeFieldErrors";
import type { Genders } from "../../../interfaces/Genders";
import ErrorHandler from "../../../handler/ErrorHandler";
import GenderService from "../../../services/GenderService";
import EmployeeService from "../../../services/EmployeeService";

interface EditEmployeeFormProps {
  employee: Employees | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onEmployeeUpdated: (message: string) => void;
}

const EditEmployeeForm = ({
  employee,
  setSubmitForm,
  setLoadingUpdate,
  onEmployeeUpdated,
}: EditEmployeeFormProps) => {
  const [state, setState] = useState({
    loadingGenders: true,
    genders: [] as Genders[],
    employee_id: 0,
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix_name: "",
    birth_date: "",
    gender: "",
    address: "",
    contact_number: "",
    role: "",
    email: "",
    errors: {} as EmployeeFieldErrors,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleLoadGenders = () => {
    GenderService.loadGenders()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            genders: res.data.genders,
          }));
        } else {
          console.error(
            "Unexpected status error while loading genders: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingGenders: false,
        }));
      });
  };

  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();

    setLoadingUpdate(true);

    EmployeeService.updateEmployee(state.employee_id, state)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            errors: {} as EmployeeFieldErrors,
          }));
          onEmployeeUpdated(res.data.message);
        } else {
          console.error(
            "Unexpected status error while updating employee: ",
            res.status
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    handleLoadGenders();

    if (employee) {
      setState((prevState) => ({
        ...prevState,
        employee_id: employee.employee_id ?? 0,
        first_name: employee.first_name,
        middle_name: employee.middle_name,
        last_name: employee.last_name,
        suffix_name: employee.suffix_name,
        birth_date: employee.birth_date,
        gender: employee.gender.gender_id.toString(),
        address: employee.address,
        contact_number: employee.contact_number,
        role: employee.role,
        email: employee.email,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        employee_id: 0,
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix_name: "",
        birth_date: "",
        gender: "",
        address: "",
        contact_number: "",
        role: "",
        email: "",
        errors: {} as EmployeeFieldErrors,
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
      <form ref={formRef} onSubmit={handleUpdateEmployee}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.first_name ? "is-invalid" : ""
                }`}
                name="first_name"
                id="first_name"
                value={state.first_name}
                onChange={handleInputChange}
              />
              {state.errors.first_name && (
                <span className="text-danger">
                  {state.errors.first_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.middle_name ? "is-invalid" : ""
                }`}
                name="middle_name"
                id="middle_name"
                value={state.middle_name}
                onChange={handleInputChange}
              />
              {state.errors.middle_name && (
                <span className="text-danger">
                  {state.errors.middle_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.last_name ? "is-invalid" : ""
                }`}
                name="last_name"
                id="last_name"
                value={state.last_name}
                onChange={handleInputChange}
              />
              {state.errors.last_name && (
                <span className="text-danger">{state.errors.last_name[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="suffix_name">Suffix Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.suffix_name ? "is-invalid" : ""
                }`}
                name="suffix_name"
                id="suffix_name"
                value={state.suffix_name}
                onChange={handleInputChange}
              />
              {state.errors.suffix_name && (
                <span className="text-danger">
                  {state.errors.suffix_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                className={`form-control ${
                  state.errors.birth_date ? "is-invalid" : ""
                }`}
                name="birth_date"
                id="birth_date"
                value={state.birth_date}
                onChange={handleInputChange}
              />
              {state.errors.birth_date && (
                <span className="text-danger">
                  {state.errors.birth_date[0]}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select
                className={`form-control ${
                  state.errors.gender ? "is-invalid" : ""
                }`}
                name="gender"
                id="gender"
                value={state.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                {state.loadingGenders ? (
                  <option value="">Loading...</option>
                ) : (
                  state.genders.map((gender, index) => (
                    <option value={gender.gender_id} key={index}>
                      {gender.gender}
                    </option>
                  ))
                )}
              </select>
              {state.errors.gender && (
                <span className="text-danger">{state.errors.gender[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.address ? "is-invalid" : ""
                }`}
                name="address"
                id="address"
                value={state.address}
                onChange={handleInputChange}
              />
              {state.errors.address && (
                <span className="text-danger">{state.errors.address[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contact_number">Contact Number</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.contact_number ? "is-invalid" : ""
                }`}
                name="contact_number"
                id="contact_number"
                value={state.contact_number}
                onChange={handleInputChange}
              />
              {state.errors.contact_number && (
                <span className="text-danger">
                  {state.errors.contact_number[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.email ? "is-invalid" : ""
                }`}
                name="email"
                id="email"
                value={state.email}
                onChange={handleInputChange}
              />
              {state.errors.email && (
                <span className="text-danger">{state.errors.email[0]}</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditEmployeeForm;
