import mongoose from "mongoose";

const jobListingSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    company: {
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    posted_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
}, { timestamps: true });
const JobListing = mongoose.model("JobListing", jobListingSchema);
module.exports = JobListing;