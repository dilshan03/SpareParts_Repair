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
    <div className="container mt-4">
      <h2>Finance Dashboard</h2>

      {/* Financial Reports */}
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5>Financial Reports</h5>
            </div>
            <div className="card-body">
              <p><strong>Balance Sheet:</strong> Assets: LKR {reports?.balanceSheet?.assets} | Liabilities: LKR {reports?.balanceSheet?.liabilities} | Equity: LKR {reports?.balanceSheet?.equity}</p>
              <p><strong>Profit & Loss:</strong> Revenue: LKR {reports?.profitLoss?.revenue} | Expenses: LKR {reports?.profitLoss?.expenses} | Profit: LKR {reports?.profitLoss?.profit}</p>
              <p><strong>Sales Report:</strong> Total Sales: LKR {reports?.salesReport?.totalSales}</p>

              {/* Existing download buttons for transaction history */}
              <button onClick={() => handleDownload("pdf")} className="btn btn-danger">Download PDF Report</button>
              <button onClick={() => handleDownload("excel")} className="btn btn-success ml-2">Download Excel Report</button>
              
              {/* New download buttons for Balance Sheet */}
              <button onClick={() => handleDownload("balance-sheet-pdf")} className="btn btn-warning mt-2">Download Balance Sheet as PDF</button>
              <button onClick={() => handleDownload("balance-sheet-excel")} className="btn btn-info mt-2">Download Balance Sheet as Excel</button>
            </div>
          </div>
        </div>

        {/* Add New Transaction */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5>Add New Transaction</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Type:</label>
                  <select
                    name="type"
                    value={newTransaction.type}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success mt-3">
                  <i className="fas fa-plus-circle"></i>
                  &nbsp;Add Transaction
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Petty Cash Button */}
      <div className="row mt-4">
        <div className="col-md-12">
          <button onClick={handleManagePettyCash} className="btn btn-primary">
            Manage Petty Cash
          </button>
          &nbsp;
          <button onClick={() => navigate('/add-transaction')} className="btn btn-primary">
            + Add Transaction
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h5>Transactions</h5>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction._id}</td>
                      <td>{transaction.type}</td>
                      <td>LKR {transaction.amount}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <button onClick={() => handleDelete(transaction._id)} className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default FinanceDashboard;
