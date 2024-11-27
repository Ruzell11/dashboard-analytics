import axios from "axios"
import { API_URL } from "../../config"

export const getSalesData = async (startDate?: string, endDate?: string) => {
    try {
        const params: Record<string, string> = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        const response = await axios.get(`${API_URL}/sales`);

        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const getActivityData = async (startDate?: string, endDate?: string) => {
    try {
        const params: Record<string, string> = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await axios.get(`${API_URL}/activity`, { params });
        return response.data;
    } catch (err) {
        console.error("Error fetching activity data:", err);
        throw err;
    }
};
