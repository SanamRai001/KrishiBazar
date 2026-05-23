import { useState, createContext } from "react";

export const ProfileContext = createContext();
export const ProfileProvider = ({children}) => {
    const [userLocation, setUserLocation] = useState({});
    const addProfile = (userInfo, userLocation) =>{
            setUserInfo(userInfo);
            setUserLocation(userLocation);
        }    
    return (
        <ProfileContext.Provider>
            {children}
        </ProfileContext.Provider>
    )
}
