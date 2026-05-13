import { useState, createContext} from "react"
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState(()=>{
        return localStorage.getItem("token") || null;
    });
    const signedIn = Boolean(token);
    const login = (userInfo, token)=>{
        setToken(token);
        localStorage.setItem("token", token);
        setUserInfo(userInfo);
    }
    const logout = ()=>{
        setToken(null);
        localStorage.removeItem("token");
        setUserInfo({});
    }
    
  return (
    <AuthContext.Provider value={{signedIn, userInfo, token, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
}

