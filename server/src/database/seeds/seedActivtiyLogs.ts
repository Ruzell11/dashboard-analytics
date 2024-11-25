import { connectToMongoDB } from "..";
import { userActivityLogs } from "../data/activity-logs";
const COLLECTION_NAME = "userActivityLogs";

export default async function seedActivityLogs() {
    const { client, db } = await connectToMongoDB();

    try {
        const collection = db.collection(COLLECTION_NAME);

        // Check if the collection is empty
        const count = await collection.countDocuments();

        if (count === 0) {
            console.log("Collection is empty, seeding data...");
            // Insert sample data only if collection is empty
            const result = await collection.insertMany(userActivityLogs);
            console.log(`Inserted ${result.insertedCount} documents into userActivityLogs collection`);
        } else {
            console.log("Collection already contains data, skipping seeding.");
        }
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close(); // Ensure client is closed once
        console.log("Database connection closed");
    }
}
