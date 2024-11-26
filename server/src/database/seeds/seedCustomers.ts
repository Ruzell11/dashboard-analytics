import { knexConnection } from "..";
import { sampleCustomers } from "../data/customers";

// Function to seed the `customers` table with sample data
export async function seedCustomersTable() {
    try {
        for (const customer of sampleCustomers) {
            await knexConnection("customers").insert(customer).onConflict("id").ignore();
        }

        console.log("Sample customers inserted successfully.");
    } catch (error) {
        console.error("Error seeding customers table:", error);
    }
}
