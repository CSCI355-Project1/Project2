import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, title, price, location, miles, availability }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-card-image" />
      <div className="product-card-info">
        <h2 className="product-card-title">{title}</h2>
        <p className="product-card-price">{price}</p>
        <p className="product-card-location">{location}</p>
        {miles && <p className="product-card-miles">{miles}</p>}
        {/* Availability Section */}
        <p className={`product-card-availability ${availability ? 'in-stock' : 'out-of-stock'}`}>
          {availability ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
