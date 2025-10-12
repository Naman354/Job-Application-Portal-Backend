import express from "express";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getAllJobListings,
} from "../controllers/jobAppControl.js";
import protect from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleauth.js";

const router = express.Router();

router.get("/jobs", protect, getAllJobListings);
router.get("/", protect, getApplications);
router.post("/", protect, authorizeRoles("applicant"), createApplication);
router.put("/:id", protect, authorizeRoles("applicant"), updateApplication);
router.patch("/:id", protect, authorizeRoles("applicant"), updateApplication);
router.delete("/:id", protect, authorizeRoles("applicant"), deleteApplication);

export default router;
