import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axiosInstance.post("/auth/login", {email,  password});
      if(response.data.success){
        const token = response.data.token;
        const user = response.data.user;
        login({user}, token);
        navigate("/");
      }
    }
    catch(err){
      console.error("Error while logging in.", err.message);
    }
  }
  return (
    <>
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <div>
            <h3 className="text-5xl text-center text-green-800">Welcome Back</h3>
            <h5 className="text-xl text-center">Please Enter your Details</h5>
          </div>
          <div>
            <label htmlFor="">Email Address</label>
            <input type="email" placeholder="Enter your e-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
          <div className="flex justify-between">
            <label htmlFor="">Password</label>
            <a href="#" style={{color: "var(--green-dark)"}}>Forgot password?</a>
          </div>
            <input type="password" name="" id="" placeholder="Enter  your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-3">
            <button type="submit">Sign In</button>
            <p className="text-center">Don't have  an  account? <Link to="/register">Create an account</Link></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage