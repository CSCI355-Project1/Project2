import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Navbar.css";
import logo from "../../assets/images/PlaceHolderLogo.png";
import profileIcon from "../../assets/icons/profile-icon.png";
import cartIcon from "../../assets/icons/cart-icon.png";

const Navbar = () => {
  const { currentUser } = useAuth();

  const cartItemCount = 3; //REPLACE THIS LATER WITH LOGIC THIS IS A PLACEHOLDER

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" className="brand-logo" />
          Community Connect
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
        <Link to="/create-event" className="btn create-event">
          + Create Event
        </Link>
        <Link to="/cart" className="btn cart">
          <img src={cartIcon} alt="Add to Cart" className="btn-icon" />
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;