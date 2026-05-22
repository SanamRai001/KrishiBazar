import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {useNotification} from "../hooks/useNotification"

export const CartContext =  createContext();
export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    const itemCount = Array.isArray(cart) ? cart.length : 0
    const {notify} =  useNotification();

    const fetchCart = async () =>{
        try{
            const response = await axiosInstance.get("/cart");
            if(response.data.success){
                setCart(response.data.data.items);
            }
            else{
                console.log(response.data.message);
            }
        }
        catch(err){
            console.error("Error while fetching Cart: ", err.message);
        }
    }
    const addToCart = async (product, quantity) =>{
        try{
            const response = await axiosInstance.post("/cart", {productId: product, quantity});
            if(response.data.success){
                notify("Item added to  Cart", "pass");
                fetchCart();
            }
            else{
                notify("Failed to add item", "fail");
            }
        }
        catch(err){
            console.error("Error while adding Product to Cart: ", err.message);
        }
    }
    const removeFromCart = async (product) =>{
        try{
            const response = await axiosInstance.delete(`/cart/${product}`);
            if(response.data.success){
                notify("Item removed", "pass");
                fetchCart();
            }
            else{
                notify("Failed to remove", "fail");
            }
        }
        catch(err){
            console.error("Error while removing  an  item",  err.message);
        }
    }
    const updateQuantity = async (product, quantity) =>{
        try{
            const response = await axiosInstance.put(`/cart/${product}`, {quantity});
            if(response.data.success){
                fetchCart();
            }
            else{
                console.log(response.data.message);
            }
        }
        catch(err){
            console.error("Error while Updating Product to Cart: ", err.message);
        }
    }
    const clearCart = () =>{
        setCart([]);
    }
    
    return (
        <CartContext.Provider value={{cart, itemCount, fetchCart, addToCart, removeFromCart, updateQuantity,  clearCart}}>
            {children}
        </CartContext.Provider>
    )
}