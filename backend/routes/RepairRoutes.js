// src/routes/repairRoutes.js
import express from "express";
import {
  createRepair,
  getRepairs,
  getRepairById,
  updateRepair,
  deleteRepair,
  assignMechanicToRepair,
} from "../controllers/repairController.js";

const router = express.Router();

router.post("/create", createRepair);
router.get("/", getRepairs);
router.get("/repairs/:id", getRepairById);
router.put("/repairs/:id", updateRepair);
router.delete("/repairs/:id", deleteRepair);
router.put("/repairs/:id/assign-mechanic", assignMechanicToRepair);

export default router;