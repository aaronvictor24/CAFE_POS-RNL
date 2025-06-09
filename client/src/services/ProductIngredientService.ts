import AxiosInstance from "../AxiosInstance";

const ProductIngredientService = {
  loadProductIngredients: async (productId: number) => {
    return AxiosInstance.get(`/loadProductIngredients/${productId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  storeProductIngredient: async (data: any) => {
    return AxiosInstance.post("/storeProductIngredient", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  updateProductIngredient: async (productIngredientId: number, data: any) => {
    return AxiosInstance.put(
      `/updateProductIngredient/${productIngredientId}`,
      data
    )
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  destroyProductIngredient: async (productIngredientId: number) => {
    return AxiosInstance.put(`/destroyProductIngredient/${productIngredientId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default ProductIngredientService;
