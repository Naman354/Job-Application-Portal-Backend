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

// For ES modules: get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files from "public" folder
app.use(express.static(path.join(__dirname, "frontend")));

// Parse JSON request bodies
app.use(express.json());

// Session setup
app.use(cors({
  origin: "*", // for testing only; restrict in production
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

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes); // Google OAuth
app.use("/api/users", userRoutes); // login/signup
app.use("/api/jobs", jobRoutes); // recruiter routes
app.use("/api/applications", applicationRoutes); // applicant routes

// Serve login page
app.get("/users/login", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Serve signup page
app.get("/users/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "signup.html"));
});

// Serve dashboard / user page
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "user.html")); // your user page
});

// Home route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
