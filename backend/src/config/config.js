import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine environment from NODE_ENV
const env = process.env.NODE_ENV || "development";
console.logger("info", "Environment", `${env.toUpperCase()}`);

// Load environment variables from the appropriate file
dotenv.config({
  path: path.resolve(__dirname, `../../environment/.env.${env}`),
});

// Export necessary variables
export const MONGO_URI = process.env.MONGO_URI;
export const ENDPOINT_PREFIX = process.env.ENDPOINT_PREFIX;
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET;
