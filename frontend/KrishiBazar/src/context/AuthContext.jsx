import { useState, createContext, useEffect } from "react"
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState(null);
    const signedIn = Boolean(token);
    const login = (userInfo, token)=>{
        setToken(token);
        localStorage.setItem("token", token);
        setUserInfo(userInfo);
    }
    const logout = ()=>{
        setToken("");
        localStorage.removeItem("token");
        setUserInfo({});
    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setToken(token);
        }
    }, []);
  return (
    <AuthContext.Provider value={{signedIn, userInfo, token, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider;