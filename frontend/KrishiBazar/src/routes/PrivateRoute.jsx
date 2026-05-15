import { Outlet, Navigate } from "react-router-dom"
import {useAuth} from  '../hooks/useAuth'

const PrivateRoute = () => {
    const {signedIn} = useAuth();
  return (
    signedIn ? <Outlet></Outlet> : <Navigate to= "/login"></Navigate>
)
}

export default PrivateRoute