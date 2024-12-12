import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item])
    }

    const removeFromCart = (id) => { // filter crea un nuevo array
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)) // excluye item que tiene el id seleccionado y guarda ese nuevo array
    }

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}