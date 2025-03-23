// import JobCard from "../models/JobCard.js";
// import Repair from "../models/Repair.js";
// import User from "../models/UserModel.js";

// // Create a new JobCard
// export const createJobCard = async (req, res) => {
//   const { repairId, assignedMechanic, jobs } = req.body;

//   try {
//     // Check if the repair exists
//     const repair = await Repair.findById(repairId);
//     if (!repair) {
//       return res.status(404).json({ message: "Repair not found" });
//     }

//     // Check if the assigned mechanic exists
//     const mechanic = await User.findById(assignedMechanic);
//     if (!mechanic) {
//       return res.status(404).json({ message: "Mechanic not found" });
//     }

//     // Create the JobCard
//     const jobCard = new JobCard({
//       repairId,
//       assignedMechanic,
//       jobs,
//     });

//     // Save the JobCard
//     await jobCard.save();

//     // Add the JobCard to the Repair's jobCards array
//     repair.jobCards.push(jobCard._id);
//     await repair.save();

//     res.status(201).json({ message: "JobCard created successfully", jobCard });
//   } catch (error) {
//     console.error("Error creating JobCard:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

import JobCard from "../models/JobCard.js";
import Repair from "../models/Repair.js";
import User from "../models/UserModel.js";

// // Create a new JobCard
// export const createJobCard = async (req, res) => {
//   const { repairId, assignedMechanic, jobs } = req.body;

//   try {
//     console.log("Repair ID from request:", repairId); // Debugging
//     console.log("Assigned Mechanic from request:", assignedMechanic); // Debugging

//     // Check if the repair exists
//     const repair = await Repair.findById(repairId);
//     if (!repair) {
//       return res.status(404).json({ message: "Repair not found" });
//     }

//     // Check if the assigned mechanic exists
//     const mechanic = await User.findById(assignedMechanic);
//     if (!mechanic) {
//       return res.status(404).json({ message: "Mechanic not found" });
//     }

//     // Create the JobCard
//     const jobCard = new JobCard({
//       repairId,
//       assignedMechanic,
//       jobs,
//     });

//     // Save the JobCard
//     await jobCard.save();

//     // Add the JobCard to the Repair's jobCards array
//     repair.jobCards.push(jobCard._id);
//     await repair.save();

//     res.status(201).json({ message: "JobCard created successfully", jobCard });
//   } catch (error) {
//     console.error("Error creating JobCard:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const createJobCard = async (req, res) => {
  const { repairId, assignedMechanic, jobs } = req.body;

  try {
    console.log("Request Body:", req.body); // Log the request body

    // Validate required fields
    if (!repairId || !assignedMechanic || !jobs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the repair exists
    const repair = await Repair.findById(repairId);
    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }

    // Check if the assigned mechanic exists
    const mechanic = await User.findById(assignedMechanic);
    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    // Validate the jobs array
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return res.status(400).json({ message: "Jobs must be a non-empty array" });
    }

    // Create the JobCard
    const jobCard = new JobCard({
      repairId,
      assignedMechanic,
      jobs,
    });

    // Save the JobCard
    await jobCard.save();

    // Add the JobCard to the Repair's jobCards array
    repair.jobCards.push(jobCard._id);
    await repair.save();

    res.status(201).json({ message: "JobCard created successfully", jobCard });
  } catch (error) {
    console.error("Error creating JobCard:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Get all job cards
export const getAllJobCards = async (req, res) => {
  try {
    // Fetch all job cards and populate related fields (repairId and assignedMechanic)
    const jobCards = await JobCard.find()
      .populate("repairId")
      .populate("assignedMechanic");

    res.status(200).json(jobCards);
  } catch (error) {
    console.error("Error fetching job cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};