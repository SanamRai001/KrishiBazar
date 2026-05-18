import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { CATEGORIES, SORT_OPTIONS } from "../utils/constants"
import { useEffect, useState } from "react"
import axiosInstance from "../api/axiosInstance"
import { useSearchParams } from "react-router-dom"

const HomePage = () => {
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({ totalPages: 0, total: 0, pageNumber: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [];
  for(let i = 0; i < pagination?.totalPages; i++){
    pages.push(
      <button 
        key={i} 
        className="page"
        style={{
          background: currentPage === i + 1 ? "var(--green-dark)" : "transparent",
          color: currentPage === i + 1 ? "#fff" : "var(--green-dark)",
          border: "1px solid var(--green-dark)",
          padding: "0.3rem 0.8rem",
          borderRadius: "6px"
        }}
        onClick={() => {
          setCurrentPage(i + 1)
          document.getElementById("productSection").scrollIntoView({ behavior: "smooth" })
        }}
      >
        {i + 1}
      </button>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          params: {
            category: category === "All" ? "" : category,
            sort: sortOption,
            pageNumber: currentPage,
            name: search
          }
        });
        if(response.data.data){
          setProducts(response.data.data);
          setPagination(response.data.pagination);
        } else {
          console.log("No items to show");
        }
      }
      catch(error){
        console.error("Error while fetching Products list: ", error.message);
      }
    }
    fetchData();
  }, [sortOption, category, currentPage, search]);

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if(categoryParam){
      setCategory(categoryParam)
      setTimeout(() => {
        document.getElementById("productSection").scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [searchParams])

  return (
    <>
      <Navbar />
      <div className="heroSection">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">
            Connecting Nepal's Farmers{" "}
            <span className="text-green-800">directly to your Kitchen.</span>
          </h1>
          <p>Connecting local Farmers with your kitchen. Experience the authentic taste of Nepal's agriculture with our verified producer network.</p>
          <div className="flex gap-4">
            <a 
              href="#productSection" 
              className="bg-orange-500 text-white"
              onClick={() => document.getElementById("productSection").scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now
            </a>
            <a 
              href="#productSection"
              className="border-2 border-green-500 text-green-500"
              onClick={() => document.getElementById("productSection").scrollIntoView({ behavior: "smooth" })}
            >
              Browse Categories
            </a>
          </div>
          <p className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 object-contain text-green-600">
              <path fill="currentColor" d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
            </svg>
            100% Organic & Verified Produce
          </p>
        </div>
        <div>
          <img src="./hero.avif" alt="Vegetables image" width="700px" height="auto" className="rounded-xl"/>
        </div>
      </div>

      <div className="productSection" id="productSection">
        <div className="filters">
          <div className="category">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                style={{
                  background: category === cat ? "var(--green-dark)" : "transparent",
                  color: category === cat ? "#fff" : "var(--green-dark)",
                  border: "1px solid var(--green-dark)",
                  padding: "0.3rem 1rem",
                  borderRadius: "20px"
                }}
                onClick={() => {
                  setCategory(cat)
                  setCurrentPage(1)
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
            <select 
              name="filters" 
              value={sortOption} 
              onChange={(e) => {
                setSortOption(e.target.value)
                setCurrentPage(1)
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="productList">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="pagination">
            {pages}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage