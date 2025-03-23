// routes/reportRoutes.js
import express from "express";
import { getMonthlySalesReport } from "./reportController.js";

const router = express.Router();

router.get("/monthly", getMonthlySalesReport);

export default router;
