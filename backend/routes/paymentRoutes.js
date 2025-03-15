import express from "express";
import multer from "multer";
import Payment from "../models/Payment.js";

const router = express.Router();

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload bank slip
router.post("/upload", upload.single("bankSlip"), async (req, res) => {
  try {
    const payment = new Payment({
      customerId: req.body.customerId,
      amount: req.body.amount,
      bankSlip: req.file.path,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
