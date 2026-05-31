import SearchBar from "./SearchBar"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../hooks/useCart"

const Navbar = () => {
  const { signedIn, userInfo, logout } = useAuth()
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="navBar">

      <Link to="/">
        <img src="/kishanLogo.png" alt="Krishi Bazar" className="w-12 h-12 object-contain"/>
      </Link>

      <SearchBar />

      <div className="leftNavBar">
        <Link to="/cart" style={{ position: "relative" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" fill="currentColor" />
            <circle cx="20" cy="21" r="1" fill="currentColor" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {itemCount > 0 && (
            <span style={{
              position: "absolute", top: "-8px", right: "-8px",
              background: "var(--orange)", color: "#fff",
              borderRadius: "50%", width: "18px", height: "18px",
              fontSize: "11px", display: "flex",
              alignItems: "center", justifyContent: "center"
            }}>
              {itemCount}
            </span>
          )}
        </Link>

        <div className="userAuth">
          {signedIn ? (
            <div className="userLogIn">
              <div className="navUser">
                <Link to="/dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-7 h-7 object-contain">
                    <path fill="green" d="M470.5 463.6C451.4 416.9 405.5 384 352 384L288 384C234.5 384 188.6 416.9 169.5 463.6C133.9 426.3 112 375.7 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 375.7 506.1 426.2 470.5 463.6zM430.4 496.3C398.4 516.4 360.6 528 320 528C279.4 528 241.6 516.4 209.5 496.3C216.8 459.6 249.2 432 288 432L352 432C390.8 432 423.2 459.6 430.5 496.3zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 304C297.9 304 280 286.1 280 264C280 241.9 297.9 224 320 224C342.1 224 360 241.9 360 264C360 286.1 342.1 304 320 304zM232 264C232 312.6 271.4 352 320 352C368.6 352 408 312.6 408 264C408 215.4 368.6 176 320 176C271.4 176 232 215.4 232 264z"/>
                  </svg>
                </Link>
                <Link to="/dashboard" className="userName font-semibold">{userInfo?.name || "User"}</Link>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-7 h-7 object-contain">
                  <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/>
                </svg>
                <button type="button" onClick={logout} className="logoutBtn">Logout</button>
              </div>
            </div>
          ) : (
            <div className="userLogOut">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-7 h-7 object-contain">
                <path fill="#FFFFFF" d="M470.5 463.6C451.4 416.9 405.5 384 352 384L288 384C234.5 384 188.6 416.9 169.5 463.6C133.9 426.3 112 375.7 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 375.7 506.1 426.2 470.5 463.6zM430.4 496.3C398.4 516.4 360.6 528 320 528C279.4 528 241.6 516.4 209.5 496.3C216.8 459.6 249.2 432 288 432L352 432C390.8 432 423.2 459.6 430.5 496.3zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 304C297.9 304 280 286.1 280 264C280 241.9 297.9 224 320 224C342.1 224 360 241.9 360 264C360 286.1 342.1 304 320 304zM232 264C232 312.6 271.4 352 320 352C368.6 352 408 312.6 408 264C408 215.4 368.6 176 320 176C271.4 176 232 215.4 232 264z"/>
              </svg>
              <Link to="/login" className="loginLink">Login</Link>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger — only shows on mobile via CSS */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-7 h-7 object-contain"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
      </button>

      {/* Mobile menu */}
      <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          Cart {itemCount > 0 && `(${itemCount})`}
        </Link>
        {signedIn ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>{userInfo?.name || "Dashboard"}</Link>
            <button type="button" onClick={() => { logout(); setMenuOpen(false) }}>Logout</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>

    </div>
  )
}

export default Navbar