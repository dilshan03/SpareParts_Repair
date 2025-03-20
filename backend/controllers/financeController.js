import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import excelJS from "exceljs";
import Transaction from "../models/Transaction.js";
import Payment from "../models/Payment.js";
import ManualEntry from "../models/ManualEntry.js";
import CashBook from "../models/CashBook.js";

// Generate PDF Financial Report
const generatePDFReport = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="financial_report.pdf"');
    doc.pipe(res);

    // Add Company Logo
    const logoPath = path.resolve("./public/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 100 });
    }

    // Letterhead
    doc.fontSize(20).text("Cosmo Exports Lanka (PVT) LTD", 50, 120, { align: "center" });
    doc.fontSize(12).text("496/1, Naduhena, Meegoda, Sri Lanka", { align: "center" });
    doc.text("Phone: +94 77 086 4011  +94 11 275 2373 | Email: cosmoexportslanka@gmail.com", { align: "center" });
    doc.moveDown(2);

    // Report Title
    doc.fontSize(16).text("Financial Report (Transaction History)", { align: "center", underline: true });
    doc.moveDown(2);

    // Table Headers
    const startX = 60;
    let startY = doc.y;

    doc.fontSize(12).font("Helvetica-Bold");
    doc.text("Date & Time", startX, startY);
    doc.text("Type", startX + 120, startY);
    doc.text("Amount", startX + 220, startY);
    doc.text("Description", startX + 320, startY);
    doc.moveTo(startX, startY + 15).lineTo(550, startY + 15).stroke();

    // Transactions Data
    doc.font("Helvetica");
    startY += 25;

    transactions.forEach((txn) => {
      doc.text(new Date(txn.timestamp).toLocaleString(), startX, startY);
      doc.text(txn.type, startX + 120, startY);
      doc.text(`LKR ${txn.amount}`, startX + 220, startY);
      doc.text(txn.description, startX + 320, startY, { width: 200, ellipsis: true });

      startY += 20;
      if (startY > 750) {
        doc.addPage();
        startY = 50;
      }
    });

    doc.moveDown(2);
    doc.text("Authorized Signature: ____________________", { align: "right" });
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF report" });
  }
};

// Generate Excel Financial Report
const generateExcelReport = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Financial Report");

    worksheet.columns = [
      { header: "Date & Time", key: "timestamp", width: 30 },
      { header: "Type", key: "type", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Description", key: "description", width: 30 },
    ];

    transactions.forEach((txn) => {
      worksheet.addRow({
        timestamp: new Date(txn.timestamp).toLocaleString(),
        type: txn.type,
        amount: txn.amount,
        description: txn.description,
      });
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", 'attachment; filename="financial_report.xlsx"');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel report:", error);
    res.status(500).json({ error: "Failed to generate Excel report" });
  }
};

// Upload Bank Slip
const uploadBankSlip = async (req, res) => {
  try {
    const { customerId, amount, transactionId, bankSlipUrl } = req.body;

    const newPayment = new Payment({
      customerId,
      amount,
      transactionId,
      bankSlipUrl,
      status: "Pending",
    });

    await newPayment.save();
    res.status(201).json({ message: "Bank slip uploaded successfully", payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: "Error uploading bank slip", error: error.message });
  }
};

// Get All Payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("customerId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

// Update Payment Status
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

// Generate Payment Slip (PDF)
const generatePaymentSlip = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="payment_${id}.pdf"`);

    doc.pipe(res);
    doc.fontSize(20).text("Payment Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Transaction ID: ${payment.transactionId}`);
    doc.text(`Amount: LKR ${payment.amount}`);
    doc.text(`Status: ${payment.status}`);
    doc.text(`Date: ${payment.date.toDateString()}`);

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating payment slip", error: error.message });
  }
};

// Add Manual Entry
const addManualEntry = async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    const entry = new ManualEntry({
      type,
      amount,
      description,
      date: new Date(),
    });

    await entry.save();
    res.status(201).json({ message: "Manual entry added successfully", entry });
  } catch (error) {
    res.status(500).json({ message: "Error adding manual entry", error: error.message });
  }
};

// Get Cash Book
const getCashBook = async (req, res) => {
  try {
    const cashbookEntries = await CashBook.find();
    res.status(200).json(cashbookEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cash book data", error: error.message });
  }
};

// Export controllers
export default {
  generatePDFReport,
  generateExcelReport,
  uploadBankSlip,
  getAllPayments,
  updatePaymentStatus,
  generatePaymentSlip,
  addManualEntry,
  getCashBook,
};
