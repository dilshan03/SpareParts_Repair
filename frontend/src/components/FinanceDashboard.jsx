import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState({});
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    amount: "",
    description: "",
  });

  const navigate = useNavigate();  // useNavigate hook

  useEffect(() => {
    fetchTransactions();
    fetchReports();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/finance/");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/finance/reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/finance/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        alert("Transaction added successfully!");
        setNewTransaction({ type: "", amount: "", description: "" });
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDownload = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/finance/reports/${type}`, {
        responseType: "blob", // Important for file downloads
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

  const handleDelete = async (transactionId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/finance/delete/${transactionId}`);
      if (response.status === 200) {
        alert("Transaction deleted successfully!");
        fetchTransactions(); // Refresh the transaction list
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Handle navigation to Petty Cash management page
  const handleManagePettyCash = () => {
    navigate("/petty-cash");
  };

  return (
    <div className="container mt-20">
      <h2>Finance Dashboard</h2>

      {/* Financial Reports */}
      <div className="row">
        <div className="col-md-20">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5>Financial Reports</h5>
            </div>
            <div className="card-body">
              <p><strong>Balance Sheet:</strong> Assets: LKR {reports?.balanceSheet?.assets} | Liabilities: LKR {reports?.balanceSheet?.liabilities} | Equity: LKR {reports?.balanceSheet?.equity}</p>
              <p><strong>Profit & Loss:</strong> Revenue: LKR {reports?.profitLoss?.revenue} | Expenses: LKR {reports?.profitLoss?.expenses} | Profit: LKR {reports?.profitLoss?.profit}</p>
              <p><strong>Sales Report:</strong> Total Sales: LKR {reports?.salesReport?.totalSales}</p>

              {/* Existing download buttons for transaction history */}
              <button onClick={() => handleDownload("pdf")} className="btn btn-danger">Download Transaction History as PDF Report</button> &nbsp;
              <button onClick={() => handleDownload("excel")} className="btn btn-success ml-2">Download Transaction History as Excel Report</button>
              <br></br>
              {/* New download buttons for Balance Sheet */}
              <button onClick={() => handleDownload("balance-sheet-pdf")} className="btn btn-warning mt-2">Download Balance Sheet as PDF</button>  &nbsp;
              <button onClick={() => handleDownload("balance-sheet-excel")} className="btn btn-info mt-2">Download Balance Sheet as Excel</button>
            </div>
          </div>
        </div>

        
        
      </div>

      

     
      </div>
  );
};

export default FinanceDashboard;
