import AxiosInstance from "../AxiosInstance";

const ProductService = {
  loadProducts: async () => {
    return AxiosInstance.get("/loadProducts")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  getProduct: async (productId: number) => {
    return AxiosInstance.get(`/getProduct/${productId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  storeProduct: async (data: any) => {
    return AxiosInstance.post("/storeProduct", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  updateProduct: async (productId: number, data: any) => {
    return AxiosInstance.put(`/updateProduct/${productId}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  destroyProduct: async (productId: number) => {
    return AxiosInstance.put(`/destroyProduct/${productId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default ProductService;
