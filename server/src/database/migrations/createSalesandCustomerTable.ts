import { knexConnection } from "..";

// Function to create the sales and customers tables only if they don't exist
export async function createSalesAndCustomersTables() {
    try {
        const tableExists = await knexConnection.schema.hasTable("customers");
        if (!tableExists) {
            // Create customers table
            await knexConnection.schema.createTable("customers", (table) => {
                table.increments("id").primary();
                table.string("name").notNullable();
                table.string("email").unique().notNullable(); 
                table.string("phone_number"); 
                table.timestamps(true, true);
            });

            console.log("Customers table created successfully.");
        } else {
            console.log("Customers table already exists.");
        }

        // Similarly check for sales table existence
        const salesTableExists = await knexConnection.schema.hasTable("sales");
        if (!salesTableExists) {
            // Create sales table with foreign key reference to customers table
            await knexConnection.schema.createTable("sales", (table) => {
                table.increments("id").primary(); 
                table.integer("total_sales").notNullable(); 
                table.date("sale_date").notNullable();
                table.integer("customer_id").unsigned().notNullable(); 
                table.foreign("customer_id").references("id").inTable("customers"); 
                table.timestamps(true, true);
            });

            console.log("Sales table created successfully.");
        } else {
            console.log("Sales table already exists.");
        }
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}
