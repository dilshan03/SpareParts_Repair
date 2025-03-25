import { useCart } from "./cartContext"; // Import the useCart hook
import { useState } from "react"; // Import useState for form handling
import { Link } from "react-router-dom"; // Import Link for navigation

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); // Access cart items and clearCart function
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart(); // Clear the cart after placing the order
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-4 d-flex flex-column"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        {/* Inventory Logo */}
        <div className="text-center mb-5">
          <img
            src="/images/inventory-logo.jpg"
            alt="Inventory Logo"
            style={{ width: "80%", height: "auto" }}
          />
        </div>

       {/* Navigation Menu */}
       <ul className="list-unstyled flex-grow-1">
          <li className="mb-4"><a href="/home" className="text-white text-decoration-none fs-5">Home</a></li>
          <li className="mb-4"><a href="/aboutUs" className="text-white text-decoration-none fs-5">About Us</a></li>
          <li className="mb-4"><a href="/cart" className="text-white text-decoration-none fs-5">My Cart</a></li>
          <li className="mb-4"><a href="/account" className="text-white text-decoration-none fs-5">My Account</a></li>
          <li className="mb-4"><a href="/viewAllProducts" className="text-white text-decoration-none fs-5">View Products</a></li>
          <li className="mb-4"><a href="#other" className="text-white text-decoration-none fs-5">Other</a></li>
        </ul>

        {/* Background Image at Bottom */}
        <div className="mt-auto">
          <img
            src="/images/sidebar-bg.jpg"
            alt="Sidebar Background"
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <h1 className="text-primary mb-4">Checkout</h1>

        {/* Cart Summary */}
        <div className="mb-5">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <p className="card-text">Price: ${item.price}</p>
                </div>
                <p className="card-text fw-bold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <h4 className="text-end">Grand Total: ${totalPrice.toFixed(2)}</h4>

          {/* View Cart Button */}
          <div className="text-end mt-3">
            <Link to="/cart" className="btn btn-secondary">
              View Cart
            </Link>
          </div>
        </div>

        {/* Shipping Details Form inside a Frame */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h3 className="card-title">Shipping Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={shippingDetails.name}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={shippingDetails.address}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={shippingDetails.city}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, city: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    value={shippingDetails.state}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, state: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    value={shippingDetails.zip}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, zip: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Payment Details Form */}
              <h3>Payment Details</h3>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    value={paymentDetails.cvv}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;