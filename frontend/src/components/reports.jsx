import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from "jspdf";

const SalesAndInventoryReports = () => {
    const [salesData, setSalesData] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);
    const [month, setMonth] = useState("");
    const [message, setMessage] = useState("");

    // Fetch data whenever month changes
    useEffect(() => {
        if (month) {
            fetchSalesData();
            fetchRecentProducts();
        }
    }, [month]);

    // Fetch sales data
    const fetchSalesData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/sales?month=${month}`);
            setSalesData(response.data);
        } catch (error) {
            setMessage("Error fetching sales data");
        }
    };

    // Fetch recently added products
    const fetchRecentProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products?month=${month}`);
            setRecentProducts(response.data);
        } catch (error) {
            setMessage("Error fetching recently added products data");
        }
    };

    // Generate PDF report with sales data and recently added products
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 20, 10);
        let y = 20;

        // Sales Data
        doc.text("Sales Data:", 20, y);
        y += 10;
        salesData.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.name} - ${item.quantity} sold - $${item.totalPrice}`, 20, y);
            y += 10;
        });

        // Recently Added Products
        doc.text("Recently Added Products:", 20, y);
        y += 10;
        recentProducts.forEach((product, index) => {
            doc.text(`${index + 1}. ${product.name} - Added on: ${product.dateAdded}`, 20, y);
            y += 10;
        });

        doc.save("sales_and_inventory_report.pdf");
    };

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            {/* Sidebar */}
            <div className="bg-primary text-white p-4 d-flex flex-column" style={{ width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
                {/* Inventory Logo */}
                <div className="text-center mb-5">
                    <img src="/images/inventory-logo.png" alt="Inventory Logo" style={{ width: '80%', height: 'auto' }} />
                </div>

                {/* Navigation Menu */}
                <ul className="list-unstyled flex-grow-1">
                    <li className="mb-4"><a href="/addProducts" className="text-white text-decoration-none fs-5">Add Inventory</a></li>
                    <li className="mb-4"><a href="/manageInventory" className="text-white text-decoration-none fs-5">Manage Inventory</a></li>
                    <li className="mb-4"><a href="/viewInventory" className="text-white text-decoration-none fs-5">View Inventory</a></li>
                    <li className="mb-4"><a href="/reports" className="text-white text-decoration-none fs-5">Inventory Reports</a></li>
                    <li className="mb-4"><a href="/inventoryHome" className="text-white text-decoration-none fs-5">Main Inventory</a></li>
                </ul>

                {/* Background Image at Bottom */}
                <div className="mt-auto">
                    <img src="/images/sidebar-bg.jpg" alt="Sidebar Background" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}>
                <h1 className="text-primary mb-4">Sales and Inventory Reports</h1>
                
                {/* Month Input */}
                <div className="mb-3">
                    <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="form-control" />
                </div>
                <button onClick={generatePDF} className="btn btn-success mb-3 ms-2">Download PDF</button>
                {message && <p className="text-danger">{message}</p>}

                {/* Sales Data Section */}
                <h3>Sales Data:</h3>
                <ul className="list-group mb-4">
                    {salesData.map((item, index) => (
                        <li key={index} className="list-group-item">{item.name} - {item.quantity} sold - ${item.totalPrice}</li>
                    ))}
                </ul>

                {/* Recently Added Products Section */}
                <h3>Recently Added Products:</h3>
                <ul className="list-group">
                    {recentProducts.map((product, index) => (
                        <li key={index} className="list-group-item">{product.name} - Added on: {product.dateAdded}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SalesAndInventoryReports;
