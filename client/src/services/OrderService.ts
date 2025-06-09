import AxiosInstance from "../AxiosInstance";

const OrderService = {
  // Place a new order
  storeOrder: async (data: any) => {
    return AxiosInstance.post("/storeOrder", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  // Get a single order by ID
  getOrder: async (orderId: number) => {
    return AxiosInstance.get(`/getOrder/${orderId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  // (Optional) Get all orders
  loadOrders: async () => {
    return AxiosInstance.get("/loadOrders")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default OrderService;
