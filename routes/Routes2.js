import express from "express";
import { 
    getJobs, 
    createJob, 
    updateJob, 
    deleteJob 
} from "../controllers/jobController.js";
import protect from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleauth.js";

const router = express.Router();

router.get("/", protect, getJobs);
router.post("/", protect, authorizeRoles("recruiter"), createJob);
router.put("/:id", protect, authorizeRoles("recruiter"), updateJob);
router.patch("/:id", protect, authorizeRoles("recruiter"), updateJob);
router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);

export default router;
