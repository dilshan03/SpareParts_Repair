import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AddTransaction from "./AddTransaction";
//import BalanceSheet from "./BalanceSheetList";
import PaymentPortal from "./PaymentPortal";
import PettyCashManagement from "./PettyCashManagement";

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
    fetchReports();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/finance/");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/finance/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };
/*
  const handleDownload = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/finance/reports/${type}`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `financial_report.${type === "pdf" ? "pdf" : "xlsx"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };
*/

/*
const handleDownload = async (type) => {
  let url = "";

  // Map request type to the correct API endpoint
  if (type === "pdf") {
    url = "http://localhost:5000/api/finance/reports/pdf";
  } else if (type === "excel") {
    url = "http://localhost:5000/api/finance/reports/excel";
  } else if (type === "balance-sheet-pdf") {
    url = "http://localhost:5000/api/balance-sheet/pdf"; // Corrected URL
  } else if (type === "balance-sheet-excel") {
    url = "http://localhost:5000/api/finance/reports/balance-sheet-excel";
  } else {
    console.error("Invalid report type:", type);
    return;
  }

  try {
    const response = await axios.get(url, {
      responseType: "blob",
      headers: { "Accept": "application/pdf" }, // Ensure correct content type
    });

    const blob = new Blob([response.data], { type: type.includes("pdf") ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = type.includes("pdf") ? "balance-sheet.pdf" : "balance-sheet.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Error downloading ${type}:`, error);
  }
};
*/

const handleDownload = async (type) => {
  let url = "";
  let filename = "";

  // Map request type to the correct API endpoint and file name
  if (type === "pdf") {
    url = "http://localhost:5000/api/finance/reports/pdf";
    filename = "transaction-history.pdf"; // Correct filename
  } else if (type === "excel") {
    url = "http://localhost:5000/api/finance/reports/excel";
    filename = "transaction-history.xlsx";
  } else if (type === "balance-sheet-pdf") {
    url = "http://localhost:5000/api/balance-sheet/pdf";
    filename = "balance-sheet.pdf";
  } else if (type === "balance-sheet-excel") {
    url = "http://localhost:5000/api/finance/reports/balance-sheet-excel";
    filename = "balance-sheet.xlsx";
  } else {
    console.error("Invalid report type:", type);
    return;
  }

  try {
    const response = await axios.get(url, {
      responseType: "blob",
      headers: { "Accept": "application/pdf" }, // Ensure correct content type
    });

    const blob = new Blob([response.data], { type: type.includes("pdf") ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename; // ✅ Correct filename per type
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Error downloading ${type}:`, error);
  }
};


  return (
    <div className="container mt-4">
      <h2>Finance Dashboard</h2>


      {/* Back to Admin Dashboard Button */}
      <button onClick={() => navigate("/")} className="btn btn-secondary mb-3">
        ⬅ Back to Admin Dashboard
      </button>
      
      <div className="btn-group mb-4">
        <button className="btn btn-primary" onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button className="btn btn-success" onClick={() => setActiveTab("add-transaction")}>Add Transaction</button>
        <button className="btn btn-warning" onClick={() => setActiveTab("balance-sheet")}>Balance Sheet</button>
        <button className="btn btn-info" onClick={() => setActiveTab("payment-portal")}>Payment Portal</button>
        <button className="btn btn-secondary" onClick={() => setActiveTab("petty-cash")}>Petty Cash Management</button>
      </div>

      {activeTab === "dashboard" && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5>Financial Reports</h5>
          </div>
          <div className="card-body">
            {/*<p><strong>Balance Sheet:</strong> Assets: LKR {reports?.balanceSheet?.assets} | Liabilities: LKR {reports?.balanceSheet?.liabilities} | Equity: LKR {reports?.balanceSheet?.equity}</p>*/}
            <p><strong>Profit & Loss:</strong> Revenue: LKR {reports?.profitLoss?.revenue} | Expenses: LKR {reports?.profitLoss?.expenses} | Profit: LKR {reports?.profitLoss?.profit}</p>
            {/*<p><strong>Sales Report:</strong> Total Sales: LKR {reports?.salesReport?.totalSales}</p>*/}

            <button onClick={() => handleDownload("pdf")} className="btn btn-danger">Download Transaction History as PDF</button> &nbsp;
            <button onClick={() => handleDownload("excel")} className="btn btn-success">Download as Excel</button>
            <br />
            <button onClick={() => handleDownload("balance-sheet-pdf")} className="btn btn-warning mt-2">Download Balance Sheet as PDF</button>  &nbsp;
            {/*<button onClick={() => handleDownload("balance-sheet-excel")} className="btn btn-info mt-2">Download Balance Sheet as Excel</button>*/}
          </div>
        </div>
      )}

      {activeTab === "add-transaction" && <AddTransaction />}
      {activeTab === "balance-sheet" && <BalanceSheet />}
      {activeTab === "payment-portal" && <PaymentPortal />}
      {activeTab === "petty-cash" && <PettyCashManagement />}
    </div>
  );
};

export default FinanceDashboard;
