import React from 'react';
import "../styles/Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <header className="hero">
                <div className="hero-content">
                    <h1>Message</h1>
                    <div className="cta-button">
                        <Link to="/events" className="btn btn-event">Explore Events</Link>
                        <Link to="/marketplace" className="btn btn-marketplace">Visit Marketplace</Link>
                    </div>
                </div>
            </header>

            <div className="featured-events">

            </div>

            <div className="popular-products">

            </div>
        </div>
    )
};

export default Home;