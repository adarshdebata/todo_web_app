import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import { PORT } from "../src/config/config.js";

// Start the server only after DB is connected
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.logger("info", "Server", `🚀 Service running on port: ${PORT}`);
    });
  } catch (error) {
    console.logger("error", "Server Startup", `❌ Server startup failed: ${error}`);
    process.exit(1); // Exit if something goes wrong
  }
};

startServer();
