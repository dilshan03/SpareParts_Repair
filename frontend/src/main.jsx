import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from './components/addproducts.jsx';
import ManageInventory from './components/manageInventory.jsx';
import UpdateProduct from './components/updateproduct.jsx';
import ViewInventory from './components/viewInventory.jsx';
import Cart from './components/cart.jsx'; // Import the Cart component
import { CartProvider } from './components/cartContext'; // Import the CartProvider
import ViewAllProducts from './components/viewAllProducts.jsx';
import Checkout from './components/Checkout.jsx';
import InventoryHome from './components/inventoyHome.jsx';
import Reports from './components/reports.jsx';
import SalesReports from './components/reports.jsx';
import SalesAndInventoryReports from './components/reports.jsx';
import SingleProduct from './components/SingleProduct.jsx';
import ViewProduct from './components/viewProduct.jsx';

// Create the root and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the entire app with CartProvider to manage cart state */}
    <CartProvider>
      <Router>
        <Routes>
          {/* Define all routes */}
          <Route path="/" element={<App />} />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/manageInventory" element={<ManageInventory />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/viewInventory" element={<ViewInventory />} />
          <Route path="/inventoryHome" element={<InventoryHome />} />
          <Route path="/viewAllProducts" element={<ViewAllProducts />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/Checkout" element={<Checkout />} /> 
          <Route path="/reports" element={<SalesAndInventoryReports />} />
          <Route path="/SingleProduct/:id" element={<SingleProduct />} />
          <Route path="/viewProduct/:id" element={<ViewProduct />} />
        </Routes>
      </Router>
    </CartProvider>
  </StrictMode>
);
