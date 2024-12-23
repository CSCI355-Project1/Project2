import React from "react";
import "../../styles/ProductCard.css";
import cartIcon from "../../assets/icons/cart-icon.png";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
    const { addItemToCart } = useCart();

    return (
        <div className="product-card" id={product.id}>
            <img src={product.image} alt={product.title} className="product-card-image" />
            <h3 className="product-card-title">{product.title}</h3>
            <p className="product-card-price">${product.price}</p>

            <div className="product-card-actions">
                <button className="btn btn-cart" onClick={() => addItemToCart(product)}>
                    <img src={cartIcon} alt="Add to Cart" className="btn-icon" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;