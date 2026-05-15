import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";


export const CartContext =  createContext();
export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    const itemCount = cart.length;


    const fetchCart = async () =>{
        try{
            const response = await axiosInstance.get("/cart");
            if(response.data.success){
                setCart(response.data.data);
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
            const response = await axiosInstance.post("/cart", {product, quantity});
            if(response.data.success){
                fetchCart();
            }
            else{
                console.log(response.data.message);
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
                fetchCart();
            }
            else{
                console.log(response.data.message);
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