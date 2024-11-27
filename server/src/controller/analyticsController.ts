import { connectToMongoDB, knexConnection } from "../database";
import { Request, Response } from "express";

// Helper function to safely get date query parameters
const getDateQueryParam = (query: any, param: string): Date | undefined => {
    const value = query[param];
    if (Array.isArray(value)) {
        // If it's an array, get the first value (or handle as needed)
        return new Date(value[0]);
    }
    return value ? new Date(value) : undefined;
};

// Fetch sales data and aggregate from MySQL
export const getSalesMetrics = async (req: Request, res: Response) => {
    try {
        // Extract filter parameters from the request
        const startDate = getDateQueryParam(req.query, "startDate");
        const endDate = getDateQueryParam(req.query, "endDate");

        // Build the query with date range filter
        let salesQuery = knexConnection("sales").sum("total_sales as totalSales");
        let customerQuery = knexConnection("customers").count("id as customerCount");

        if (startDate && endDate) {
            salesQuery = salesQuery.whereBetween("sale_date", [startDate, endDate]);
        }

        const [totalSales] = await salesQuery;
        const [customerCount] = await customerQuery;

        const recentSalesQuery = knexConnection("sales")
            .select("sale_date", "total_sales")
            .orderBy("sale_date", "desc")
            .limit(10);

        if (startDate && endDate) {
            recentSalesQuery.whereBetween("sale_date", [startDate, endDate]);
        }

        const recentSales = await recentSalesQuery;

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

        // Extract filter parameters from the request
        const startDate = getDateQueryParam(req.query, "startDate");
        const endDate = getDateQueryParam(req.query, "endDate");

        const matchStage: any = {};
        if (startDate) matchStage.timestamp = { $gte: startDate };
        if (endDate) matchStage.timestamp = { ...matchStage.timestamp, $lte: endDate };

        // Fetch activity stats
        const activityStats = await logsCollection
            .aggregate([
                { $match: matchStage },
                { $group: { _id: "$activityType", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ])
            .toArray();

        // Fetch recent activities
        const recentActivities = await logsCollection
            .find(matchStage)
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
        // Extract filter parameters from the request
        const { startDate, endDate, activityType } = req.query;

        // Fetch sales data with optional date range filter
        const start = getDateQueryParam(req.query, "startDate");
        const end = getDateQueryParam(req.query, "endDate");

        let salesQuery = knexConnection("sales").sum("total_sales as totalSales");
        let customerQuery = knexConnection("customers").count("id as customerCount");

        if (start && end) {
            salesQuery = salesQuery.whereBetween("sale_date", [start, end]);
        }

        const [salesData] = await salesQuery;
        const [customerCount] = await customerQuery;

        // Fetch activity logs with optional filters
        const { db } = await connectToMongoDB();
        const logsCollection = db.collection("userActivityLogs");

        let pipeline: any[] = [
            { $group: { _id: "$activityType", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ];

        // Optional activity type filter
        if (activityType) {
            pipeline.push({ $match: { activityType } });
        }

        // Optional date range filter for MongoDB aggregation
        if (start && end) {
            pipeline.push({
                $match: {
                    timestamp: { $gte: new Date(start), $lte: new Date(end) },
                },
            });
        }

        const activityStats = await logsCollection.aggregate(pipeline).toArray();

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
