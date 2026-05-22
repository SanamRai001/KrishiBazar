import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance";
import {useNotification} from "../hooks/useNotification"
import {useAuth} from  "../hooks/useAuth"

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email,  setEmail] = useState("");
  const  [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();
  const {notify} = useNotification();
  const {signedIn} = useAuth();
  useEffect(()=>{
    if(signedIn){
      navigate("/");
    }
  },[signedIn]);
  const  handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axiosInstance.post("/auth/register", {name, email, password, role});
      if(response.data.success){
        notify("Registered successfully!")
        setTimeout(() => {
          navigate("/")
        }, 1500);
      }
    }
    catch(err){
      notify("Registration Failed!");
      console.error("Error while Sending Data: ", err.message);
    }
  }
  return (
    <>
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <div>
            <img src="/kishanLogo.png" alt="Kishan Logo" style={{height: "80px", margin: "0 auto", display: "block"}}/>
            <h1 className="text-5xl text-center text-green-800">Create account</h1>
            <h3 className="text-xl text-center">Join Krishi Bazar today</h3>
          </div>
          <div className="flex flex-col gap-3">
            <h5>I want to Join as:</h5>
            <div>
              <button type="button" onClick={()=>setRole("User")} style={{
                background: role === "User" ? "#1a6b3a" : "transparent",
                color: role === "User" ? "#fff" : "#1a6b3a"
              }} >Buyer</button>
              <button type="button" onClick={()=>setRole("Kishan")} style={{
                background: role === "Kishan" ? "#1a6b3a" : "transparent",
                color: role === "Kishan" ? "#fff" : "#1a6b3a"
              }}>Farmer</button>
            </div>
          </div>
          <div>
            <label htmlFor="">Full Name</label>
            <input type="text" placeholder="Enter Your Full name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Email address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" placeholder="*********" value={password} onChange={(e) =>setPassword(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-3">
            <button type="submit">Create Account</button>
            <p className="text-center">Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterPage