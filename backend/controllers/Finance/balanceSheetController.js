import PDFDocument from 'pdfkit';
import fs from 'fs';
import ExcelJS from 'exceljs';
import BalanceSheet from '../../models/Finance/BalanceSheet.js';

// Controller to add a balance sheet entry
export const addBalanceSheet = async (req, res) => {
  try {
    const { assets, liabilities, equity } = req.body;

    // Ensure required fields are present
    if (!assets || !liabilities || !equity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBalanceSheet = new BalanceSheet({
      assets,
      liabilities,
      equity,
    });

    await newBalanceSheet.save();
    res.status(201).json({ message: '✅ Balance Sheet Added Successfully', balanceSheet: newBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
};

// Controller to get all balance sheet entries
export const getBalanceSheets = async (req, res) => {
  try {
    const balanceSheets = await BalanceSheet.find();
    res.status(200).json(balanceSheets);
  } catch (error) {
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
};

// Update Balance Sheet by ID
export const updateBalanceSheet = async (req, res) => {
    const { id } = req.params;
    const { assets, liabilities, equity } = req.body;
  
    try {
      // Find and update the balance sheet by ID
      const updatedBalanceSheet = await BalanceSheet.findByIdAndUpdate(
        id,
        { assets, liabilities, equity },
        { new: true } // Return the updated document
      );
  
      if (!updatedBalanceSheet) {
        return res.status(404).json({ message: "❌ Balance Sheet not found" });
      }
  
      res.status(200).json({ message: "✅ Balance Sheet Updated Successfully!", updatedBalanceSheet });
    } catch (error) {
      res.status(500).json({ message: "❌ Error updating Balance Sheet", error });
    }
};

// Delete Balance Sheet by ID
export const deleteBalanceSheet = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedBalanceSheet = await BalanceSheet.findByIdAndDelete(id);
  
      if (!deletedBalanceSheet) {
        return res.status(404).json({ message: "❌ Balance Sheet not found" });
      }
  
      res.status(200).json({ message: "✅ Balance Sheet Deleted Successfully!", deletedBalanceSheet });
    } catch (error) {
      res.status(500).json({ message: "❌ Error deleting Balance Sheet", error });
    }
};


export const generateBalanceSheetPDF = async (req, res) => {
    try {
      const balanceSheets = await BalanceSheet.find();
  
      // Create a document
      const doc = new PDFDocument();
  
      // Set the response headers for downloading the PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=balance-sheets.pdf');
  
      // Pipe the PDF document to the response
      doc.pipe(res);
  
      // Title
      doc.fontSize(18).text('Balance Sheet Report', { align: 'center' });
      doc.moveDown();
  
      // Table Header
      doc.fontSize(12).text('ID | Assets | Liabilities | Equity');
      doc.moveDown();
  
      // Table rows
      balanceSheets.forEach(sheet => {
        doc.text(`${sheet._id} | ${sheet.assets} | ${sheet.liabilities} | ${sheet.equity}`);
      });
  
      // Finalize the PDF document
      doc.end();
    } catch (error) {
      res.status(500).json({ message: "❌ Error generating PDF report", error });
    }
};


  export const generateBalanceSheetExcel = async (req, res) => {
    try {
      const balanceSheets = await BalanceSheet.find();
  
      // Create a new Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Balance Sheets');
  
      // Add column headers
      worksheet.columns = [
        { header: 'ID', key: '_id', width: 30 },
        { header: 'Assets', key: 'assets', width: 15 },
        { header: 'Liabilities', key: 'liabilities', width: 15 },
        { header: 'Equity', key: 'equity', width: 15 },
      ];
  
      // Add data rows
      balanceSheets.forEach(sheet => {
        worksheet.addRow({
          _id: sheet._id,
          assets: sheet.assets,
          liabilities: sheet.liabilities,
          equity: sheet.equity
        });
      });
  
      // Set response headers for Excel file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=balance-sheets.xlsx');
  
      // Write Excel file to the response
      await workbook.xlsx.write(res);
  
      res.end();
    } catch (error) {
      res.status(500).json({ message: "❌ Error generating Excel report", error });
    }
};