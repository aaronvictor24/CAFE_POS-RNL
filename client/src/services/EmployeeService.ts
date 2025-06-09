import AxiosInstance from "../AxiosInstance";

const EmployeeService = {
  loadEmployees: async () => {
    return AxiosInstance.get("/loadEmployees")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  storeEmployee: async (data: any) => {
    return AxiosInstance.post("/storeEmployee", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  updateEmployee: async (employeeId: number, data: any) => {
    return AxiosInstance.put(`/updateEmployee/${employeeId}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  destroyEmployee: async (employeeId: number) => {
    return AxiosInstance.put(`/destroyEmployee/${employeeId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default EmployeeService;
