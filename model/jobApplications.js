import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  job_listing: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobListing", 
    required: true 
},
  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  resume_link: String,
  cover_letter: String,
  status: { 
    type: String, 
    default: "Pending" 
}
}, { timestamps: true });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
module.exports = JobApplication;