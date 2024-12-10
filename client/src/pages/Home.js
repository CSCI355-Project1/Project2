import React from 'react';
import "../styles/Home.css";
import { Link } from 'react-router-dom';
import ProductCard from '../components/marketplace/ProductCard';
import product1 from "../assets/products/product1.jpg";
import product2 from "../assets/products/product2.jpg";
import product3 from "../assets/products/product3.jpg";
import videoFile from '../assets/videos/heroVideo.mp4';

const Home = () => {
    const popularProducts = [
        {
            id: "1",
            title: "Homemade Pottery",
            price: 25,
            image: product1
        },
        {
            id: "2",
            title: "Necklace",
            price: 45,
            image: product2
        },
        {
            id: "3",
            title: "Wooden Stool",
            price: 75,
            image: product3
        }
    ]
    return (
        <div>
            <header className="hero">
                <video className="hero-video" autoPlay muted loop playsInline>
                    <source src={videoFile} type="video/mp4" />
                    Your browser does not support the video tag
                </video>
                <div className="hero-content">
                    <h1>Connect</h1>
                    <div className="cta-buttons">
                        <div className="cta-event">
                            <Link to="/events" className="btn btn-event">Explore Events</Link>
                        </div>
                        <div className="cta-marketplace">
                            <Link to="/marketplace" className="btn btn-marketplace">Visit Marketplace</Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="featured-events">
                <h2>Upcoming events</h2>
                <div className="events-grid">

                </div>
            </div>

            <div className="popular-products">
                <h2>Popular Products</h2>
                <div className="products-grid">
                    {popularProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Home;