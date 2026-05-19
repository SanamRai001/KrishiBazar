import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from '../hooks/useCart'
import CartItem from "../components/CartItem"

const CartPage = () => {
  const { cart, fetchCart, clearCart } = useCart()
  const navigate = useNavigate()
  const cartItems = Array.isArray(cart) ? cart : []

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <>
      <h1>Your Shopping Cart</h1>
      <div className="shoppingCart">
        <div>
          {cartItems.length === 0
            ? <p>Your cart is empty</p>
            : cartItems.map((item) => (
                <CartItem key={item._id} cart={item} style={{height:"200px"}}/>
              ))
          }
        </div>
        {cartItems.length > 0 && (
          <div>
            <p>Total: <strong>Rs. {totalPrice}</strong></p>
            <button type="button" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
            <button type="button" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartPage