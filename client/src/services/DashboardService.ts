import AxiosInstance from "../AxiosInstance";

const DashboardService = {
    loadSummary: async () => {
        return AxiosInstance.get("/dashboard/summary")
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    },

    getYesterdaySales: async () => {
        return AxiosInstance.get("/dashboard/yesterday-sales")
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    }
};

export default DashboardService;