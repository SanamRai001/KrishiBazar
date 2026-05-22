import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from '../hooks/useCart'
import CartItem from "../components/CartItem"
import { Link } from "react-router-dom"
import  {useNotification} from "../hooks/useNotification"

const CartPage = () => {
  const { cart, fetchCart, clearCart } = useCart()
  const navigate = useNavigate()
  const cartItems = Array.isArray(cart) ? cart : []
  const {notify} = useNotification();
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <>
    <div className="cartPage">
      <h1 className="text-4xl text-green-600 font-semibold">Your Shopping Cart</h1>
      <div className="cart">
        <div className="shoppingCart">
          <div className="cartItemList">
            {cartItems.length === 0
              ? 
              <div className="cartIsEmpty">
                <img src="/cartIsEmpty.png" alt="cartIsEmpty Image" />
                <h1>Your shopping Cart is empty</h1>
                <p>Looks like you have not added anything to the cart yet</p>
                <Link to="/" className="backToHome">Go Back to Products</Link>
                {notify("Your shopping Cart  is empty!", "fail")}
              </div>
              : cartItems.map((item) => (
                  <CartItem key={item._id} cart={item} style={{height:"200px"}}/>
                ))
            }
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="orderSummary">
            <h1 className="text-2xl font-bold">Order Summary</h1>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery  fee</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>{totalPrice}</p>
            </div>
            <button type="button" onClick={()=>navigate("/checkout")} className="bg-green-900 text-white ">Proceed to  Checkout</button>
            <button type="button" onClick={()=>navigate("/")} className="bg-white text-green-900">Continue Shopping</button>
            <button type="button" onClick={clearCart} className="bg-red-600 text-white">
                  Clear Cart
                </button>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default CartPage