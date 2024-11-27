import { useMemo } from "react";
import { useDashboardContext } from "../store";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for Sales and its data
interface Sale {
    sale_date: string;
    total_sales: number;
}


export default function SalesChart() {
    const {
        sales: salesData,
        startDateSales: startDate,
        setStartDateSales: setStartDate,
        endDateSales: endDate,
        setEndDateSales: setEndDate,
    } = useDashboardContext();

    // Use memoization to prevent recalculating sales data on every render
    const filteredSales = useMemo(() => {
        if (!salesData?.data) return [];

        const { recentSales } = salesData.data;
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return recentSales.filter((sale: Sale) => {
            const saleDate = new Date(sale.sale_date);
            return (
                (!start || saleDate >= start) && (!end || saleDate <= end)
            );
        });
    }, [salesData?.data, startDate, endDate]);

    // Use memoization for chart data calculation
    const chartData = useMemo(() => {
        if (!salesData?.data || filteredSales.length === 0) return null;

        const totalSales = filteredSales.reduce(
            (acc: number, sale: Sale) => acc + sale.total_sales,
            0
        );

        return {
            labels: ["Total Sales", "Remaining Sales"],
            datasets: [
                {
                    label: "Sales Breakdown",
                    data: [
                        totalSales,
                        salesData.data.totalSales - totalSales,
                    ], // Show the total sales and remaining sales
                    backgroundColor: [
                        "rgb(75, 192, 192)", // Color for Total Sales
                        "rgb(255, 99, 132)", // Color for Remaining Sales
                    ],
                    hoverOffset: 4,
                },
            ],
        };
    }, [salesData?.data, filteredSales]);

    if (salesData?.isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <h2 className="text-lg text-gray-500">Loading...</h2>
            </div>
        );
    }

    if (filteredSales.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <h2 className="text-lg text-gray-500">
                    No sales data available for the selected date range.
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Sales Breakdown
            </h1>

            {/* Date Range Filters */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <div className="flex flex-col items-start">
                    <label
                        htmlFor="startDate"
                        className="text-sm font-medium text-gray-600"
                    >
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
                    <label
                        htmlFor="endDate"
                        className="text-sm font-medium text-gray-600"
                    >
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

            {/* Doughnut Chart */}
            <div className="bg-white shadow rounded-lg p-6">
                {chartData && (
                    <div className="flex justify-center">
                        <Doughnut data={chartData} />
                    </div>
                )}
            </div>
        </div>
    );
}
