import PDFDocument from 'pdfkit';
import BalanceSheet from "../models/BalanceSheet.js";

// 📌 Add Balance Sheet Entry
export const addBalanceSheet = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const {
      assets,
      liabilities,
      equity,
      description,
    } = req.body;

    if (!assets || !liabilities || !equity) {
      return res.status(400).json({ message: "All fields must be provided." });
    }

    const newBalanceSheet = new BalanceSheet({
      assets,
      liabilities,
      equity,
      description,
    });

    await newBalanceSheet.save();
    res.status(201).json({ message: "✅ Balance Sheet Added Successfully", balanceSheet: newBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};

// 📌 Get All Balance Sheets
export const getBalanceSheets = async (req, res) => {
  try {
    const balanceSheets = await BalanceSheet.find();
    res.status(200).json(balanceSheets);
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};

// 📌 Update Balance Sheet by ID
export const updateBalanceSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBalanceSheet = await BalanceSheet.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBalanceSheet) {
      return res.status(404).json({ message: "❌ Balance Sheet Not Found" });
    }

    res.status(200).json({ message: "✅ Balance Sheet Updated", updatedBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: "❌ Error Updating Balance Sheet", error });
  }
};

// 📌 Delete Balance Sheet by ID
export const deleteBalanceSheet = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBalanceSheet = await BalanceSheet.findByIdAndDelete(id);

    if (!deletedBalanceSheet) {
      return res.status(404).json({ message: "❌ Balance Sheet Not Found" });
    }

    res.status(200).json({ message: "✅ Balance Sheet Deleted", deletedBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: "❌ Error Deleting Balance Sheet", error });
  }
};

// PDF generation logic
export const generateBalanceSheetPDF = async (req, res) => {
    try {
        // Fetch balance sheets from database
        const balanceSheets = await BalanceSheet.find();

        if (balanceSheets.length === 0) {
            return res.status(404).json({ message: "No balance sheets found" });
        }

        // Create a new PDF document
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=balance-sheets.pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Detailed Balance Sheet Report', { align: 'center' });
        doc.moveDown();

        balanceSheets.forEach((sheet, index) => {
            doc.fontSize(14).text(`Balance Sheet #${index + 1}`, { underline: true });
            doc.moveDown();

            // Assets Breakdown
            doc.fontSize(12).text('Assets', { underline: true });
            doc.text('Current Assets:');
            doc.text(`- Cash & Bank Balances: ${sheet.assets.currentAssets.cashBankBalances}`);
            doc.text(`- Accounts Receivable: ${sheet.assets.currentAssets.accountsReceivable}`);
            doc.text(`- Inventory: ${sheet.assets.currentAssets.inventory}`);
            doc.text(`- Prepaid Expenses: ${sheet.assets.currentAssets.prepaidExpenses}`);
            doc.moveDown();

            doc.text('Non-Current Assets:');
            doc.text(`- Property, Plant & Equipment: ${sheet.assets.nonCurrentAssets.propertyPlantEquipment}`);
            doc.text(`- Machinery & Tools: ${sheet.assets.nonCurrentAssets.machineryTools}`);
            doc.text(`- Vehicles: ${sheet.assets.nonCurrentAssets.vehicles}`);
            doc.text(`- Intangible Assets: ${sheet.assets.nonCurrentAssets.intangibleAssets}`);
            doc.moveDown();

            // Liabilities Breakdown
            doc.fontSize(12).text('Liabilities', { underline: true });
            doc.text('Current Liabilities:');
            doc.text(`- Accounts Payable: ${sheet.liabilities.currentLiabilities.accountsPayable}`);
            doc.text(`- Short-Term Loans: ${sheet.liabilities.currentLiabilities.shortTermLoans}`);
            doc.text(`- Taxes Payable: ${sheet.liabilities.currentLiabilities.taxesPayable}`);
            doc.text(`- Wages Payable: ${sheet.liabilities.currentLiabilities.wagesPayable}`);
            doc.moveDown();

            doc.text('Non-Current Liabilities:');
            doc.text(`- Long-Term Loans: ${sheet.liabilities.nonCurrentLiabilities.longTermLoans}`);
            doc.text(`- Lease Obligations: ${sheet.liabilities.nonCurrentLiabilities.leaseObligations}`);
            doc.text(`- Deferred Tax Liabilities: ${sheet.liabilities.nonCurrentLiabilities.deferredTaxLiabilities}`);
            doc.moveDown();

            // Equity Breakdown
            doc.fontSize(12).text('Equity', { underline: true });
            doc.text(`- Owner’s Capital: ${sheet.equity.ownersCapital}`);
            doc.text(`- Retained Earnings: ${sheet.equity.retainedEarnings}`);
            doc.text(`- Shareholder Contributions: ${sheet.equity.shareholderContributions}`);
            doc.moveDown();
        });

        // End the PDF document
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ message: '❌ Error generating PDF report', error });
    }
};

