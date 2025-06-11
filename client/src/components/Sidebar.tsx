import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ErrorHandler from "../handler/ErrorHandler";
import { FaBox, FaBoxes, FaCashRegister, FaHistory, FaSignOutAlt, FaTachometerAlt, FaTags, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [loadingLogout, setLoadingLogout] = useState(false);

  const menuItems = [
    { route: "/dashboard", title: "Dashboard", icon: <FaTachometerAlt /> },
    { route: "/points-of-sale", title: "Points of Sale", icon: <FaCashRegister /> },
    { route: "/inventory", title: "Inventory", icon: <FaBoxes /> },
    { route: "/employees", title: "Employees", icon: <FaUsers /> },
    { route: "/categories", title: "Categories", icon: <FaTags /> },
    { route: "/products", title: "Products", icon: <FaBox /> },
    { route: "/order-history", title: "Order History", icon: <FaHistory /> },
  ];

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();

    setLoadingLogout(true);

    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setLoadingLogout(false);
      });
  };

  // Move this outside so it's available in render
  const employee = localStorage.getItem("employee");
  const parsedEmployee = employee ? JSON.parse(employee) : null;

  const handleEmployeeFullName = () => {
    if (!parsedEmployee) return "";
    if (parsedEmployee.middle_name) {
      return `${parsedEmployee.last_name}, ${parsedEmployee.first_name}, ${parsedEmployee.middle_name[0]}.`;
    } else {
      return `${parsedEmployee.last_name}, ${parsedEmployee.first_name}`;
    }
  };

  return (
    <>
      <div className="border bg-light p-3 h-100 d-flex flex-column">
        <h5 className="mb-4 text-center fw-bold">☕ Bitter Sweet Cafe</h5>
        <div className="d-flex align-items-center mb-3">
          <div className="  text-white d-flex justify-content-center align-items-center" >
            {parsedEmployee ? parsedEmployee.first_name[0] : ""}
          </div>
          <div className="ms-2">
            <div className="badge bg-primary">{handleEmployeeFullName()}</div>
            <div className="text-muted" >Employee</div>
          </div>
        </div>
        <hr />
        <ul className="nav flex-column flex-grow-1">
          {menuItems.map((menuItem, index) => (
            <li className="nav-item" key={index}>
              <NavLink
                className={({ isActive }) => "nav-link d-flex align-items-center" + (isActive ? " active fw-bold text-primary" : "")}
                to={menuItem.route}
              >
                <span className="me-2">{menuItem.icon}</span>
                {menuItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <hr className="my-3" />
        <button
          type="button"
          className="btn btn-danger d-flex align-items-center justify-content-center w-100 py-2 fw-bold fs-5"
          onClick={handleLogout}
          disabled={loadingLogout}
        >
          <FaSignOutAlt className="me-2" />
          {loadingLogout ? <>Logging out...</> : "Logout"}
        </button>
      </div>
    </>
  );
}

export default Sidebar;