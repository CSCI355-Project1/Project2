import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import ProductCard from "../components/marketplace/ProductCard";
import videoFile from "../assets/videos/heroVideo.mp4";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const productsResponse = await fetch(
          "http://localhost:3005/api/products"
        );
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();

        const eventsResponse = await fetch("http://localhost:3005/api/events");
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await eventsResponse.json();

        setProducts(productsData);
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

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
              <Link to="/events" className="btn btn-event">
                Explore Events
              </Link>
            </div>
            <div className="cta-marketplace">
              <Link to="/marketplace" className="btn btn-marketplace">
                Visit Marketplace
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="featured-events">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {isLoading ? (
            <div className="loading">Loading events...</div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p className="date">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="popular-products">
        <h2>Popular Products</h2>
        <div className="products-grid">
          {isLoading ? (
            <div className="loading">Loading products...</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
