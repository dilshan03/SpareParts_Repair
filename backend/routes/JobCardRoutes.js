// src/routes/jobCardRoutes.js
import express from "express";
import {
  createJobCard,
  getJobCards,
  getJobCardById,
  updateJobCard,
  deleteJobCard,
} from "../controllers/jobCardController.js";

const router = express.Router();

router.post("/", createJobCard);
router.get("/", getJobCards);
router.get("/:id", getJobCardById);
router.put("/:id", updateJobCard);
router.delete("/:id", deleteJobCard);

export default router;