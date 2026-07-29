import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import coffeeRoutes from "./routes/coffee.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use("/api/brews", coffeeRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.resolve(__dirname, "../frontend/dist");

  try {
    app.use(express.static(frontendBuildPath));
  } catch (error) {
    console.warn("Frontend build folder not available yet:", error.message);
  }

  app.get(/(.*)/, (req, res) => {
    const indexPath = path.join(frontendBuildPath, "index.html");

    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).json({ message: "Frontend build not available yet." });
      }
    });
  });
}

let dbConnected = false;
const initDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

const start = async () => {
  try {
    await initDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
