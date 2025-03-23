// productRoute.js
import express from "express";
import { addSparePart, getAllSpareParts, getSparePartById, updateSparePart, deleteSparePart } from "../controllers/productController.js";

// Import the upload middleware from a separate file
import upload from "../middleware/uploadMiddleware.js";  

const router = express.Router();

// Route for adding a spare part with image upload
router.post("/", upload, addSparePart);
router.get("/", getAllSpareParts);
router.get("/:id", getSparePartById);
router.put("/:id", updateSparePart);
router.delete("/:id", deleteSparePart);

export default router;
