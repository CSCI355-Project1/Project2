import React, { useState, useEffect } from "react";
import "../../styles/Listings.css";

const Listings = () => {
  const [activeListings, setActiveListings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

  const fetchListings = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/products/listings",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setActiveListings(data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleRemoveListing = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setSuccess("Listing removed successfully");
        fetchListings();
      } else {
        setError("Failed to remove listing");
      }
    } catch (error) {
      setError("Error removing listing");
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:3005/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...formData,
            createdBy: token,
            status: "available",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        setSuccess("Listing created successfully");
        setFormData({
          title: "",
          description: "",
          price: "",
          image: "",
        });
        fetchListings();
      } else {
        setError("Failed to create listing");
      }
    } catch (error) {
      setError("Error creating listing");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="listings-container">
      <h2>Your Active Listings</h2>
      {activeListings.length === 0 ? (
        <p className="no-listings">No active listings</p>
      ) : (
        <table className="listings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeListings.map((listing) => (
              <tr key={listing.id}>
                <td>{listing.title}</td>
                <td>${listing.price}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveListing(listing.id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit} className="listing-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default Listings;
