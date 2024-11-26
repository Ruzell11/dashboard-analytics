import { knexConnection } from "..";
import { sampleSales } from "../data/sales";

// Function to seed the `sales` table with sample data
export async function seedSalesTable() {
    try {
        for (const sale of sampleSales) {
            await knexConnection("sales").insert(sale);
        }

        console.log("Sample sales data inserted successfully.");
    } catch (error) {
        console.error("Error seeding sales table:", error);
    }
}
