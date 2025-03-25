//viewInventory.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const ViewInventory = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/spareparts");
        setSpareParts(response.data);
      } catch (error) {
        setError("Failed to fetch inventory. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSpareParts();
  }, []);

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
        <h1 className="text-primary mb-4">View Inventory</h1>
        
        {loading ? (
          <p>Loading inventory...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row">
            {spareParts.map((part) => (
              <div key={part._id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img src={part.picture} alt={part.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{part.name}</h5>
                    <p className="card-text"><strong>Category:</strong> {part.category}</p>
                    <p className="card-text"><strong>Price:</strong> ${part.price}</p>
                    <Link to={`/SingleProduct/${part._id}`} className="btn btn-primary w-100">View Product</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInventory;