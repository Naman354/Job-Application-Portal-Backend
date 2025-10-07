import express from "express";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getAllJobListings,
} from "../controllers/jobAppControl.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/jobs", protect, getAllJobListings);
router.get("/", protect, getApplications);
router.post("/", protect, createApplication);
router.put("/:id", protect, updateApplication);
router.patch("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

export default router;
