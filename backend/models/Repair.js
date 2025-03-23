// // src/models/Repair.js
// import mongoose from "mongoose";

// const repairSchema = new mongoose.Schema({
//   vehicleNumber: { type: String, required: true },
//   ownerName: { type: String, required: true },
//   issueDescription: [{ type: String, required: true }], // Array of issues
//   // quotationId: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation" }, // Reference to Quotation
//   assignedMechanic: { type: mongoose.Schema.Types.ObjectId, ref: "employees" }, // Reference to User (Mechanic)
//   RepairCompleteStatus: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
//   createdAt: { type: Date, default: Date.now }
// });

// const Repair = mongoose.model("Repair", repairSchema);

// export default Repair;

import mongoose from "mongoose";

// const repairSchema = new mongoose.Schema({
//   // Reference to the Repair Request Form
//   requestFormId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "RepairRequestForm", 
//     required: true 
//   },

//   // Repair Completion Status
//   repairCompleteStatus: { 
//     type: String, 
//     enum: ["Pending", "In Progress", "Completed"], 
//     default: "Pending" 
//   },

//   // Payment Status
//   paymentStatus: { 
//     type: String, 
//     enum: ["Pending", "Partially Paid", "Paid"], 
//     default: "Pending" 
//   },

//   // Array of Job Cards associated with this repair
//   // jobCards: [{ 
//   //   type: mongoose.Schema.Types.ObjectId, 
//   //   ref: "JobCard" 
//   // }],

//   // Timestamps
//   createdAt: { type: Date, default: Date.now },
//   completedAt: { type: Date }
// });

const repairSchema = new mongoose.Schema({
  requestFormId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RepairRequestForm",
    required: true,
  },
  repairCompleteStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Partially Paid", "Paid"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const Repair = mongoose.model("Repair", repairSchema);
export default Repair;

