import { useEffect, useState } from "react";
import LowStockAlert from "./LowStockAlert";
import IngredientService from "../services/IngredientService";
import { Spinner } from "react-bootstrap";
import type { Ingredients } from "../interfaces/Ingredients";
import DashboardService from "../services/DashboardService";
import DailySalesModal from "./modals/DailySalesModal";

const Dashboard = () => {
  const [inventory, setInventory] = useState({
    loading: true,
    ingredients: [] as Ingredients[],
  });

  const [stats, setStats] = useState({
    loading: true,
    totalSales: 0,
    productsSold: 0,
    transactions: 0,
    dailySales: 0,
  });

  const [showModal, setShowDailyModal] = useState(false);
  const [yesterdayOrders, setYesterdayOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const handleShowDailyModal = () => {
    setShowDailyModal(true);
    setLoadingOrders(true);
    DashboardService.getYesterdaySales()
      .then(res => {
        setYesterdayOrders(res.data.orders || []);
        setLoadingOrders(false);
      })
      .catch(() => setLoadingOrders(false));
  }

  const handleLoadIngredients = () => {
    IngredientService.loadIngredients()
      .then((res) => {
        setInventory({
          loading: false,
          ingredients: res.data.ingredients,
        });
      })
      .catch(() => {
        setInventory({
          loading: false,
          ingredients: [],
        });
      });
  };

  const handleLoadStats = () => {
    DashboardService.loadSummary()

      .then((res) => {
        setStats({
          loading: false,
          totalSales: res.data.total_sales,
          productsSold: res.data.products_sold,
          transactions: res.data.transactions,
          dailySales: res.data.daily_sales,
        });
      })
      .catch(() => {
        setStats((prev) => ({ ...prev, loading: false }));
      });
  };

  useEffect(() => {
    handleLoadIngredients();
    handleLoadStats();
  }, []);

  return (
    <div className="container-fluid min-vh-100 py-4 px-4 bg-light">
      <LowStockAlert />

      {/* Dashboard Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="card-title text-muted">Total Sales</h6>
              <h2 className="card-text text-primary">
                {stats.loading ? <Spinner size="sm" /> : `₱${(stats.totalSales ?? 0).toLocaleString()}`}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="card-title text-muted">Products Sold</h6>
              <h2 className="card-text text-success">
                {stats.loading ? <Spinner size="sm" /> : `${(stats.productsSold ?? 0).toLocaleString()}`}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="card-title text-muted">Transactions</h6>
              <h2 className="card-text text-info">
                {stats.loading ? <Spinner size="sm" /> : `${(stats.transactions ?? 0).toLocaleString()}`}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0 cursor-pointer" onClick={handleShowDailyModal}>
            <div className="card-body text-center">
              <h6 className="card-title text-muted">24 hours Sales</h6>
              <h2 className="card-text text-danger">
                {stats.loading ? <Spinner size="sm" /> : `₱${(stats.dailySales ?? 0).toLocaleString()}`}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <DailySalesModal
        show={showModal}
        onClose={() => setShowDailyModal(false)}
        orders={yesterdayOrders}
        loading={loadingOrders}
      />

      <div className="border bg-white p-4 rounded shadow-sm mt-4">
        <h4 className="mb-3 text-primary">Inventory Record</h4>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Stock</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.loading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              ) : inventory.ingredients.length > 0 ? (
                inventory.ingredients.map((item) => (
                  <tr key={item.ingredient_id}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.quantity_in_stock)}</td>
                    <td>{item.unit}</td>
                    <td>
                      <span className={
                        item.quantity_in_stock > 500 ? "badge bg-success" :
                          item.quantity_in_stock > 450 ? "badge bg-warning text-dark" :
                            "badge bg-danger"
                      }>
                        {item.quantity_in_stock > 500 ? "In Stock" :
                          item.quantity_in_stock > 450 ? "Low" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted">No inventory records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h4 className="text-center mb-0 text-muted">Welcome to your POS Dashboard!</h4>
      </div>
    </div>
  );
};

export default Dashboard;