import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ErrorHandler from "../handler/ErrorHandler";
import SpinnerSmall from "./SpinnerSmall";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [loadingLogout, setLoadingLogout] = useState(false);

  const menuItems = [
    {
      route: "/dashboard",
      title: "Dashboard",
    },
    {
      route: "/points-of-sale",
      title: "Points of Sale",
    },
    {
      route: "/inventory",
      title: "Inventory",
    },
    {
      route: "/employees",
      title: "Employees",
    },
    {
      route: "/categories",
      title: "Categories",
    },
    {
      route: "/products",
      title: "Products",
    },
    {
      route: "/order-history",
      title: "Order History",
    },
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

  const handleEmployeeFullName = () => {
    const employee = localStorage.getItem("employee");
    const parsedEmployee = employee ? JSON.parse(employee) : null;

    let fullName = "";

    if (parsedEmployee.middle_name) {
      fullName = `${parsedEmployee.last_name}, ${parsedEmployee.first_name}, ${parsedEmployee.middle_name[0]}.`;
    } else {
      fullName = `${parsedEmployee.last_name}, ${parsedEmployee.first_name}`;
    }

    return fullName;
  };

  return (
    <>
      <div className="border bg-light p-3 h-100">
        <h5 className="mb-4">Dela Torre Cafe</h5>
        {handleEmployeeFullName()}
        <ul className="nav flex-column ">
          <button
            type="submit"
            className="btn btn-danger mb-4"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
              <>
                <SpinnerSmall />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
          {menuItems.map((menuItem, index) => (
            <li className="nav-item" key={index}>
              <Link
                className="nav-link active"
                aria-current="page"
                to={menuItem.route}
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
