import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import  {useCart} from '../hooks/useCart'
import {useAuth} from '../hooks/useAuth'
import axiosInstance from "../api/axiosInstance";
import { useNotification } from "../hooks/useNotification";
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
  const [number, setNumber] = useState("");
  const districts = province ? locationData[province] : [];
  const {cart, clearCart, fetchCart} = useCart();
  const location = useLocation();
  const cartData = location.state;
  const items = cartData?.buyNow ? cartData.orderItems : cart;
  const totalPrice = items.reduce((sum, item) => {
    const price = cartData?.buyNow ? item.price : item.product.price
    return sum + (price * item.quantity)
  }, 0);
  const [initialized, setInitialized] = useState(false);
  const shippingAddress = {province: province, district: district, address: address};
  const { notify } = useNotification();  
  const navigate = useNavigate();
  const [loading,  setLoading] = useState(true);
  const {fetchProfile, updateProfile, userInfo} = useAuth();
  const handleOrderSubmit = async () =>{
     if(!province || !district || !address){
      notify("Please  fill  all  fields", "fail");
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
        notify("Order placed successfully", "pass");
        console.log("Orderplaced successfully");
        updateProfile({
          phoneNumber: number,
          location:{
            province: province,
            district: district,
            address: address
          }
        })
        if(!cartData?.buyNow){
          clearCart()
        }
      setTimeout(() => {
          navigate("/")
        }, 1500)      
      }
      else{
        notify("Order Placing Failed! Please try again!", "fail")
        console.log("Order placing failed");
      }
    }
    catch(err){
      notify("Backend Failure while placing order", "fail");
      console.error("Error while placing Order: ", err.message);
    }
    
  }
  useEffect(()=>{
    const loadProfile = async() =>{
      try{
        await fetchProfile();
      }
      catch(err){
        console.error("Error while fetching profile in checkout", err.message);
      }
    }
    loadProfile();
  },[]);
  useEffect(()=>{
    if(!userInfo || initialized) return;
    if(userInfo.location){
      setProvince(userInfo.location.province);
      setDistrict(userInfo.location.district);
      setAddress(userInfo.location.address);
    }
    if(userInfo.phoneNumber){
      setNumber(userInfo.phoneNumber);
    }
    setInitialized(true)
  },[userInfo, initialized]);
  useEffect(()=>{
    if(!cartData?.buyNow){
      const  load = async() =>{
        setLoading(true);
        try{
          await fetchCart()
        }
        catch(err){
          console.error("Error  while fetching cart!: ", err.message);
        }
        finally{
          setLoading(false);
        }
      }
      load();
    }
    else{
      setLoading(false);
    }
  },[]);
if(loading){
  return(
    <div className="checkOutPage">
      <div className="deliverySection skeleton" style={{minHeight: "350px"}} />
      <div className="paymentSection skeleton" style={{minHeight: "150px"}} />
      <div className="orderSection skeleton" style={{minHeight: "450px"}} />
    </div>
  )
}
  return (
    <>
      <div className="checkOutPage">
        <div className="deliverySection">
          <h1>Delivery Address</h1>
          <form onSubmit={(e)=>{
            e.preventDefault()
            handleOrderSubmit()
          }}>
            <label htmlFor="">Phone Number</label>
            <input type="tel" value={number} onChange={(e)=>setNumber(e.target.value)} />
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
        <div className="paymentSection">
          <h1>Payment Method</h1>
          <p>Cash  on Delivery</p>
          <p>Esewa</p>
        </div>
        <div className="orderSection">
          <h1>Order Summary</h1>
          <div className="flex  gap-4 flex-col orderList">
            {
              items.map((item) =>{
                const image = cartData?.buyNow ? item.image : item.product.image;
                const price = cartData?.buyNow ? item.price : item.product.price;
                const name = cartData?.buyNow ? item.name : item.product.name;
                return(
                <div key={item.product} className="orderItems">
                  <div className="flex gap-4">
                  <img src={image} alt={name} className="w-20 h-20 object-contain rounded"/>
                  <div>
                    <p>{name}</p>
                    <p >{item.quantity} X {price}</p>
                  </div>
                  </div>
                  <p className="font-bold">Rs. {price * item.quantity}</p>
                </div>
                )
              }
                
              )
            }
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{totalPrice}</p>
          </div>
          <div className="flex justify-between ">
            <p>Delivery Fee</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>{totalPrice}</p>
          </div>
          <button type="button" onClick={handleOrderSubmit} >Place Order (Rs. {totalPrice})</button>
        </div>
      </div>
    </>
  )
}

export default CheckoutPage