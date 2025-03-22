import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPortal = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        cardNumber: '',
        cvc: '',
        amount: '',
        paymentMethod: '',
        bankSlip: null
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, bankSlip: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            
            const response = await axios.post('http://localhost:5000/api/payments/process-payment', formDataToSend);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Payment failed');
        }
    };

    return (
        
        <div className="container mt-5" 
            style={{ 
                backgroundImage: "url('/uploads/paymentPortal.jpg')", 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                minHeight: "100vh", 
                padding: "20px"
        }}
>

            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Payment Portal</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <select className="form-select" name="paymentMethod" onChange={handleChange} required>
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Online Bank Slip">Online Bank Slip</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>
                    {formData.paymentMethod && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input type="text" className="form-control" name="customerName" placeholder="Enter your name" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Amount</label>
                                <input type="number" className="form-control" name="amount" placeholder="Enter amount" onChange={handleChange} required />
                            </div>
                            {formData.paymentMethod === "Credit Card" || formData.paymentMethod === "Debit Card" ? (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Card Number</label>
                                        <input type="text" className="form-control" name="cardNumber" placeholder="Enter card number" onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">CVC</label>
                                        <input type="text" className="form-control" name="cvc" placeholder="Enter CVC" onChange={handleChange} required />
                                    </div>
                                </>
                            ) : formData.paymentMethod === "Online Bank Slip" ? (
                                <>
                                    <div className="alert alert-info">Company Account Details: 100254879650 (Sampath Bank - Nugegoda Branch)</div>
                                    <div className="mb-3">
                                        <label className="form-label">Upload Bank Slip</label>
                                        <input type="file" className="form-control" name="bankSlip" onChange={handleFileChange} required />
                                    </div>
                                </>
                            ) : (
                                <div className="alert alert-warning">Payment Status: Processing</div>
                            )}
                            <button type="submit" className="btn btn-primary w-100">Pay Now</button>
                        </>
                    )}
                </form>
            </div>
        </div>
       
    );
};

export default PaymentPortal;
