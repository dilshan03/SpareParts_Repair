import express from "express";
import Transaction from "../models/Transaction.js";
import financeController from "../controllers/financeController.js";

const router = express.Router();
//const financeController = require("../controllers/financeController");

// 📌 Add Transaction
router.post("/add", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Get All Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Get Financial Reports
router.get("/reports", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    // Calculate total revenue, expenses, and balance
    let totalIncome = 0;
    let totalExpense = 0;
    let totalSales = 0;

    transactions.forEach((txn) => {
      if (txn.type === "income") totalIncome += txn.amount;
      if (txn.type === "expense") totalExpense += txn.amount;
      if (txn.type === "sales") totalSales += txn.amount;
    });

    // Balance = Income - Expenses
    const balance = totalIncome - totalExpense;

    res.json({
      balanceSheet: { assets: totalIncome, liabilities: totalExpense, equity: balance },
      profitLoss: { revenue: totalIncome, expenses: totalExpense, profit: balance },
      bankBook: transactions,
      salesReport: { totalSales },
    });
  } catch (error) {
    res.status(500).json({ error: "Error generating reports" });
  }
});


router.get("/reports/pdf", financeController.generatePDFReport);
router.get("/reports/excel", financeController.generateExcelReport);


export default router;
