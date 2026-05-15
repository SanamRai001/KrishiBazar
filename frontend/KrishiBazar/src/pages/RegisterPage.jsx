import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email,  setEmail] = useState("");
  const  [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();
  const  handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axiosInstance.post("/auth/register", {name, email, password, role});
      if(response.data.success){
        navigate("/login");
      }
    }
    catch(err){
      console.error("Error while Sending Data: ", err.message);
    }
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Create account</h3>
            <h5>Join Krishi Bazar today</h5>
          </div>
          <div>
            <h5>I want to Join as:</h5>
            <div>
              <button type="button" onClick={()=>setRole("User")} style={{
                background: role === "User" ? "#1a6b3a" : "transparent",
                color: role === "User" ? "#fff" : "#1a6b3a"
              }}>Buyer</button>
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
          <div>
            <button type="submit">Create Account</button>
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterPage