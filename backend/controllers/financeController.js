const Payment = require('../models/Payment');
const ManualEntry = require('../models/ManualEntry');
const CashBook = require('../models/CashBook');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Upload Bank Slip
const uploadBankSlip = async (req, res) => {
  try {
    const { customerId, amount, transactionId, bankSlipUrl } = req.body;

    const newPayment = new Payment({
      customerId,
      amount,
      transactionId,
      bankSlipUrl,
      status: "Pending"
    });

    await newPayment.save();
    res.status(201).json({ message: "Bank slip uploaded successfully", payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: "Error uploading bank slip", error: error.message });
  }
};

// Get All Payments (Admin View)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('customerId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

// Update Payment Status (Admin)
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error: error.message });
  }
};

// Generate Payment Slip (PDF Download)
const generatePaymentSlip = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const pdfPath = path.join(__dirname, `../pdfs/payment_${id}.pdf`);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));
    doc.pipe(res);

    doc.fontSize(20).text("Payment Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Transaction ID: ${payment.transactionId}`);
    doc.text(`Amount: $${payment.amount}`);
    doc.text(`Status: ${payment.status}`);
    doc.text(`Date: ${payment.date.toDateString()}`);

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating payment slip", error: error.message });
  }
};

// Add Manual Income/Expense Entry (Admin)
const addManualEntry = async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    const entry = new ManualEntry({
      type,
      amount,
      description,
      date: new Date()
    });

    await entry.save();
    res.status(201).json({ message: "Manual entry added successfully", entry });
  } catch (error) {
    res.status(500).json({ message: "Error adding manual entry", error: error.message });
  }
};

// Get Cash Book Data
const getCashBook = async (req, res) => {
  try {
    const cashbookEntries = await CashBook.find();
    res.status(200).json(cashbookEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cash book data", error: error.message });
  }
};

module.exports = { uploadBankSlip, getAllPayments, updatePaymentStatus, generatePaymentSlip, addManualEntry, getCashBook };
