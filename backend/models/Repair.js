// src/models/Repair.js
import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  ownerName: { type: String, required: true },
  issueDescription: [{ type: String, required: true }], // Array of issues
  quotationId: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation" }, // Reference to Quotation
  assignedMechanic: { type: mongoose.Schema.Types.ObjectId, ref: "employees" }, // Reference to User (Mechanic)
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Repair = mongoose.model("Repair", repairSchema);

export default Repair;