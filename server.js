import dotenv from "dotenv";
dotenv.config();

console.log("ENV TEST - GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/Routes3.js";
import jobRoutes from "./routes/Routes2.js";
import applicationRoutes from "./routes/Routes.js";import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";




connectDB();

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5500;  
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
