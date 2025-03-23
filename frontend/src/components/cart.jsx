import { useCart } from "./cartContext"; // Import the useCart hook
import { Link } from "react-router-dom"; // Import Link for navigation

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            src="/images/inventory-logo.png"
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
        <h1 className="text-primary mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/viewAllProducts">Continue shopping</Link></p>
        ) : (
          <div>
            {/* Display Cart Items */}
            {cartItems.map((item) => (
              <div key={item._id} className="card mb-3 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value))
                      }
                      min="1"
                      className="form-control w-25"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price and Actions */}
            <div className="mt-4">
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
              <button onClick={clearCart} className="btn btn-danger me-2">
                Clear Cart
              </button>
              <Link to="/Checkout" className="btn btn-primary">
                Proceed to Checkout
              </Link>
              <p></p>
              <p><Link to="/viewAllProducts">Continue shopping?</Link></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;