// import mongoose from "mongoose";

// const jobCardSchema = new mongoose.Schema({
//   repairId: { type: mongoose.Schema.Types.ObjectId, ref: "Repair", required: true }, // Reference to Repair
//   mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "employees", required: true }, // Reference to User (Mechanic)
//   jobDetails: { type: String, required: true },
//   jobStatus: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }, // Job card status
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now } // Track when the job card was last updated
// });

// const JobCard = mongoose.model("JobCard", jobCardSchema);

// export default JobCard;

import mongoose from "mongoose";

const jobCardSchema = new mongoose.Schema({
  // Reference to the Repair
  repairId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Repair", 
    required: true 
  },

  // Assigned Mechanic (reference to the employees table)
  assignedMechanic: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "employees", 
    required: true 
  },

  // List of jobs in this job card
  jobs: [{
    jobName: { type: String, required: true },
    jobDescription: { type: String },
    jobStatus: { 
      type: String, 
      enum: ["Pending", "In Progress", "Completed"], 
      default: "Pending" 
    },
    jobCost: { type: Number, default: 0 }
  }],

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const JobCard = mongoose.model("JobCard", jobCardSchema);
export default JobCard;