import AxiosInstance from "../AxiosInstance";

const IngredientService = {
  loadIngredients: async () => {
    return AxiosInstance.get("/loadIngredients")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  getIngredient: async (ingredientId: number) => {
    return AxiosInstance.get(`/getIngredient/${ingredientId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  storeIngredient: async (data: any) => {
    return AxiosInstance.post("/storeIngredient", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  updateIngredient: async (ingredientId: number, data: any) => {
    return AxiosInstance.put(`/updateIngredient/${ingredientId}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  destroyIngredient: async (ingredientId: number) => {
    return AxiosInstance.put(`/destroyIngredient/${ingredientId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  loadLowStockIngredients: async () => {
    return AxiosInstance.get("/ingredients/low-stock")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default IngredientService;
