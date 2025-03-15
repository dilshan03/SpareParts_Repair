const express = require("express");
const router = express.Router();
const { createQuotation, getQuotations, approveQuotation, deleteQuotation } = require("../controllers/quotationController");

router.post("/create", createQuotation);
router.get("/history", getQuotations);
router.post("/:id/approve", approveQuotation);
router.delete("/delete/:id", deleteQuotation);

module.exports = router;
