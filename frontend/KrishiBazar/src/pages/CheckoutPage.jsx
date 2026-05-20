import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import  {useCart} from '../hooks/useCart'
import axiosInstance from "../api/axiosInstance";

const CheckoutPage = () => {
  const locationData = {
  "Bagmati": ["Kathmandu", "Lalitpur", "Bhaktapur", "Kavrepalanchok", "Sindhupalchok"],
  "Gandaki": ["Kaski", "Lamjung", "Gorkha", "Mustang", "Manang"],
  "Lumbini": ["Rupandehi", "Kapilvastu", "Palpa", "Dang", "Bardiya"],
  "Koshi": ["Sunsari", "Morang", "Jhapa", "Dhankuta", "Ilam"],
  "Madhesh": ["Sarlahi", "Mahottari", "Bara", "Parsa", "Rautahat"],
  "Karnali": ["Surkhet", "Dailekh", "Jumla", "Dolpa", "Humla"],
  "Sudurpashchim": ["Kailali", "Kanchanpur", "Doti", "Bajhang", "Bajura"]
  }
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const  [address,  setAddress] = useState("");
  const districts = province ? locationData[province] : [];
  const {cart, clearCart} = useCart();
  const location = useLocation();
  const cartData = location.state;
  const items = cartData?.buyNow ? cartData.orderItems : cart;
  const totalPrice = items.reduce((sum, item) => {
    const price = cartData?.buyNow ? item.price : item.product.price
    return sum + (price * item.quantity)
  }, 0);
  const shippingAddress = {province: province, district: district, address: address};
  console.log(items);
  const navigate = useNavigate();
  const handleOrderSubmit = async () =>{
     if(!province || !district || !address){
    console.log("Please fill all fields")
    return
     }
    const orderData = {
      orderItems: cartData?.buyNow 
      ? items
      :items.map((item)=> ({
        product: item.product._id,
        quantity: item.quantity
      })),
      shippingAddress: shippingAddress,
      buyNow : cartData?.buyNow ? true : false
    }
    try{
      const response = await axiosInstance.post("/order", orderData);
      if(response.data.success){
        console.log("Orderplaced successfully");
        if(!cartData?.buyNow){
          clearCart()
        }
        navigate("/");
      }
      else{
        console.log("Order placing failed");
      }
    }
    catch(err){
      console.error("Error while placing Order: ", err.message);
    }
    
  }
  return (
    <>
      <div className="checkOutPage">
        <div>
          <h1>Delivery Address</h1>
          <form onSubmit={(e)=>{
            e.preventDefault()
            handleOrderSubmit()
          }}>
            <label htmlFor="">Province</label>
            <select value={province} onChange={(e)=>{
              setProvince(e.target.value)
              setDistrict("")
              }}>
                <option value="">Select  Province</option>
              {
                Object.keys(locationData).map((location)=>(
                  <option value={location} key={location}>{location}</option>
                ))
              }
            </select>
            <label htmlFor="">District</label>
            <select value={district} onChange={(e)=>setDistrict(e.target.value) } disabled={!province}>
              <option value="">Select District</option>
              {
                districts.map((d)=>(
                  <option value={d} key={d}>{d}</option>
                ))
              }
            </select>
            <label htmlFor="">Address</label>
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Kathmandu" />
          </form>
        </div>
        <div>
          <h1>Payment Method</h1>
          <p>Cash  on Delivery</p>
          <p>Esewa</p>
        </div>
        <div>
          <h1>Order Summary</h1>
          <div>
            {
              items.map((item) =>{
                const image = cartData?.buyNow ? item.image : item.product.image;
                const price = cartData?.buyNow ? item.price : item.product.price;
                const name = cartData?.buyNow ? item.name : item.product.name;
                return(
                <div key={item.product}>
                  <img src={image} alt={name} />
                  <p>{item.quantity} X {price}</p>
                  <p>{price * item.quantity}</p>
                </div>
                )
              }
                
              )
            }
          </div>
          <div>
            <p>Subtotal</p>
            <p>{totalPrice}</p>
          </div>
          <div>
            <p>Delivery Fee</p>
            <p>Free</p>
          </div>
          <div>
            <p>Total</p>
            <p>{totalPrice}</p>
          </div>
          <button type="button" onClick={handleOrderSubmit}>Place Order (Rs. {totalPrice})</button>
        </div>
      </div>
    </>
  )
}

export default CheckoutPage