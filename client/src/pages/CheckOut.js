import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import CheckOutForm from "../components/marketplace/CheckOutForm";
import "../styles/CheckOut.css";


const CheckOut = () => {
    const { cartItems } = useCart();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const [stripePromise, setStripePromise] = useState();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("/config").then(async (response) => {
            const { publishableKey } = await response.json();
            setStripePromise(loadStripe(publishableKey));
        })
            .catch((error) => {
                console.error("Error fetching publishable key", error);
            })
    }, []);

    useEffect(() => {
        console.log("Total Price:", totalPrice);
        fetch("/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ totalPrice }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (result) => {
                const data = await result.json();
                console.log(data);

                if (result.ok) {
                    setClientSecret(data.clientSecret);
                }
                else {
                    console.error("Error from server: ", data);
                }
            })
            .catch((error) => {
                console.error("Error creating payment intent:", error);
            });
    }, [totalPrice]);

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <div className="cart-summary">
                <h2>Cart Summary</h2>
                {cartItems.length === 0 ? (
                    <p>Error! Your cart is empty.</p>
                ) : (
                    <div className="checkout-items">
                        {cartItems.map((item) => (
                            <div className="checkout-item" key={item.id}>
                                <img src={item.image} alt={item.title} className="checkout-item-image" />
                                <div className="checkout-item-details">
                                    <h3>{item.title}</h3>
                                    <p>${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <h3>Total: ${totalPrice.toFixed(2)}</h3>
                        </div>
                    </div>
                )}
            </div>
            <div className="checkout-form">
                <h2>Payment Information</h2>
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckOutForm />
                    </Elements>
                )}
            </div>
        </div>

    )
}

export default CheckOut;