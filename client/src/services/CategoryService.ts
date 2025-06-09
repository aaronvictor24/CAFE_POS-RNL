import AxiosInstance from "../AxiosInstance";

const CategoryService = {
  loadCategories: async () => {
    return AxiosInstance.get("/loadCategories")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  getCategory: async (categoryId: number) => {
    return AxiosInstance.get(`/getCategory/${categoryId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  storeCategory: async (data: any) => {
    return AxiosInstance.post("/storeCategory", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  updateCategory: async (categoryId: number, data: any) => {
    return AxiosInstance.put(`/updateCategory/${categoryId}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  destroyCategory: async (categoryId: number) => {
    return AxiosInstance.put(`/destroyCategory/${categoryId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default CategoryService;
