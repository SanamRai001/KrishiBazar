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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Welcome Back</h3>
            <h5>Please Enter your Details</h5>
          </div>
          <div>
            <label htmlFor="">Email Address</label>
            <input type="email" placeholder="Enter your e-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" placeholder="Enter  your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <a href="#">Forgot your password?</a>
          </div>
          <div>
            <button type="submit">Sign In</button>
            <p>Don't have  an  account? <Link to="/register">Create an account</Link></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage