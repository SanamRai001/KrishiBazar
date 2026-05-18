import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../api/axiosInstance";
import { Link} from "react-router-dom";
import { useCart } from "../hooks/useCart"
import  { useAuth } from "../hooks/useAuth"

const ProductPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { signedIn } = useAuth();
  const  navigate = useNavigate();

  // add  buy now logic
  // const handleBuyNow = async () =>{
  //   const response = await axiosInstance.post("/order", 
  //     {

  //     }
  //   )
  // }
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axiosInstance.get(`/products/${id}`);
        console.log(response.data.data);
        if(response.data.success){
          setProductDetails(response.data.data);
        }
        else{
          console.log("No such product found!");
        }
      }
      catch(err){
        console.error("Error while fetching Data: ", err.message);
      }
    }
    fetchData();
  },[id]);
  return (
    <>
      <div className="productPage">
        <div className="font-semibold">
          <span><Link to="/">Home &gt; </Link></span>
          <span><Link to={`/?category=${productDetails.category}`}>
  {productDetails.category} &gt;
</Link></span>
          <span>{productDetails.name}</span>
        </div>
        <div className="flex gap-16  p-4 flex-row ">
          <div>
            <img src={productDetails.image} alt={productDetails.name} className="rounded-xl  object-cover" style={{ width: "400px", height: "400px" }}/>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div>
                <div className=" bg-green-500 text-white px-4 py-2 rounded-full object-contain overflow-hidden">
                  {productDetails.category}
                </div>
                <p>{productDetails.name}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-8  h-8 object-contain"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/></svg>
            </div>
            <div>
              <div className="flex flex-row gap-4 justify-between">
                <p>Rs.{productDetails.price}</p>
                <p>In Stock</p>
              </div>
              <h3>Description</h3>
              <p>{productDetails.description}</p>
            </div>
            <div>
              <div className="flex flex-row gap-4 justify-between">
                <p>quantity</p>
                <div className="flex gap-2 items-center quantity bg-[#e0e0e0]">
                  <button type="button" onClick={()=>{
                    if(quantity > 1){
                      setQuantity(quantity-1);
                    }
                  }}>-</button>
                  <input type="number" value={quantity} onChange={(e)=>{
                    let value = Number(e.target.value);
                    if (value < 1) value = 1;
                    if (value > 99) value = 99;
                    setQuantity(value);
                    }} max={99} min={1}/>
                  <button type="button"  onClick={()=>{
                    if(quantity < 99){
                      setQuantity(quantity+1);
                    }
                  }}>+</button>
                </div>
              </div>
              <div className="flex  flex-row gap-4 justify-between m-10">
                <p>Total Price</p>
                <p>Rs. {productDetails.price* quantity}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-between productButtons">
              <button className="bg-[#005127]" type="button" onClick={(e)=>{
              e.preventDefault();
              if(signedIn){
                addToCart(id, quantity);
              }
              else{
                navigate("/login");
              }
            }}>Add to Cart</button>
              <button className="bg-[#F26D21]">Buy Now</button>
            </div>
          </div>
        </div>
        <div>
          <p>Similar Items</p>
        </div>
      </div>
    </>
  )
}

export default ProductPage