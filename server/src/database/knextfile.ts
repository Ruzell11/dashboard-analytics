import * as dotenv from "dotenv";


dotenv.config();

// MySQL Configuration for Knex
export const knexConfig = {
    client: "mysql2",  // Use mysql2 for MySQL database connections
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
};