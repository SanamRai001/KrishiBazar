import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="heroSection">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Connecting Nepal's Farmers <span className="text-green-800">directly to your Kitchen.</span></h1>
          <p>Connecting local Farmers with your kitchen. Experience the authentic taste of Nepal's agriculture  with our verified producer network.</p>
          <div className="flex gap-4">
            <a href="#" className="bg-orange-500 text-white">Shop  Now</a>
            <a href="#" className="border-2 border-green-500 text-green-500">Browse Categories</a>
          </div>
          <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 object-contain  text-green-600"><path fill="currentColor" d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/></svg>100% Organic & Verified Produce</p>
        </div>
        <div>
          <img src="./hero.avif" alt="Vegeltables image"  width="700px" height="auto"/>
        </div>
      </div>
      <div className="productSection">
        <div>
          <div>
            categories
          </div>
          <div>
            Filters
          </div>
        </div>
        <div>
          <div>
            Products
          </div>
          <div>
            Pagination
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default HomePage