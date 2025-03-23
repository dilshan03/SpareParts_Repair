import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const InventoryHome = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" 
         style={{ height: "100vh", backgroundImage: "url('/images/inventory-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <div className="bg-dark text-white p-5 rounded shadow-lg text-center" style={{ opacity: 0.9 }}>
        <h1 className="mb-4">Inventory Management</h1>
        
        <div className="d-grid gap-4 w-100">
          <Link to="/viewInventory" className="btn btn-primary btn-lg"> View Inventory</Link>
          <Link to="/addProducts" className="btn btn-primary btn-lg"> Add Products</Link>
          <Link to="/updateInventory" className="btn btn-primary btn-lg"> Manage Inventory</Link>
          <Link to="/reports" className="btn btn-primary btn-lg"> Reports</Link>
          <p></p>
          <Link to="/adminDashboard" className="btn btn-warning btn-lg"> Back to Admin Dashboard </Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryHome;