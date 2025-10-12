import dotenv from "dotenv";
dotenv.config();

console.log("ENV TEST - GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import userRoutes from "./routes/Routes3.js";
import jobRoutes from "./routes/Routes2.js";
import applicationRoutes from "./routes/Routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/jobs", jobRoutes); 
app.use("/api/applications", applicationRoutes); 

app.get("/users/login", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/users/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "signup.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "user.html")); // your user page
});

app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "reset-password.html"));
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
