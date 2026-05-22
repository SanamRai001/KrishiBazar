import { createContext, useState } from "react"

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [visible, setVisible] = useState(false);
    const notify = (message, type) => {
        
        setMessage(message);
        setType(type);
        setVisible(true);
        console.log("notify is called!");
        setTimeout(()=>{
            setVisible(false);
        }, 3000);
    }
  return (
    <NotificationContext.Provider value={{notify, message, type, visible}}>
        {children}
    </NotificationContext.Provider>
    )
}
