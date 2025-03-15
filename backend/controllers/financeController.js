import PDFDocument from "pdfkit";
import excelJS from "exceljs";

// Generate PDF Report
const generatePDFReport = (req, res) => {
  try {
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="financial_report.pdf"');

    // Pipe document to response
    doc.pipe(res);

    // Sample Report Content
    doc.fontSize(16).text("Financial Report", { align: "center" });
    doc.moveDown();
    
    doc.fontSize(12).text("Balance Sheet", { underline: true });
    doc.text("Assets: $5000");
    doc.text("Liabilities: $2000");
    doc.text("Equity: $3000");
    
    doc.moveDown();
    doc.text("Profit & Loss", { underline: true });
    doc.text("Revenue: $8000");
    doc.text("Expenses: $4000");
    doc.text("Profit: $4000");

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF report" });
  }
};

// Generate Excel Report
const generateExcelReport = async (req, res) => {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Financial Report");

    // Define Columns
    worksheet.columns = [
      { header: "Type", key: "type", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Description", key: "description", width: 30 },
    ];

    // Sample Data
    worksheet.addRow({ type: "Income", amount: 5000, description: "Monthly Revenue" });
    worksheet.addRow({ type: "Expense", amount: 2000, description: "Office Rent" });
    worksheet.addRow({ type: "Sales", amount: 3000, description: "Product Sales" });

    // Set Response Headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="financial_report.xlsx"');

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel report:", error);
    res.status(500).json({ error: "Failed to generate Excel report" });
  }
};

// Define financeController object
const financeController = {
  generatePDFReport,
  generateExcelReport
};

// Export functions
export { generatePDFReport, generateExcelReport };

// Export financeController as default
export default financeController;
