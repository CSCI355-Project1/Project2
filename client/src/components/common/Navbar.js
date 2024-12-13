import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "../../styles/Navbar.css";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/icons/profile-icon.png";
import cartIcon from "../../assets/icons/cart-icon.png";

const Navbar = () => {
  //   const handleClick = () => {
  //     const token = localStorage.getItem("token"); // Retrieve the token
  //     if (!token) {
  //       alert("Failed to log in");
  //     }
  //     console.log(token);
  //   };

  const { currentUser } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" className="brand-logo" />
          <p>Community Connect</p>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/marketplace">Marketplace</Link>
        </li>
        {/* <li>
          <button onClick={handleClick}>test</button>
        </li> */}
      </ul>
      <div className="navbar-actions">
        {!currentUser ? (
          <Link to="/login" className="btn login">
            Login
          </Link>
        ) : (
          <Link to="/profile" className="btn profile">
            <img src={profileIcon} alt="Profile" className="btn-icon" />
          </Link>
        )}
        {/* <Link to="/events" className="btn create-event">
          + Create Event
        </Link> */}
        <Link to="/cart" className="btn cart">
          <img src={cartIcon} alt="Add to Cart" className="btn-icon" />
          {totalItems > 0 && (
            <span className="cart-count">{totalItems > 99 ? "99+" : totalItems}</span>
          )}
        </Link>
      </div>
    </nav>

  );
};

export default Navbar;
