import React from "react";
import "../styles/Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import checkoutIcon from "../assets/icons/checkout-icon.png"

const Cart = () => {
  const { cartItems, addItemToCart, removeItemFromCart, removeItemCompletely } = useCart();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item-parent" key={item.id}>
              <button className="btn btn-remove" onClick={() => removeItemCompletely(item.id)}>x</button>
              <div className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button className="btn btn-add" onClick={() => addItemToCart(item)}>+</button>
                  <span className="amount">{item.quantity}</span>
                  <button className="btn btn-subtract" onClick={() => removeItemFromCart(item.id)}>-</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="btn cart-checkout">
        <Link to="/checkout" className="btn-checkout">
          <img src={checkoutIcon} alt="Checkout" className="btn-icon" />
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
