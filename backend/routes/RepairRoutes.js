
// // export default router;
// import express from "express";
// import {
//   createRepair,
//   getAllRepairs,
//   getRepairById,
//   updateRepair,
//   deleteRepair, 
//   createRepairsForAllRequestForms,
//   // createRepairFromRequestForm, // Add the new function
// } from "../controllers/repairController.js";

// const router = express.Router();

// // Create a new repair
// router.post("/", createRepair);

// // Create repairs for all RepairRequestForms
// router.post("/create-from-all-request-forms", createRepairsForAllRequestForms);

// // Get all repairs
// router.get("/", getAllRepairs);

// // Get a repair by ID
// router.get("/:id", getRepairById);

// // Update a repair by ID
// router.put("/:id", updateRepair);

// // Delete a repair by ID
// router.delete("/:id", deleteRepair);

// export default router;

import express from "express";
import {
  createRepair,
  getAllRepairs,
  getRepairById,
  updateRepair,
  deleteRepair,
  createRepairsForAllRequestForms,
} from "../controllers/repairController.js";

const router = express.Router();

// Create a new repair
router.post("/", createRepair);

// Create repairs for all RepairRequestForms
router.post("/create-from-all-request-forms", createRepairsForAllRequestForms);

// Get all repairs
router.get("/get-all-repairs/", getAllRepairs);

// Get a repair by ID
router.get("/:id", getRepairById);

// Update a repair by ID
router.put("/:id", updateRepair);

// Delete a repair by ID
router.delete("/:id", deleteRepair);

export default router;