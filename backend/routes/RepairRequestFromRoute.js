// import express from "express";
// import {
//   createRepairRequest,
//   getAllRepairRequests,
//   getRepairRequestById,
//   updateRepairRequest,
//   deleteRepairRequest,
// } from "../controllers/RepairRequestFormController.js"; // Adjust the path as needed
// import multer from "multer";

// const repairRequestRouter = express.Router();

// // Multer setup for file upload
// const storage = multer.memoryStorage(); // Stores files in memory buffer
// const upload = multer({ storage });

// // Routes
// repairRequestRouter.post("/", upload.single("vehiclePhotoR"), createRepairRequest); // Create a repair request
// repairRequestRouter.get("/", getAllRepairRequests); // Get all repair requests
// repairRequestRouter.get("/:id", getRepairRequestById); // Get a repair request by ID
// repairRequestRouter.put("/:id", upload.single("vehiclePhotoR"), updateRepairRequest); // Update a repair request
// repairRequestRouter.delete("/:id", deleteRepairRequest); // Delete a repair request

import express from "express";
import multer from "multer";
// import {app} from "../server.js";

const repairRequestRouter = express.Router();

// Multer setup for file upload (stores file in memory buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

import {
  createRepairRequest,
  getAllRepairRequests,
  getRepairRequestById,
  updateRepairRequest,
  deleteRepairRequest,
} from "../controllers/RepairRequestFormController.js"; // Adjust the path as needed


// Routes
repairRequestRouter.post("/", upload.single("vehiclePhotoR"), createRepairRequest); // Create a repair request
repairRequestRouter.get("/", getAllRepairRequests); // Get all repair requests
repairRequestRouter.get("/:id", getRepairRequestById); // Get a repair request by ID
repairRequestRouter.put("/:id", upload.single("vehiclePhotoR"), updateRepairRequest); // Update a repair request
repairRequestRouter.delete("/:id", deleteRepairRequest); // Delete a repair request

export default repairRequestRouter;
