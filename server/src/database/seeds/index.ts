import seedActivityLogs from "./seedActivtiyLogs";
import { seedCustomersTable } from "./seedCustomers";
import { seedSalesTable } from "./seedSales";


async function seed() {
    try {
        // Initialize the tables
        await seedActivityLogs();
        await seedCustomersTable();
        await seedSalesTable();
    } catch (error) {
        console.error("Error while seeding data:", error);
    }
}

export { seed }