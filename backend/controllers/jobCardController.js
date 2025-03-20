// src/controllers/jobCardController.js
import JobCard from "../models/JobCard.js";
 
// Create a new job card
const createJobCard = async (req, res) => {
  try {
    const { repairId, mechanicId, jobDetails } = req.body;
    const jobCard = new JobCard({
      repairId,
      mechanicId,
      jobDetails,
    });
    await jobCard.save();
    res.status(201).json(jobCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating job card", error: error.message });
  }
};

// Get all job cards
const getJobCards = async (req, res) => {
  try {
    const jobCards = await JobCard.find()
      .populate("repairId")
      .populate("mechanicId");
    res.status(200).json(jobCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job cards", error: error.message });
  }
};

// Get a single job card by ID
const getJobCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobCard = await JobCard.findById(id)
      .populate("repairId")
      .populate("mechanicId");
    if (!jobCard) {
      return res.status(404).json({ message: "Job card not found" });
    }
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job card", error: error.message });
  }
};

// Update a job card
const updateJobCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobDetails, status } = req.body;
    const jobCard = await JobCard.findByIdAndUpdate(
      id,
      { jobDetails, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!jobCard) {
      return res.status(404).json({ message: "Job card not found" });
    }
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(500).json({ message: "Error updating job card", error: error.message });
  }
};

// Delete a job card
const deleteJobCard = async (req, res) => {
  try {
    const { id } = req.params;
    const jobCard = await JobCard.findByIdAndDelete(id);
    if (!jobCard) {
      return res.status(404).json({ message: "Job card not found" });
    }
    res.status(200).json({ message: "Job card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job card", error: error.message });
  }
};

export {
  createJobCard,
  getJobCards,
  getJobCardById,
  updateJobCard,
  deleteJobCard,
};