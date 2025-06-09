import { useEffect, useState } from "react";
import EmployeeService from "../../../services/EmployeeService";
import ErrorHandler from "../../../handler/ErrorHandler";
import type { Employees } from "../../../interfaces/Employees";
import { Spinner } from "react-bootstrap";

interface EmployeeTable {
  refreshEmployees: boolean;
  onEditEmployee: (employee: Employees) => void;
  onDeleteEmployee: (employee: Employees) => void;
}

const EmployeesTable = ({
  refreshEmployees,
  onEditEmployee,
  onDeleteEmployee,
}: EmployeeTable) => {
  const [state, setState] = useState({
    loadingEmployees: true,
    employees: [] as Employees[],
  });

  const handleLoadEmployees = () => {
    EmployeeService.loadEmployees()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            employees: res.data.employees,
          }));
        } else {
          console.error(
            "Unexpected error while loading employees: ",
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
          loadingEmployees: false,
        }));
      });
  };

  const handleEmployeesFullName = (employee: Employees) => {
    let fullName = "";

    if (employee.middle_name) {
      fullName = `${employee.last_name}, ${
        employee.first_name
      } ${employee.middle_name.charAt(0)}.`;
    } else {
      fullName = `${employee.last_name}, ${employee.first_name}`;
    }

    if (employee.suffix_name) {
      fullName += `${employee.suffix_name}`;
    }
    return fullName;
  };

  useEffect(() => {
    handleLoadEmployees();
  }, [refreshEmployees]);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Birth Day</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingEmployees ? (
            <tr className="align-middle">
              <td colSpan={8}>
                <Spinner />
              </td>
            </tr>
          ) : state.employees.length > 0 ? (
            state.employees.map((employee, index) => (
              <tr className="align-middle" key={index}>
                <td>{index + 1}</td>
                <td>{handleEmployeesFullName(employee)}</td>
                <td>{employee.gender.gender}</td>
                <td>{employee.birth_date}</td>
                <td>{employee.address}</td>
                <td>{employee.contact_number}</td>
                <td>{employee.role}</td>
                <td>{employee.email}</td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => onEditEmployee(employee)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDeleteEmployee(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="align-middle">
              <td colSpan={8} className="text-center">
                No Employee Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default EmployeesTable;
