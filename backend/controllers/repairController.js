// src/controllers/repairController.js
import Repair from "../models/Repair.js";
import JobCard from "../models/JobCard.js";

// Create a new repair
const createRepair = async (req, res) => {
  try {
    const { vehicleNumber, ownerName, issueDescription, quotationId } = req.body;
    const repair = new Repair({
      vehicleNumber,
      ownerName,
      issueDescription,
      quotationId,
    });
    await repair.save();
    res.status(201).json(repair);
  } catch (error) {
    res.status(500).json({ message: "Error creating repair", error: error.message });
  }
};

// Get all repairs
const getRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find()
      .populate("quotationId")
      .populate("assignedMechanic");
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching repairs", error: error.message });
  }
};

// Get a single repair by ID
const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findById(id)
      .populate("quotationId")
      .populate("assignedMechanic");
    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ message: "Error fetching repair", error: error.message });
  }
};

// Update a repair
const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleNumber, ownerName, issueDescription, quotationId, status } = req.body;
    const repair = await Repair.findByIdAndUpdate(
      id,
      { vehicleNumber, ownerName, issueDescription, quotationId, status },
      { new: true }
    );
    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ message: "Error updating repair", error: error.message });
  }
};

// Delete a repair
const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findByIdAndDelete(id);
    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }
    res.status(200).json({ message: "Repair deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting repair", error: error.message });
  }
};

// Assign a mechanic to a repair
const assignMechanicToRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { mechanicId } = req.body;

    // Assign mechanic to repair
    const repair = await Repair.findByIdAndUpdate(
      id,
      { assignedMechanic: mechanicId, status: "In Progress" },
      { new: true }
    );
    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }

    // Create a job card for the repair
    const jobCard = new JobCard({
      repairId: id,
      mechanicId,
      jobDetails: `Repair job assigned to mechanic ${mechanicId}`,
    });
    await jobCard.save();

    res.status(200).json({ repair, jobCard });
  } catch (error) {
    res.status(500).json({ message: "Error assigning mechanic", error: error.message });
  }
};

export {
  createRepair,
  getRepairs,
  getRepairById,
  updateRepair,
  deleteRepair,
  assignMechanicToRepair,
};