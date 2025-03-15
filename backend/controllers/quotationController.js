
const Quotation = require("../models/quotation");
const sendEmail = require("../config/email");
const axios = require("axios");

// Create quotation
exports.createQuotation = async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    await sendEmail(req.body.customerEmail, quotation);
    res.status(201).json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all quotations
exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve quotation & send data to RMS & FMS
exports.approveQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });

    if (!quotation) return res.status(404).json({ error: "Quotation not found" });

    // Send data to RMS & FMS
    await axios.post("https://rms-api.com/quotations", quotation);
    await axios.post("https://fms-api.com/quotations", quotation);

    res.status(200).json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete quotation
exports.deleteQuotation = async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
