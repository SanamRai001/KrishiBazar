import { useState, createContext} from "react"
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(()=>{
        const stored = localStorage.getItem("userInfo");
        return stored ? JSON.parse(stored) : {};
    });
    const [token, setToken] = useState(()=>{
        return localStorage.getItem("token") || null;
    });
    const signedIn = Boolean(token);
    const fetchProfile = async () =>{
        try{
            const response = await  axiosInstance.get("/user/profile");
            if(response.data.success){
                setUserInfo(response.data.data);
                localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            }
        }
        catch(err){
            console.error("Error while fetching userInfo: ", err.message);
        }
    }
    const updateProfile = async (data) =>{
        try{
            const  response = await axiosInstance.put("/user/profile", data)
            if(response.data.success){
                setUserInfo(response.data.data)
                localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            }
        }
        catch(err){
            console.error("Error while updating userProfile", err.message);
        }
    }
    const login = (userInfo, token)=>{
        setToken(token);
        localStorage.setItem("token", token);
        setUserInfo(userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

    }
    const logout = ()=>{
        setToken(null);
        localStorage.removeItem("token");
        setUserInfo({});
        localStorage.removeItem("userInfo");
    }
    
  return (
    <AuthContext.Provider value={{signedIn, userInfo, setUserInfo, token, login, logout, fetchProfile, updateProfile}}>
        {children}
    </AuthContext.Provider>
    )
}

