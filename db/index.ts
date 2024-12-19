import { Low, Memory } from "npm:lowdb";
import { Data } from "../models/data.ts";
import { seedDB } from "./seed.ts";

// Setup adapter and database
const adapter = new Memory<Data>();
const defaultData: Data = { patients: [], episodes: [], conditions: [] };
const db = new Low<Data>(adapter, defaultData);

// Initialize database
export const initializeDB = async () => {
  await db.read();
  seedDB(db); // Seed the database if needed
};

// Export the database instance for use in the app
export { db };
