import express from 'express';
import { addBalanceSheet, getBalanceSheets,updateBalanceSheet, deleteBalanceSheet, generateBalanceSheetPDF, generateBalanceSheetExcel  } from '../controllers/balanceSheetController.js';

const router = express.Router();

// Route to add a new balance sheet entry
router.post('/add', addBalanceSheet);

// Route to get all balance sheet entries
router.get('/all', getBalanceSheets);

// Update Balance Sheet by ID (PUT) - Add this route
router.put('/update/:id', updateBalanceSheet);

// DELETE Balance Sheet by ID
router.delete('/delete/:id', deleteBalanceSheet);  

// Generate PDF Report for Balance Sheets
router.get('/pdf', generateBalanceSheetPDF);  

// Generate Excel Report for Balance Sheets
router.get('/excel', generateBalanceSheetExcel);

export default router;
