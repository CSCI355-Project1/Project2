import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (product) => {
        setCartItems((currentCartItems) => {
            const existingItem = currentCartItems.find(item => item.id === product.id);

            if (existingItem) {
                return currentCartItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            else {
                return [...currentCartItems, { ...product, quantity: 1 }];
            }
        });
    }

    const removeItemFromCart = (productId) => {
        setCartItems((currentCartItems) => {
            const existingItem = currentCartItems.find(item => item.id === productId);

            if (existingItem?.quantity === 1) {
                return currentCartItems.filter(item => item.id !== productId);
            }
            else {
                return currentCartItems.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        });
    }

    const removeItemCompletely = (productId) => {
        setCartItems((currentCartItems) => (
            currentCartItems.filter(item => item.id !== productId))
        );
    };

    const value = {
        cartItems,
        addItemToCart,
        removeItemFromCart,
        removeItemCompletely
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(CartContext)
}