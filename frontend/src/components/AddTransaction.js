import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
    const [formData, setFormData] = useState({
        type: 'income', // Default to income
        description: '',
        amount: '',
        date: ''
    });
    
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    // Fetch transactions from API on component mount
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/finance/transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/finance/add-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Transaction added successfully!');
                setFormData({ type: 'income', description: '', amount: '', date: '' }); // Reset form
                // Refresh the transactions list
                const updatedTransactions = await response.json();
                setTransactions(updatedTransactions);
                navigate('/finance-dashboard'); // Redirect after success
            } else {
                alert('Failed to add transaction');
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Server error. Please try again later.');
        }
    };

    // Handle transaction deletion
    const handleDelete = async (transactionId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/finance/delete-transaction/${transactionId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedTransactions = transactions.filter(txn => txn._id !== transactionId);
                setTransactions(updatedTransactions);
                alert('Transaction deleted successfully!');
            } else {
                alert('Failed to delete transaction');
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            alert('Server error. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Transaction</button>
            </form>
            <button onClick={() => navigate('/finance-dashboard')} className="mt-4 w-full bg-gray-500 text-white p-2 rounded">Back</button>

            {/* Transactions List */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header bg-warning text-white">
                            <h5>Transactions</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {transactions.map((txn) => (
                                    <li key={txn._id} className="list-group-item">
                                        <strong>{txn.type}:</strong> LKR {txn.amount} - {txn.description}
                                        <button
                                            onClick={() => handleDelete(txn._id)}
                                            className="btn btn-danger btn-sm float-right"
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
