import { createContext, useState } from "react";

export const CartContext =  createContext();
export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    const itemCount = cart.length;
    const addToCart = (cart, item, quantity) =>{
       
    }
    const removeFromCart = () =>{

    }
    const updateQuantity = () =>{

    }
    const clearCart = () =>{

    }
    return (
        <CartContext.Provider value={{cart, itemCount, addToCart, removeFromCart, updateQuantity,  clearCart}}>
            {children}
        </CartContext.Provider>
    )
}