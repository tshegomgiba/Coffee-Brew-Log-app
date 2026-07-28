import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import coffeeRoutes from "./routes/coffee.route.js";
import serverless from "serverless-http";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/brews", coffeeRoutes);

const handler = serverless(app);

const start = async () => {
  try {
    await connectDB();
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

export default handler;