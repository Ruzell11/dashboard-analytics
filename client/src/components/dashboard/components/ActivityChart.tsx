import { useMemo } from "react";
import { useDashboardContext } from "../store";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for Activity and its data
interface ActivityDetail {
    productId?: string;
    productName?: string;
    searchQuery?: string;
    orderId?: string;
    items?: { productId: string; productName: string; quantity: number }[];
    totalAmount?: number;
}

interface RecentActivity {
    _id: string;
    customerId: number;
    userId: string;
    activityType: string;
    details: ActivityDetail;
    timestamp: string;
}

interface ActivityData {
    recentActivities: RecentActivity[];
}

export default function ActivityChart() {
    const { 
        activity, 
        startDateActivity: startDate, 
        setStartDateActivity: setStartDate, 
        endDateActivity: endDate, 
        setEndDateActivity: setEndDate 
    } = useDashboardContext();

    // Type assertions for activity data
    const activityData: ActivityData | undefined = activity?.data;

    // Extract recentActivities from activityData
    const recentActivities = activityData?.recentActivities || [];

    // Memoize filtered activities to avoid recomputation on every render
    const filteredActivities = useMemo(() => {
        return recentActivities.filter((activity) => {
            const activityDate = new Date(activity.timestamp);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            return (
                (!start || activityDate >= start) && (!end || activityDate <= end)
            );
        });
    }, [recentActivities, startDate, endDate]);

    // Memoize activity counts to avoid recomputation on every render
    const activityCounts = useMemo(() => {
        return filteredActivities.reduce((acc: Record<string, number>, activity: RecentActivity) => {
            const activityType = activity.activityType;
            acc[activityType] = (acc[activityType] || 0) + 1;
            return acc;
        }, {});
    }, [filteredActivities]);

    // Prepare Pie Chart Data
    const data = useMemo(() => ({
        labels: Object.keys(activityCounts), // Extract activity types as labels
        datasets: [
            {
                label: "Activity Breakdown",
                data: Object.values(activityCounts), // Extract activity counts as data
                backgroundColor: [
                    "rgb(255, 99, 132)", // Color for viewed_product
                    "rgb(54, 162, 235)", // Color for added_to_cart
                    "rgb(255, 205, 86)", // Color for searched
                    "rgb(75, 192, 192)", // Color for purchased
                ],
                hoverOffset: 4,
            },
        ],
    }), [activityCounts]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                User Activity Breakdown
            </h1>

            {/* Date Range Filters */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <div className="flex flex-col items-start">
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-600">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-48 text-gray-700"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-600">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-48 text-gray-700"
                    />
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow rounded-lg p-6">
                {activity?.isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <h2 className="text-lg text-gray-500">Loading...</h2>
                    </div>
                ) : filteredActivities.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <h2 className="text-lg text-gray-500">
                            No data available for the selected date range.
                        </h2>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Pie data={data} />
                    </div>
                )}
            </div>
        </div>
    );
}
