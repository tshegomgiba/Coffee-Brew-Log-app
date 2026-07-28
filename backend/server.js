import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import coffeeRoutes from "./routes/coffee.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/brews", coffeeRoutes);

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
    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

start();

export default async function handler(req, res) {
  try {
    await initDB();
    app(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
