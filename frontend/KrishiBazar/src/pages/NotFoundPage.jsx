import { Link } from "react-router-dom"
import {useNotification} from "../hooks/useNotification"

const NotFoundPage = () => {
  const {notify} = useNotification();
  return (
    <>
      <div className="notFoundPage">
        {notify("404 page not Found!")}
        <img src="/notFound.png" alt="Page Not found Gif" height="400px" width="400px"/>
        <p>404 Not found</p>
        <h1>
          Oops! Page Not Found
        </h1>
        <p>The page you are looking for does not exist. Click button below to go to the Homepage</p>
        <Link to="/" className="backToHome">
        Back to Homepage
        </Link>
      </div>    
    </>
  )
}

export default NotFoundPage