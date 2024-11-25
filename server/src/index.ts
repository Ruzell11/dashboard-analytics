import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initializeDatabaseConnections } from "./database";
import initializeTables from "./database/migrations";
import { seed } from "./database/seeds";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Function to initialize databases and tables once
async function initializeServer() {
  try {
    // Initialize database connections only once
    // await initializeDatabaseConnections();

    // Initialize tables only if not already created
    await initializeTables();

    // Seed data only if needed
    await seed();
  } catch (error) {
    console.error("Error initializing the server:", error);
  }
}

initializeServer();
