import { connectToMySQL } from "..";
import { createSalesAndCustomersTables } from "./createSalesandCustomerTable";


export default async function initializeTables() {
    try {
        // Initialize the tables
        await connectToMySQL();
        await createSalesAndCustomersTables();
    } catch (error) {
        console.error("Error while creating tables:", error);
    }
}


