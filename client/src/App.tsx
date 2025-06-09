import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Genders from "./pages/gender/Genders";
import EditGender from "./pages/gender/EditGender";
import DeleteGender from "./pages/gender/DeleteGender";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Categories from "./pages/category/Categories";
import Products from "./pages/product/Products";
import Inventory from "./pages/inventory/Inventory";
import ManageProductIngredient from "./pages/inventory/ManageProductIngredient";
import POSPage from "./pages/POSPage/POSPage";
import Employees from "./pages/employee/Employees";
import OrderHistory from "./pages/orderHistory/OrderHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gender",
    element: (
      <ProtectedRoute>
        <Genders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gender/edit/:gender_id",
    element: (
      <ProtectedRoute>
        <EditGender />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gender/delete/:gender_id",
    element: (
      <ProtectedRoute>
        <DeleteGender />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees",
    element: (
      <ProtectedRoute>
        <Employees />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories",
    element: (
      <ProtectedRoute>
        <Categories />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory",
    element: (
      <ProtectedRoute>
        <Inventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/manage-product-ingredient/:productId",
    element: (
      <ProtectedRoute>
        <ManageProductIngredient />
      </ProtectedRoute>
    ),
  },
  {
    path: "/points-of-sale",
    element: (
      <ProtectedRoute>
        <POSPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-history",
    element: (
      <ProtectedRoute>
        <OrderHistory />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
