// import express from "express";
// import {
//   createJobCard,
//   getAllJobCards,
//   getJobCardById,
//   updateJobCard,
//   deleteJobCard,
//   getJobCardsByRepairId,
// } from "../controllers/jobCardController.js";

// const router = express.Router();

// // Create a new job card
// router.post("/create", createJobCard);

// // Get all job cards for a repair
// router.get("/repair/:repairId", getJobCardsByRepairId);

// // Get all job cards
// router.get("/", getAllJobCards);

// // Get a job card by ID
// router.get("/:id", getJobCardById);

// // Update a job card by ID
// router.put("/:id", updateJobCard);

// // Delete a job card by ID
// router.delete("/:id", deleteJobCard);

// export default router;

import express from "express";
import { createJobCard, getAllJobCards,} from "../controllers/jobCardController.js";

const router = express.Router();

// Route to create a JobCard
router.post("/", createJobCard);
router.get("/", getAllJobCards);

export default router;