import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/cartContext"; // Import useCart
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Get addToCart function from context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/spareparts/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-4 d-flex flex-column" style={{ width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <div className="text-center mb-5">
          <img src="/images/inventory-logo.jpg" alt="Inventory Logo" style={{ width: '80%', height: 'auto' }} />
        </div>
        <ul className="list-unstyled flex-grow-1">
          <li className="mb-4"><a href="/addProducts" className="text-white text-decoration-none fs-5">Add Inventory</a></li>
          <li className="mb-4"><a href="/manageInventory" className="text-white text-decoration-none fs-5">Manage Inventory</a></li>
          <li className="mb-4"><a href="/viewInventory" className="text-white text-decoration-none fs-5">View Inventory</a></li>
          <li className="mb-4"><a href="/reports" className="text-white text-decoration-none fs-5">Inventory Reports</a></li>
          <li className="mb-4"><a href="/inventoryHome" className="text-white text-decoration-none fs-5">Main Inventory</a></li>
        </ul>
        <div className="mt-auto">
          <img src="/images/sidebar-bg.jpg" alt="Sidebar Background" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <h1 className="text-primary mb-4">Product Details</h1>

        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="card shadow-sm mb-4">
            <img src={product.picture} alt={product.name} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text"><strong>Description:</strong> {product.description}</p>
              <p className="card-text"><strong>Category:</strong> {product.category}</p>
              <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
              <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              <p className="card-text"><strong>Condition:</strong> {product.condition}</p>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button onClick={() => navigate("/viewAllProducts")} className="btn btn-primary">View All Products</button>

          {/* Add to Cart Button */}
          {product && (
            <button onClick={() => addToCart(product)} className="btn btn-success">Add to Cart</button>
          )}

          {/* Checkout Button */}
          <button onClick={() => navigate("/cart")} className="btn btn-primary">Go to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
