import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageInventory = () => {
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/spareparts").then((response) => {
      setSpareParts(response.data);
    }).catch((error) => {
      console.error("Error fetching spare parts:", error);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this spare part?")) {
      try {
        await axios.delete(`http://localhost:5000/api/spareparts/${id}`);
        setSpareParts(spareParts.filter(part => part._id !== id));
      } catch (error) {
        console.error("Error deleting spare part:", error);
      }
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

<div>
  <Link to="/adminDashboard" className="btn btn-warning btn-lg"> Back to Admin Dashboard </Link>
</div>

</div>


      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}>
        <h1 className="text-primary mb-4">Manage Inventory</h1>
        <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '800px' }}>
          <table className="table table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {spareParts.map((part) => (
                <tr key={part._id}>
                  <td><img src={`http://localhost:5000/uploads/${part.picture}`} alt={part.name} className="img-thumbnail" style={{ width: '50px', height: '50px' }} /></td>
                  <td>{part.name}</td>
                  <td>{part.category}</td>
                  <td>${part.price}</td>
                  <td>{part.quantity}</td>
                  <td>
                    <Link to={`/update/${part._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                    <button onClick={() => handleDelete(part._id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="/viewInventory" className="btn btn-info mt-3">View Inventory</a>
      </div>
    </div>
  );
};

export default ManageInventory;
