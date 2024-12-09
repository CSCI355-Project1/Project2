import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/PlaceHolderLogo.png"
import "../../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="logo" className="brand-logo" />
                    Community Connect
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar