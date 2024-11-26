import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initializeDatabaseConnections } from "./database";
import initializeTables from "./database/migrations";
import { seed } from "./database/seeds";
import router from "./routes";

dotenv.config(); // Load environment variables at the very start

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON parsing (you can add more middlewares here)
app.use(express.json()); 

// Define your routes here
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.use('/api', router);

// Function to initialize databases and tables
async function initializeServer() {
  try {
    // Initialize tables only if not already created
    await initializeTables();

    // Seed database if needed
    await seed();

    console.log("Server is initialized and ready.");
    
  } catch (error) {
    console.error("Error initializing the server:", error);
    process.exit(1); // Exit with an error code if initialization fails
  }
}

// Start the server
async function startServer() {
  await initializeServer();

  // Start listening to the port after initialization is successful
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

// Graceful shutdown for server termination
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  process.exit(0); // Exit gracefully
});

startServer();
