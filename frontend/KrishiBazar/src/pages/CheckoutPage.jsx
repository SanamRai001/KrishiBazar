import { useState } from "react"
import { useLocation } from "react-router-dom";
import  {useCart} from '../hooks/useCart'

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
  const districts = province ? locationData[province] : [];
  const {cart} = useCart();
  const location = useLocation();
  const cartData = location.state;
  const items = cartData?.buyNow ? cartData.orderItems : cart;
  return (
    <>
      <div>
        <h1>Delivery Address</h1>
        <div>
          <form action="">
            <label htmlFor="">Fullname</label>
            <input type="text" placeholder="John Doe" />
            <label htmlFor="">Phone  Number</label>
            <input type="text" placeholder="98XXXXXXXX" />
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
            <input type="text" placeholder="Kathmandu" />
          </form>
        </div>
      </div>
      <div>
        <h1>Payment Method</h1>
        <p>Cash  on Delivery</p>
        <p>Esewa</p>
      </div>
      <div>
        <h1>Order Summary</h1>
        {
          items.map((item) =>(
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.quantity}</p>
              <p>{item.price}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default CheckoutPage