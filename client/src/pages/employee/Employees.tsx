import { useState } from "react";
import AddEmployeeModal from "../../components/modals/employee/AddEmployeeModal";
import NavBar from "../../components/NavBar";
import MainLayout from "../layout/MainLayout";
import EmployeesTable from "../../components/tables/user/EmployeesTable";
import type { Employees } from "../../interfaces/Employees";
import EditEmployeeModal from "../../components/modals/employee/EditEmployeeModal";
import DeleteEmployeeModal from "../../components/modals/employee/DeleteEmployeeModal";

const Employees = () => {
  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employees | null>(
    null
  );
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
  const [openDeleteEmployeeModal, setOpenDeleteEmployeeModal] = useState(false);

  const handleOpenEditEmployeeModal = (employee: Employees) => {
    setSelectedEmployee(employee);
    setOpenEditEmployeeModal(true);
  };
  const handleOpenDeleteEmployeeModal = (employee: Employees) => {
    setSelectedEmployee(employee);
    setOpenDeleteEmployeeModal(true);
  };

  const handleCloseDeleteEmployeeModal = () => {
    setSelectedEmployee(null);
    setOpenDeleteEmployeeModal(false);
  };

  const handleCloseEditEmployeeModal = () => {
    setSelectedEmployee(null);
    setOpenEditEmployeeModal(false);
  };

  const content = (
    <>
      <AddEmployeeModal
        showModal={openAddEmployeeModal}
        onRefreshEmployees={() => setRefreshEmployees(!refreshEmployees)}
        onClose={() => setOpenAddEmployeeModal(false)}
      />

      <EditEmployeeModal
        showModal={openEditEmployeeModal}
        employee={selectedEmployee}
        onRefreshEmployees={() => setRefreshEmployees(!refreshEmployees)}
        onClose={handleCloseEditEmployeeModal}
      />

      <DeleteEmployeeModal
        showModal={openDeleteEmployeeModal}
        employee={selectedEmployee}
        onRefreshEmployees={() => setRefreshEmployees(!refreshEmployees)}
        onClose={handleCloseDeleteEmployeeModal}
      />

      <div className="nav justify-content-center">
        <NavBar />
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => setOpenAddEmployeeModal(true)}
        >
          Add Employee
        </button>
      </div>

      <div className="container">
        <h1 className="text-center">Employees</h1>
        <div className="row">
          <div className="col-md-12">
            <EmployeesTable
              refreshEmployees={refreshEmployees}
              onEditEmployee={handleOpenEditEmployeeModal}
              onDeleteEmployee={handleOpenDeleteEmployeeModal}
            />
          </div>
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default Employees;
