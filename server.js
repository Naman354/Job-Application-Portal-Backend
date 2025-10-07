import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/Routes3.js";
import jobRoutes from "./routes/Routes2.js";
import applicationRoutes from "./routes/Routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5500;  
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
