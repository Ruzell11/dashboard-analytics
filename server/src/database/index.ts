import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import knex, { Knex } from "knex";
import { knexConfig } from "./knextfile";

dotenv.config();

// MongoDB Configuration
const MONGODB_URI = process.env.MONGODB_URI!;


// Knex MySQL connection instance
export let knexConnection: Knex;

/**
 * Connect to MongoDB and set up the "user activity logs" collection
 */
export async function connectToMongoDB(): Promise<{ client: mongoDB.MongoClient; db: mongoDB.Db }> {
    try {
        const mongoClient = new mongoDB.MongoClient(MONGODB_URI);
        await mongoClient.connect();

        const db = mongoClient.db(process.env.MONGODB_USER_ACTIVITY_DB);

        console.log(`Successfully connected to MongoDB database: ${db.databaseName}`);
        return { client: mongoClient, db };
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

/**
 * Connect to MySQL database using Knex
 */
export async function connectToMySQL() {
    try {
        knexConnection = knex(knexConfig); // Initialize Knex with the configuration
        await knexConnection.raw("SELECT 1"); // Simple query to check if the connection is working
        console.log(`Successfully connected to MySQL database: ${process.env.MYSQL_DATABASE}`);
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
        throw error;
    }
}

/**
 * Initialize connections for both MongoDB and MySQL
 */
export async function initializeDatabaseConnections(): Promise<void> {
    try {
        await connectToMongoDB();
        await connectToMySQL();
    } catch (error) {
        console.error("Error initializing database connections:", error);
        throw error;
    }
}
