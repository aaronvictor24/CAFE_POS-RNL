import AxiosInstance from "../AxiosInstance";

const DashboardService = {
    loadSummary: async () => {
        return AxiosInstance.get("/dashboard/summary")
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    },
};

export default DashboardService;