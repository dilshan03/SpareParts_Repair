import mongoose from "mongoose";

const jobCardSchema = new mongoose.Schema({
  repairId: { type: mongoose.Schema.Types.ObjectId, ref: "Repair", required: true }, // Reference to Repair
  mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "employees", required: true }, // Reference to User (Mechanic)
  jobDetails: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }, // Job card status
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } // Track when the job card was last updated
});

const JobCard = mongoose.model("JobCard", jobCardSchema);

export default JobCard;