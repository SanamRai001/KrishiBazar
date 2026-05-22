import { Link } from "react-router-dom"
const NotFoundPage = () => {
  return (
    <>
      <div className="notFoundPage">
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