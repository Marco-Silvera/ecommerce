import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item])
    }

    const removeFromCart = (id) => { // filter crea un nuevo array
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)) // excluye item que tiene el id seleccionado y guarda ese nuevo array
    }

    const isInCart = (id) => {
        return cartItems.some((item) => item.id === id);
    };
    

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addCart,
            removeFromCart,
            isInCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}