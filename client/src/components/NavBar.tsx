import { Link } from "react-router-dom";

const NavBar = () => {
  const menuItems = [
    {
      route: "/employees",
      title: "Employee",
    },
    {
      route: "/gender",
      title: "Gender",
    },
  ];
  return (
    <>
      <div className="container bg-body-secondary p-3">
        <ul className=" nav nav-pills nav-justified flex-sm-row">
          {menuItems.map((menuItem, index) => (
            <li className="nav-item" key={index}>
              <Link
                className=" nav-link active"
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

export default NavBar;
