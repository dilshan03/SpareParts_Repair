import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>COSMO EXPORTS</h2>
      <ul>
        <li><Link to="/">Home</Link></li>        {/* Link to Home page */}
        <li><Link to="/catalog">Catalog</Link></li> {/* Link to Catalog page */}
        <li><Link to="/catalog">Book Vehicle Service</Link></li> {/* Link to Booking page */}
        <li><Link to="/catalog">Request Repair</Link></li> {/* Link to Repair page */}
        <li><Link to="/staff">Staff</Link></li>     {/* Link to Staff page */}
        <li><Link to="/about-us">About Us</Link></li>  {/* Link to About Us page */}
      </ul>
    </nav>
  );
};

export default Navbar;
