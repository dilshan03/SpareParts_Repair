//addProducts.jsx

import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; // Import Link for navigation

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    condition: "New",
    category: "",
  });

  const [picture, setPicture] = useState(null); // Separate state for file
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append image file
    if (picture) {
      data.append("picture", picture);
    }

    try {
      await axios.post("http://localhost:5000/api/spareparts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({ name: "", description: "", quantity: "", price: "", condition: "New", category: "" });
      setPicture(null);
      setMessage("Product successfully added!");
      setMessageType("success");
    } catch (error) {
      setMessage("Unable to add the product. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-4 d-flex flex-column" style={{ width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0 }}>

        {/* Inventory Logo */}
        <div className="text-center mb-5">
          <img src="/images/inventory-logo.jpg" alt="Inventory Logo" style={{ width: '80%', height: 'auto' }} />
        </div>

        {/* Navigation Menu */}
        <ul className="list-unstyled flex-grow-1">
          <li className="mb-4"><a href="/addProducts" className="text-white text-decoration-none fs-5">Add Inventory</a></li>
          <li className="mb-4"><a href="/manageInventory" className="text-white text-decoration-none fs-5">Manage Inventory</a></li>
          <li className="mb-4"><a href="/viewInventory" className="text-white text-decoration-none fs-5">View Inventory</a></li>
          <li className="mb-4"><a href="/reports" className="text-white text-decoration-none fs-5">Inventory Reports</a></li>
          <li className="mb-4"><a href="/inventoryHome" className="text-white text-decoration-none fs-5">Main Inventory</a></li>
          <li className="mb-4"><a href="/viewAllProducts" className="text-white text-decoration-none fs-5">Customer View</a></li>
        </ul>

        {/* Background Image at Bottom */}
        <div className="mt-auto">
          <img src="/images/sidebar-bg.jpg" alt="Sidebar Background" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}>
        <h1 className="text-primary mb-4">Add Products</h1>

        {/* Success/Error Message */}
        {message && (
          <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mb-4`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '500px' }}>
          <h2 className="h5 text-primary mb-4">Add Spare Part</h2>
          <div className="mb-3">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control" required />
          </div>
          <div className="mb-3">
            <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control" required />
          </div>
          <div className="mb-3">
            <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="form-control" required />
          </div>
          <div className="mb-3">
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="form-control" required />
          </div>
          <div className="mb-3">
            <select name="condition" value={formData.condition} onChange={handleChange} className="form-select" required>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>
          <div className="mb-3">
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="form-control" required />
          </div>
          <div className="mb-3">
            <input type="file" onChange={handleFileChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Add Spare Part</button>
        </form>

        {/* View Inventory Button */}
        <div className="mt-4">
          <Link to="/viewInventory" className="btn btn-primary w-50">
            View Inventory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
