import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import coffeeRoutes from "./routes/coffee.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/brews", coffeeRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });