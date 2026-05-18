import { useEffect, useState } from "react"
import {useCart} from '../hooks/useCart'
import CartItem from "../components/CartItem";
const CartPage = () => {
  const  {cart, fetchCart, clearCart} = useCart();
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0);
  useEffect(()=>{
    fetchCart();
  }, []);
  return (
    <>
      <div>
        <h1>Your shopping Cart</h1>
        <div>
          {
            cart.map((item)=>(
              <CartItem key={item._id} cart = {item}></CartItem>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default CartPage