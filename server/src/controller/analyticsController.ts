import { connectToMongoDB, knexConnection } from "../database";
import { Request, Response } from "express";

// Fetch sales data and aggregate from MySQL
export const getSalesMetrics = async (req: Request, res: Response) => {
    try {
        // Fetch total sales, customers, and recent sales
        const [totalSales] = await knexConnection("sales")
            .sum("total_sales as totalSales");
        const [customerCount] = await knexConnection("customers")
            .count("id as customerCount");
        const recentSales = await knexConnection("sales")
            .select("sale_date", "total_sales")
            .orderBy("sale_date", "desc")
            .limit(10);

        res.status(200).json({
            totalSales: totalSales.totalSales || 0,
            customerCount: customerCount.customerCount || 0,
            recentSales,
        });
    } catch (error) {
        console.error("Error fetching sales metrics:", error);
        res.status(500).json({ error: "Failed to fetch sales metrics" });
    }
};

// Fetch user activity logs and aggregate from MongoDB
export const getActivityMetrics = async (req: Request, res: Response) => {
    try {
        const { db } = await connectToMongoDB(); 
        const logsCollection = db.collection("userActivityLogs");

        const activityStats = await logsCollection
            .aggregate([
                { $group: { _id: "$activityType", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ])
            .toArray();

        const recentActivities = await logsCollection
            .find({})
            .sort({ timestamp: -1 })
            .limit(10)
            .toArray();

        res.status(200).json({
            activityStats,
            recentActivities,
        });
    } catch (error) {
        console.error("Error fetching activity metrics:", error);
        res.status(500).json({ error: "Failed to fetch activity metrics" });
    }
};

// Combine sales and activity metrics for analytics dashboard
export const getAnalyticsData = async (req: Request, res: Response) => {
    try {
        // Fetch sales data
        const [salesData] = await knexConnection("sales").sum("total_sales as totalSales");
        const [customerCount] = await knexConnection("customers").count("id as customerCount");

        // Fetch activity logs
        const { db } = await connectToMongoDB(); // Connect to MongoDB
        const logsCollection = db.collection("userActivityLogs");

        const activityStats = await logsCollection
            .aggregate([
                { $group: { _id: "$activityType", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ])
            .toArray();

        res.status(200).json({
            totalSales: salesData.totalSales || 0,
            customerCount: customerCount.customerCount || 0,
            activityStats,
        });
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        res.status(500).json({ error: "Failed to fetch analytics data" });
    }
};
